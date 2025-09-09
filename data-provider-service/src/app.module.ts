import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Produto, Entidade } from './entities';
import { LegacyAdapterService } from './services/legacy-adapter.service';
import { ProdutoResolver, EntidadeResolver, HealthResolver } from './resolvers';
import { DataLoaderModule, DataLoaderInterceptor } from './dataloaders';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database (opcional - só conecta se as credenciais estiverem disponíveis)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get('DB_HOST');
        const dbPassword = configService.get('DB_PASSWORD');
        
        // Se não tiver credenciais do banco, usa SQLite em memória
        if (!dbHost || !dbPassword) {
          console.warn('⚠️  Database credentials not found, using in-memory SQLite for development');
          return {
            type: 'sqlite',
            database: ':memory:',
            entities: [Produto, Entidade],
            synchronize: true, // OK para SQLite em memória
            logging: false,
          };
        }

        // Configuração para SQL Server real
        return {
          type: 'mssql',
          host: dbHost,
          port: configService.get('DB_PORT', 1433),
          username: configService.get('DB_USERNAME', 'sa'),
          password: dbPassword,
          database: configService.get('DB_DATABASE', 'ATXDADOS'),
          entities: [Produto, Entidade],
          synchronize: false, // NEVER true in production with legacy DB
          logging: configService.get('NODE_ENV') === 'development',
          options: {
            encrypt: false, // Use true for Azure
            trustServerCertificate: true, // Use true for local dev
          },
        };
      },
      inject: [ConfigService],
    }),

    // TypeORM Repositories
    TypeOrmModule.forFeature([Produto, Entidade]),

    // DataLoaders Module
    DataLoaderModule,

    // GraphQL Federation
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: {
          federation: 2,
        },
        playground: configService.get('GRAPHQL_PLAYGROUND', true),
        debug: configService.get('GRAPHQL_DEBUG', true),
        introspection: true,
        context: ({ req }) => ({ 
          req,
          // DataLoaders serão injetados via interceptor
        }),
        formatError: (error) => {
          console.error('GraphQL Error:', error);
          return {
            message: error.message,
            code: error.extensions?.code,
            path: error.path,
          };
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LegacyAdapterService,
    // Provider com token para injeção de dependência
    {
      provide: 'LegacyAdapterService',
      useClass: LegacyAdapterService,
    },
    // Interceptor global para DataLoaders
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    // Resolvers
    ProdutoResolver,
    EntidadeResolver,
    HealthResolver,
  ],
})
export class AppModule {}

