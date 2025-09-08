import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Produto, Entidade } from '../entities';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface FilterOptions {
  ativo?: boolean;
  idFilial?: number;
  search?: string;
}

@Injectable()
export class LegacyAdapterService {
  private readonly logger = new Logger(LegacyAdapterService.name);

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Entidade)
    private readonly entidadeRepository: Repository<Entidade>,
  ) {}

  // ========== PRODUTOS ==========

  async findAllProdutos(
    filters: FilterOptions = {},
    pagination: PaginationOptions = {}
  ): Promise<{ data: Produto[]; total: number; page: number; limit: number }> {
    try {
      const { page = 1, limit = 50, sortBy = 'idProdutos', sortOrder = 'ASC' } = pagination;
      const { ativo = true, idFilial, search } = filters;

      const queryBuilder = this.produtoRepository
        .createQueryBuilder('produto')
        .leftJoinAndSelect('produto.entidade', 'entidade');

      // Filtros
      if (ativo !== undefined) {
        queryBuilder.andWhere('produto.ativo = :ativo', { ativo });
      }

      if (idFilial) {
        queryBuilder.andWhere('produto.idFilial = :idFilial', { idFilial });
      }

      if (search) {
        queryBuilder.andWhere(
          '(produto.nomeProduto LIKE :search OR produto.codigoProduto LIKE :search OR produto.codigoBarraProduto LIKE :search)',
          { search: `%${search}%` }
        );
      }

      // Ordenação
      queryBuilder.orderBy(`produto.${sortBy}`, sortOrder);

      // Paginação
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
    } catch (error) {
      this.logger.error('Error finding produtos:', error);
      throw error;
    }
  }

  async findProdutoById(idProdutos: number, idFilial: number): Promise<Produto | null> {
    try {
      const produto = await this.produtoRepository.findOne({
        where: { idProdutos, idFilial },
        relations: ['entidade'],
      });

      if (produto) {
        this.logger.log(`Found produto: ${produto.nomeProduto}`);
      }

      return produto;
    } catch (error) {
      this.logger.error(`Error finding produto ${idProdutos}:`, error);
      throw error;
    }
  }

  async findProdutosByCodigo(codigo: string, idFilial?: number): Promise<Produto[]> {
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
    } catch (error) {
      this.logger.error(`Error finding produtos by code ${codigo}:`, error);
      throw error;
    }
  }

  async findProdutosByEntidade(idEntidade: number, idFilial: number): Promise<Produto[]> {
    try {
      const produtos = await this.produtoRepository.find({
        where: { idEntidade, idFilial },
        relations: ['entidade'],
        order: { nomeProduto: 'ASC' },
      });

      this.logger.log(`Found ${produtos.length} produtos for entidade ${idEntidade}`);
      return produtos;
    } catch (error) {
      this.logger.error(`Error finding produtos by entidade ${idEntidade}:`, error);
      throw error;
    }
  }

  // ========== ENTIDADES ==========

  async findAllEntidades(
    filters: FilterOptions = {},
    pagination: PaginationOptions = {}
  ): Promise<{ data: Entidade[]; total: number; page: number; limit: number }> {
    try {
      const { page = 1, limit = 50, sortBy = 'idEntidade', sortOrder = 'ASC' } = pagination;
      const { ativo = true, idFilial, search } = filters;

      const queryBuilder = this.entidadeRepository
        .createQueryBuilder('entidade')
        .leftJoinAndSelect('entidade.produtos', 'produtos');

      // Filtros
      if (ativo !== undefined) {
        queryBuilder.andWhere('entidade.ativo = :ativo', { ativo });
      }

      if (idFilial) {
        queryBuilder.andWhere('entidade.idFilial = :idFilial', { idFilial });
      }

      if (search) {
        queryBuilder.andWhere(
          '(entidade.nomeEntidade LIKE :search OR entidade.razaoSocialEntidade LIKE :search OR entidade.cnpjCpf LIKE :search)',
          { search: `%${search}%` }
        );
      }

      // Ordenação
      queryBuilder.orderBy(`entidade.${sortBy}`, sortOrder);

      // Paginação
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
    } catch (error) {
      this.logger.error('Error finding entidades:', error);
      throw error;
    }
  }

  async findEntidadeById(idEntidade: number, idFilial: number): Promise<Entidade | null> {
    try {
      const entidade = await this.entidadeRepository.findOne({
        where: { idEntidade, idFilial },
        relations: ['produtos'],
      });

      if (entidade) {
        this.logger.log(`Found entidade: ${entidade.nomeEntidade}`);
      }

      return entidade;
    } catch (error) {
      this.logger.error(`Error finding entidade ${idEntidade}:`, error);
      throw error;
    }
  }

  async findEntidadesByCnpjCpf(cnpjCpf: string, idFilial?: number): Promise<Entidade[]> {
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
    } catch (error) {
      this.logger.error(`Error finding entidades by CNPJ/CPF ${cnpjCpf}:`, error);
      throw error;
    }
  }

  async findEntidadesByCategoria(categoria: string, idFilial?: number): Promise<Entidade[]> {
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
    } catch (error) {
      this.logger.error(`Error finding entidades by categoria ${categoria}:`, error);
      throw error;
    }
  }

  // ========== MÉTODOS UTILITÁRIOS ==========

  async getEstoque(idProdutos: number, idFilial: number): Promise<number> {
    try {
      const produto = await this.findProdutoById(idProdutos, idFilial);
      return produto?.qtdeTotal || 0;
    } catch (error) {
      this.logger.error(`Error getting estoque for produto ${idProdutos}:`, error);
      return 0;
    }
  }

  async getLimiteCredito(idEntidade: number, idFilial: number): Promise<number> {
    try {
      const entidade = await this.findEntidadeById(idEntidade, idFilial);
      return entidade?.limite || 0;
    } catch (error) {
      this.logger.error(`Error getting limite for entidade ${idEntidade}:`, error);
      return 0;
    }
  }

  async getHealthCheck(): Promise<{ status: string; timestamp: Date; counts: any }> {
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
    } catch (error) {
      this.logger.error('Health check failed:', error);
      throw error;
    }
  }
}

