import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockDataService } from './services/mock-data.service';
import { ProdutoResolver, EntidadeResolver, HealthResolver } from './resolvers';
import { MockDataLoaderService } from './dataloaders/mock-dataloader.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // GraphQL Federation (sem TypeORM)
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
        context: ({ req }) => {
          return { 
            req,
            dataLoaders: new MockDataLoaderService(new MockDataService())
          };
        },
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
    MockDataService,
    // Usar MockDataService no lugar do LegacyAdapterService
    {
      provide: 'LegacyAdapterService',
      useClass: MockDataService,
    },
    // Mock DataLoader Service
    MockDataLoaderService,
    // Resolvers
    ProdutoResolver,
    EntidadeResolver,
    HealthResolver,
  ],
})
export class AppMockModule {}

