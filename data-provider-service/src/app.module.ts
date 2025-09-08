import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Produto, Entidade } from './entities';
import { LegacyAdapterService } from './services/legacy-adapter.service';
import { ProdutoResolver, EntidadeResolver, HealthResolver } from './resolvers';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 1433),
        username: configService.get('DB_USERNAME', 'sa'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'ATXDADOS'),
        entities: [Produto, Entidade],
        synchronize: false, // NEVER true in production with legacy DB
        logging: configService.get('NODE_ENV') === 'development',
        options: {
          encrypt: false, // Use true for Azure
          trustServerCertificate: true, // Use true for local dev
        },
      }),
      inject: [ConfigService],
    }),

    // TypeORM Repositories
    TypeOrmModule.forFeature([Produto, Entidade]),

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
        context: ({ req }) => ({ req }),
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
    ProdutoResolver,
    EntidadeResolver,
    HealthResolver,
  ],
})
export class AppModule {}

