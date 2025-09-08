"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const entities_1 = require("../entities");
const legacy_adapter_service_1 = require("../services/legacy-adapter.service");
const graphql_2 = require("@nestjs/graphql");
let EntidadeConnection = class EntidadeConnection {
    data;
    total;
    page;
    limit;
};
__decorate([
    (0, graphql_2.Field)(() => [entities_1.Entidade]),
    __metadata("design:type", Array)
], EntidadeConnection.prototype, "data", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EntidadeConnection.prototype, "total", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EntidadeConnection.prototype, "page", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EntidadeConnection.prototype, "limit", void 0);
EntidadeConnection = __decorate([
    (0, graphql_2.ObjectType)()
], EntidadeConnection);
let EntidadeResolver = class EntidadeResolver {
    legacyAdapterService;
    constructor(legacyAdapterService) {
        this.legacyAdapterService = legacyAdapterService;
    }
    async findAllEntidades(page, limit, sortBy, sortOrder, ativo, idFilial, search) {
        const pagination = { page, limit, sortBy, sortOrder };
        const filters = { ativo, idFilial, search };
        return await this.legacyAdapterService.findAllEntidades(filters, pagination);
    }
    async findEntidadeById(idEntidade, idFilial) {
        return await this.legacyAdapterService.findEntidadeById(idEntidade, idFilial);
    }
    async findEntidadesByCnpjCpf(cnpjCpf, idFilial) {
        return await this.legacyAdapterService.findEntidadesByCnpjCpf(cnpjCpf, idFilial);
    }
    async findEntidadesByCategoria(categoria, idFilial) {
        return await this.legacyAdapterService.findEntidadesByCategoria(categoria, idFilial);
    }
    async getLimiteCredito(idEntidade, idFilial) {
        return await this.legacyAdapterService.getLimiteCredito(idEntidade, idFilial);
    }
    async produtos(entidade) {
        return await this.legacyAdapterService.findProdutosByEntidade(entidade.idEntidade, entidade.idFilial);
    }
};
exports.EntidadeResolver = EntidadeResolver;
__decorate([
    (0, graphql_1.Query)(() => EntidadeConnection, { name: 'entidades' }),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, nullable: true, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true, defaultValue: 50 })),
    __param(2, (0, graphql_1.Args)('sortBy', { nullable: true, defaultValue: 'idEntidade' })),
    __param(3, (0, graphql_1.Args)('sortOrder', { nullable: true, defaultValue: 'ASC' })),
    __param(4, (0, graphql_1.Args)('ativo', { type: () => Boolean, nullable: true, defaultValue: true })),
    __param(5, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int, nullable: true })),
    __param(6, (0, graphql_1.Args)('search', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Boolean, Number, String]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "findAllEntidades", null);
__decorate([
    (0, graphql_1.Query)(() => entities_1.Entidade, { name: 'entidade', nullable: true }),
    __param(0, (0, graphql_1.Args)('idEntidade', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "findEntidadeById", null);
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Entidade], { name: 'entidadesByCnpjCpf' }),
    __param(0, (0, graphql_1.Args)('cnpjCpf')),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "findEntidadesByCnpjCpf", null);
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Entidade], { name: 'entidadesByCategoria' }),
    __param(0, (0, graphql_1.Args)('categoria')),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "findEntidadesByCategoria", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int, { name: 'limiteCredito' }),
    __param(0, (0, graphql_1.Args)('idEntidade', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "getLimiteCredito", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [entities_1.Produto], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Entidade]),
    __metadata("design:returntype", Promise)
], EntidadeResolver.prototype, "produtos", null);
exports.EntidadeResolver = EntidadeResolver = __decorate([
    (0, graphql_1.Resolver)(() => entities_1.Entidade),
    __metadata("design:paramtypes", [legacy_adapter_service_1.LegacyAdapterService])
], EntidadeResolver);
//# sourceMappingURL=entidade.resolver.js.map