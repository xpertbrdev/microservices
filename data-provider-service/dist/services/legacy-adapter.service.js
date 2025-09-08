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
var LegacyAdapterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyAdapterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let LegacyAdapterService = LegacyAdapterService_1 = class LegacyAdapterService {
    produtoRepository;
    entidadeRepository;
    logger = new common_1.Logger(LegacyAdapterService_1.name);
    constructor(produtoRepository, entidadeRepository) {
        this.produtoRepository = produtoRepository;
        this.entidadeRepository = entidadeRepository;
    }
    async findAllProdutos(filters = {}, pagination = {}) {
        try {
            const { page = 1, limit = 50, sortBy = 'idProdutos', sortOrder = 'ASC' } = pagination;
            const { ativo = true, idFilial, search } = filters;
            const queryBuilder = this.produtoRepository
                .createQueryBuilder('produto')
                .leftJoinAndSelect('produto.entidade', 'entidade');
            if (ativo !== undefined) {
                queryBuilder.andWhere('produto.ativo = :ativo', { ativo });
            }
            if (idFilial) {
                queryBuilder.andWhere('produto.idFilial = :idFilial', { idFilial });
            }
            if (search) {
                queryBuilder.andWhere('(produto.nomeProduto LIKE :search OR produto.codigoProduto LIKE :search OR produto.codigoBarraProduto LIKE :search)', { search: `%${search}%` });
            }
            queryBuilder.orderBy(`produto.${sortBy}`, sortOrder);
            const offset = (page - 1) * limit;
            queryBuilder.skip(offset).take(limit);
            const [data, total] = await queryBuilder.getManyAndCount();
            this.logger.log(`Found ${data.length} produtos (total: ${total})`);
            return {
                data,
                total,
                page,
                limit,
            };
        }
        catch (error) {
            this.logger.error('Error finding produtos:', error);
            throw error;
        }
    }
    async findProdutoById(idProdutos, idFilial) {
        try {
            const produto = await this.produtoRepository.findOne({
                where: { idProdutos, idFilial },
                relations: ['entidade'],
            });
            if (produto) {
                this.logger.log(`Found produto: ${produto.nomeProduto}`);
            }
            return produto;
        }
        catch (error) {
            this.logger.error(`Error finding produto ${idProdutos}:`, error);
            throw error;
        }
    }
    async findProdutosByCodigo(codigo, idFilial) {
        try {
            const queryBuilder = this.produtoRepository
                .createQueryBuilder('produto')
                .leftJoinAndSelect('produto.entidade', 'entidade')
                .where('produto.codigoProduto = :codigo OR produto.codigoBarraProduto = :codigo', { codigo });
            if (idFilial) {
                queryBuilder.andWhere('produto.idFilial = :idFilial', { idFilial });
            }
            const produtos = await queryBuilder.getMany();
            this.logger.log(`Found ${produtos.length} produtos with code: ${codigo}`);
            return produtos;
        }
        catch (error) {
            this.logger.error(`Error finding produtos by code ${codigo}:`, error);
            throw error;
        }
    }
    async findProdutosByEntidade(idEntidade, idFilial) {
        try {
            const produtos = await this.produtoRepository.find({
                where: { idEntidade, idFilial },
                relations: ['entidade'],
                order: { nomeProduto: 'ASC' },
            });
            this.logger.log(`Found ${produtos.length} produtos for entidade ${idEntidade}`);
            return produtos;
        }
        catch (error) {
            this.logger.error(`Error finding produtos by entidade ${idEntidade}:`, error);
            throw error;
        }
    }
    async findAllEntidades(filters = {}, pagination = {}) {
        try {
            const { page = 1, limit = 50, sortBy = 'idEntidade', sortOrder = 'ASC' } = pagination;
            const { ativo = true, idFilial, search } = filters;
            const queryBuilder = this.entidadeRepository
                .createQueryBuilder('entidade')
                .leftJoinAndSelect('entidade.produtos', 'produtos');
            if (ativo !== undefined) {
                queryBuilder.andWhere('entidade.ativo = :ativo', { ativo });
            }
            if (idFilial) {
                queryBuilder.andWhere('entidade.idFilial = :idFilial', { idFilial });
            }
            if (search) {
                queryBuilder.andWhere('(entidade.nomeEntidade LIKE :search OR entidade.razaoSocialEntidade LIKE :search OR entidade.cnpjCpf LIKE :search)', { search: `%${search}%` });
            }
            queryBuilder.orderBy(`entidade.${sortBy}`, sortOrder);
            const offset = (page - 1) * limit;
            queryBuilder.skip(offset).take(limit);
            const [data, total] = await queryBuilder.getManyAndCount();
            this.logger.log(`Found ${data.length} entidades (total: ${total})`);
            return {
                data,
                total,
                page,
                limit,
            };
        }
        catch (error) {
            this.logger.error('Error finding entidades:', error);
            throw error;
        }
    }
    async findEntidadeById(idEntidade, idFilial) {
        try {
            const entidade = await this.entidadeRepository.findOne({
                where: { idEntidade, idFilial },
                relations: ['produtos'],
            });
            if (entidade) {
                this.logger.log(`Found entidade: ${entidade.nomeEntidade}`);
            }
            return entidade;
        }
        catch (error) {
            this.logger.error(`Error finding entidade ${idEntidade}:`, error);
            throw error;
        }
    }
    async findEntidadesByCnpjCpf(cnpjCpf, idFilial) {
        try {
            const queryBuilder = this.entidadeRepository
                .createQueryBuilder('entidade')
                .leftJoinAndSelect('entidade.produtos', 'produtos')
                .where('entidade.cnpjCpf = :cnpjCpf', { cnpjCpf });
            if (idFilial) {
                queryBuilder.andWhere('entidade.idFilial = :idFilial', { idFilial });
            }
            const entidades = await queryBuilder.getMany();
            this.logger.log(`Found ${entidades.length} entidades with CNPJ/CPF: ${cnpjCpf}`);
            return entidades;
        }
        catch (error) {
            this.logger.error(`Error finding entidades by CNPJ/CPF ${cnpjCpf}:`, error);
            throw error;
        }
    }
    async findEntidadesByCategoria(categoria, idFilial) {
        try {
            const queryBuilder = this.entidadeRepository
                .createQueryBuilder('entidade')
                .where('entidade.categoria = :categoria', { categoria });
            if (idFilial) {
                queryBuilder.andWhere('entidade.idFilial = :idFilial', { idFilial });
            }
            const entidades = await queryBuilder.getMany();
            this.logger.log(`Found ${entidades.length} entidades with categoria: ${categoria}`);
            return entidades;
        }
        catch (error) {
            this.logger.error(`Error finding entidades by categoria ${categoria}:`, error);
            throw error;
        }
    }
    async getEstoque(idProdutos, idFilial) {
        try {
            const produto = await this.findProdutoById(idProdutos, idFilial);
            return produto?.qtdeTotal || 0;
        }
        catch (error) {
            this.logger.error(`Error getting estoque for produto ${idProdutos}:`, error);
            return 0;
        }
    }
    async getLimiteCredito(idEntidade, idFilial) {
        try {
            const entidade = await this.findEntidadeById(idEntidade, idFilial);
            return entidade?.limite || 0;
        }
        catch (error) {
            this.logger.error(`Error getting limite for entidade ${idEntidade}:`, error);
            return 0;
        }
    }
    async getHealthCheck() {
        try {
            const [produtoCount, entidadeCount] = await Promise.all([
                this.produtoRepository.count({ where: { ativo: true } }),
                this.entidadeRepository.count({ where: { ativo: true } }),
            ]);
            return {
                status: 'healthy',
                timestamp: new Date(),
                counts: {
                    produtos: produtoCount,
                    entidades: entidadeCount,
                },
            };
        }
        catch (error) {
            this.logger.error('Health check failed:', error);
            throw error;
        }
    }
};
exports.LegacyAdapterService = LegacyAdapterService;
exports.LegacyAdapterService = LegacyAdapterService = LegacyAdapterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Produto)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Entidade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LegacyAdapterService);
//# sourceMappingURL=legacy-adapter.service.js.map