import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getSubgraphList } from '../config/subgraphs';

export class FederationGateway {
  private gateway: ApolloGateway;
  private server: ApolloServer;

  constructor() {
    this.initializeGateway();
  }

  private initializeGateway() {
    // Configuração do Gateway com composição automática
    this.gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: getSubgraphList(),
        // Configurações de polling para atualizações automáticas
        pollIntervalInMs: 30000, // 30 segundos
      }),
      // Customização das requisições para subgraphs
      buildService({ url }) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            // Adicionar headers customizados se necessário
            if (context.authToken) {
              request.http?.headers.set('authorization', context.authToken);
            }
            
            // Adicionar trace ID para debugging
            request.http?.headers.set('x-trace-id', context.traceId || 'unknown');
          },
        });
      },
    });

    // Configuração do servidor Apollo
    this.server = new ApolloServer({
      gateway: this.gateway,
      // Configurações de produção
      introspection: process.env.NODE_ENV !== 'production',
      // Formatação de erros
      formatError: (err) => {
        console.error('Gateway Error:', {
          message: err.message,
          path: err.path,
          source: err.source?.name,
          extensions: err.extensions,
        });

        // Em produção, não expor detalhes internos
        if (process.env.NODE_ENV === 'production') {
          return {
            message: err.message,
            code: err.extensions?.code,
            path: err.path,
          };
        }

        return err;
      },
      // Plugin para logging
      plugins: [
        {
          requestDidStart() {
            return {
              didResolveOperation(requestContext) {
                console.log('Gateway Query:', {
                  operationName: requestContext.request.operationName,
                  query: requestContext.request.query?.substring(0, 200) + '...',
                });
              },
              didEncounterErrors(requestContext) {
                console.error('Gateway Errors:', requestContext.errors);
              },
            };
          },
        },
      ],
    });
  }

  async start(port: number = 4000) {
    try {
      console.log('🚀 Starting Apollo Federation Gateway...');
      
      const { url } = await startStandaloneServer(this.server, {
        listen: { port, host: '0.0.0.0' },
        context: async ({ req }) => {
          // Extrair informações do contexto
          return {
            authToken: req.headers.authorization,
            traceId: req.headers['x-trace-id'] || `trace-${Date.now()}`,
            userAgent: req.headers['user-agent'],
          };
        },
      });

      console.log(`🌐 Gateway ready at: ${url}`);
      console.log(`📊 GraphQL Playground: ${url}`);
      console.log('📡 Subgraphs configured:');
      
      getSubgraphList().forEach(subgraph => {
        console.log(`  - ${subgraph.name}: ${subgraph.url}`);
      });

      return { url, server: this.server };
    } catch (error) {
      console.error('❌ Failed to start gateway:', error);
      throw error;
    }
  }

  async stop() {
    try {
      await this.server?.stop();
      console.log('🛑 Gateway stopped');
    } catch (error) {
      console.error('Error stopping gateway:', error);
    }
  }

  // Health check endpoint
  async healthCheck() {
    try {
      // Verificar se o gateway está funcionando
      const subgraphs = getSubgraphList();
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        gateway: {
          status: 'running',
          subgraphs: subgraphs.length,
        },
        subgraphs: subgraphs.map(subgraph => ({
          name: subgraph.name,
          url: subgraph.url,
          status: 'unknown', // Em uma implementação real, faria ping nos subgraphs
        })),
      };

      return healthStatus;
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

