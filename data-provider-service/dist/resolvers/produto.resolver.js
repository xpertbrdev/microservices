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
exports.ProdutoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const entities_1 = require("../entities");
const legacy_adapter_service_1 = require("../services/legacy-adapter.service");
const graphql_2 = require("@nestjs/graphql");
let ProdutoConnection = class ProdutoConnection {
    data;
    total;
    page;
    limit;
};
__decorate([
    (0, graphql_2.Field)(() => [entities_1.Produto]),
    __metadata("design:type", Array)
], ProdutoConnection.prototype, "data", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProdutoConnection.prototype, "total", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProdutoConnection.prototype, "page", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProdutoConnection.prototype, "limit", void 0);
ProdutoConnection = __decorate([
    (0, graphql_2.ObjectType)()
], ProdutoConnection);
let ProdutoResolver = class ProdutoResolver {
    legacyAdapterService;
    constructor(legacyAdapterService) {
        this.legacyAdapterService = legacyAdapterService;
    }
    async findAllProdutos(page, limit, sortBy, sortOrder, ativo, idFilial, search) {
        const pagination = { page, limit, sortBy, sortOrder };
        const filters = { ativo, idFilial, search };
        return await this.legacyAdapterService.findAllProdutos(filters, pagination);
    }
    async findProdutoById(idProdutos, idFilial) {
        return await this.legacyAdapterService.findProdutoById(idProdutos, idFilial);
    }
    async findProdutosByCodigo(codigo, idFilial) {
        return await this.legacyAdapterService.findProdutosByCodigo(codigo, idFilial);
    }
    async findProdutosByEntidade(idEntidade, idFilial) {
        return await this.legacyAdapterService.findProdutosByEntidade(idEntidade, idFilial);
    }
    async getEstoque(idProdutos, idFilial) {
        return await this.legacyAdapterService.getEstoque(idProdutos, idFilial);
    }
    async entidade(produto) {
        if (!produto.idEntidade)
            return null;
        return await this.legacyAdapterService.findEntidadeById(produto.idEntidade, produto.idFilial);
    }
};
exports.ProdutoResolver = ProdutoResolver;
__decorate([
    (0, graphql_1.Query)(() => ProdutoConnection, { name: 'produtos' }),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, nullable: true, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true, defaultValue: 50 })),
    __param(2, (0, graphql_1.Args)('sortBy', { nullable: true, defaultValue: 'idProdutos' })),
    __param(3, (0, graphql_1.Args)('sortOrder', { nullable: true, defaultValue: 'ASC' })),
    __param(4, (0, graphql_1.Args)('ativo', { type: () => Boolean, nullable: true, defaultValue: true })),
    __param(5, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int, nullable: true })),
    __param(6, (0, graphql_1.Args)('search', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Boolean, Number, String]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "findAllProdutos", null);
__decorate([
    (0, graphql_1.Query)(() => entities_1.Produto, { name: 'produto', nullable: true }),
    __param(0, (0, graphql_1.Args)('idProdutos', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "findProdutoById", null);
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Produto], { name: 'produtosByCodigo' }),
    __param(0, (0, graphql_1.Args)('codigo')),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "findProdutosByCodigo", null);
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Produto], { name: 'produtosByEntidade' }),
    __param(0, (0, graphql_1.Args)('idEntidade', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "findProdutosByEntidade", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int, { name: 'estoque' }),
    __param(0, (0, graphql_1.Args)('idProdutos', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('idFilial', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "getEstoque", null);
__decorate([
    (0, graphql_1.ResolveField)(() => entities_1.Entidade, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Produto]),
    __metadata("design:returntype", Promise)
], ProdutoResolver.prototype, "entidade", null);
exports.ProdutoResolver = ProdutoResolver = __decorate([
    (0, graphql_1.Resolver)(() => entities_1.Produto),
    __metadata("design:paramtypes", [legacy_adapter_service_1.LegacyAdapterService])
], ProdutoResolver);
//# sourceMappingURL=produto.resolver.js.map