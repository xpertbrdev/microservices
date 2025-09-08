"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const entities_1 = require("./entities");
const legacy_adapter_service_1 = require("./services/legacy-adapter.service");
const resolvers_1 = require("./resolvers");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mssql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 1433),
                    username: configService.get('DB_USERNAME', 'sa'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_DATABASE', 'ATXDADOS'),
                    entities: [entities_1.Produto, entities_1.Entidade],
                    synchronize: false,
                    logging: configService.get('NODE_ENV') === 'development',
                    options: {
                        encrypt: false,
                        trustServerCertificate: true,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([entities_1.Produto, entities_1.Entidade]),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloFederationDriver,
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
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
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            legacy_adapter_service_1.LegacyAdapterService,
            resolvers_1.ProdutoResolver,
            resolvers_1.EntidadeResolver,
            resolvers_1.HealthResolver,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map