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
exports.Entidade = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const produto_entity_1 = require("./produto.entity");
let Entidade = class Entidade {
    idEntidade;
    idFilial;
    idCidades;
    idEmpresasEntidades;
    codigoEntidade;
    nomeEntidade;
    razaoSocialEntidade;
    dtaCadastro;
    pessoa;
    endereco;
    bairro;
    cep;
    cnpjCpf;
    ieRg;
    fone;
    celular;
    email;
    categoria;
    diaVcto;
    prazoOperacional;
    dtaNascimento;
    limite;
    emitirIcms;
    carencia;
    listaNegra;
    tipoPgto;
    emitirFatura;
    emitirBoleto;
    contato;
    clienteFornecedor;
    desconto;
    obs;
    ativo;
    ultAlteracao;
    numero;
    verificaLimite;
    consumidorFinal;
    tipoOperacao;
    tipoContribuinte;
    produtos;
};
exports.Entidade = Entidade;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryColumn)({ name: 'ID_ENTIDADE' }),
    __metadata("design:type", Number)
], Entidade.prototype, "idEntidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryColumn)({ name: 'ID_FILIAL' }),
    __metadata("design:type", Number)
], Entidade.prototype, "idFilial", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ID_CIDADES', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "idCidades", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ID_EMPRESASENTIDADES', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "idEmpresasEntidades", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CODIGOENTIDADE', length: 13, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "codigoEntidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'NOMEENTIDADE', length: 50, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "nomeEntidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'RAZAOSOCIALENTIDADE', length: 70, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "razaoSocialEntidade", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'DTACADASTRO', type: 'smalldatetime', nullable: true }),
    __metadata("design:type", Date)
], Entidade.prototype, "dtaCadastro", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'PESSOA', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "pessoa", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ENDERECO', length: 70, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "endereco", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'BAIRRO', length: 35, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "bairro", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CEP', length: 8, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "cep", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CNPJCPF', length: 14, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "cnpjCpf", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'IERG', length: 14, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "ieRg", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'FONE', length: 10, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "fone", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CELULAR', length: 11, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "celular", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'EMAIL', length: 40, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CATEGORIA', length: 1, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "categoria", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'DIAVCTO', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "diaVcto", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'PRAZOOPERACIONAL', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "prazoOperacional", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'DTANASCIMENTO', type: 'smalldatetime', nullable: true }),
    __metadata("design:type", Date)
], Entidade.prototype, "dtaNascimento", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'LIMITE', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "limite", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'EMITIRICMS', type: 'bit', default: false }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "emitirIcms", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CARENCIA', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "carencia", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'LISTANEGRA', type: 'bit', default: false }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "listaNegra", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'TIPOPGTO', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "tipoPgto", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'EMITIRFATURA', type: 'bit', default: false }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "emitirFatura", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'EMITIRBOLETO', type: 'bit', default: false }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "emitirBoleto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CONTATO', length: 30, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "contato", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'CLIENTE_FORNECEDOR', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "clienteFornecedor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'DESCONTO', type: 'bit', default: false }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "desconto", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'OBS', length: 255, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "obs", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'ATIVO', type: 'bit', default: true }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "ativo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'ULTALTERACAO', type: 'smalldatetime', nullable: true }),
    __metadata("design:type", Date)
], Entidade.prototype, "ultAlteracao", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'NUMERO', length: 20, nullable: true }),
    __metadata("design:type", String)
], Entidade.prototype, "numero", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'VERIFICALIMITE', type: 'bit', nullable: true }),
    __metadata("design:type", Boolean)
], Entidade.prototype, "verificaLimite", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ name: 'CONSUMIDOR_FINAL', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Entidade.prototype, "consumidorFinal", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'TIPO_OPERACAO', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "tipoOperacao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'TIPO_CONTRIBUINTE', nullable: true }),
    __metadata("design:type", Number)
], Entidade.prototype, "tipoContribuinte", void 0);
__decorate([
    (0, graphql_1.Field)(() => [produto_entity_1.Produto], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => produto_entity_1.Produto, produto => produto.entidade),
    __metadata("design:type", Array)
], Entidade.prototype, "produtos", void 0);
exports.Entidade = Entidade = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_2.Directive)('@key(fields: "idEntidade idFilial")'),
    (0, typeorm_1.Entity)('ENTIDADES')
], Entidade);
//# sourceMappingURL=entidade.entity.js.map