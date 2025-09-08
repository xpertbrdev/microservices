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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const entidade_entity_1 = require("./entidade.entity");
let Produto = class Produto {
    idProdutos;
    idFilial;
    idEntidade;
    idLocalVendas;
    idGrupoProdutos;
    idMarcas;
    codigoProduto;
    nomeProduto;
    unidade;
    tipoTributacao;
    reducaoIcms;
    codigoBarraProduto;
    origemProduto;
    margemLucro;
    aliquotaIpi;
    aliquotaIss;
    aliquotaIcms;
    produtoComposto;
    custoMedio;
    custoGerencial;
    margemSubst;
    qtdeTotal;
    dataCadastro;
    descontoMaximo;
    ativo;
    ncm;
    cest;
    localizacao;
    ultAlteracao;
    entidade;
};
exports.Produto = Produto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryColumn)({ name: 'ID_PRODUTOS' }),
    __metadata("design:type", Number)
], Produto.prototype, "idProdutos", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryColumn)({ name: 'ID_FILIAL' }),
    __metadata("design:type", Number)
], Produto.prototype, "idFilial", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ID_ENTIDADE', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "idEntidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ID_LOCALVENDAS', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "idLocalVendas", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'ID_GRUPOPRODUTOS' }),
    __metadata("design:type", Number)
], Produto.prototype, "idGrupoProdutos", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ID_MARCAS', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "idMarcas", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CODIGOPRODUTO', length: 15, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "codigoProduto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ name: 'NOMEPRODUTO', length: 50 }),
    __metadata("design:type", String)
], Produto.prototype, "nomeProduto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'UNIDADE', length: 4, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "unidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'TIPOTRIBUTACAO', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "tipoTributacao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'REDUCAOICMS', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "reducaoIcms", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CODIGOBARRAPRODUTO', length: 20, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "codigoBarraProduto", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ORIGEMPRODUTO', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "origemProduto", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'MARGEMLUCRO', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "margemLucro", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ALIQUOTAIPI', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "aliquotaIpi", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ALIQUOTAISS', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "aliquotaIss", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ALIQUOTAICMS', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "aliquotaIcms", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'PRODUTOCOMPOSTO', type: 'bit' }),
    __metadata("design:type", Boolean)
], Produto.prototype, "produtoComposto", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CUSTOMEDIO', type: 'decimal', precision: 18, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "custoMedio", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CUSTOGERENCIAL', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "custoGerencial", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'MARGEMSUBST', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "margemSubst", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'QTDETOTAL', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "qtdeTotal", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'DATACADASTRO', type: 'smalldatetime', nullable: true }),
    __metadata("design:type", Date)
], Produto.prototype, "dataCadastro", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'DESCONTOMAXIMO', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Produto.prototype, "descontoMaximo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'ATIVO', type: 'bit', default: true }),
    __metadata("design:type", Boolean)
], Produto.prototype, "ativo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'NCM', length: 8, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "ncm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CEST', length: 15, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "cest", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'LOCALIZACAO', length: 30, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "localizacao", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ULTALTERACAO', type: 'smalldatetime', nullable: true }),
    __metadata("design:type", Date)
], Produto.prototype, "ultAlteracao", void 0);
__decorate([
    (0, graphql_1.Field)(() => entidade_entity_1.Entidade, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => entidade_entity_1.Entidade, { nullable: true }),
    (0, typeorm_1.JoinColumn)([
        { name: 'ID_ENTIDADE', referencedColumnName: 'idEntidade' },
        { name: 'ID_FILIAL', referencedColumnName: 'idFilial' }
    ]),
    __metadata("design:type", entidade_entity_1.Entidade)
], Produto.prototype, "entidade", void 0);
exports.Produto = Produto = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_2.Directive)('@key(fields: "idProdutos idFilial")'),
    (0, typeorm_1.Entity)('PRODUTOS')
], Produto);
//# sourceMappingURL=produto.entity.js.map