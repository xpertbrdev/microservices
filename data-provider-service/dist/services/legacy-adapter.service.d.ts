import { Repository } from 'typeorm';
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
export declare class LegacyAdapterService {
    private readonly produtoRepository;
    private readonly entidadeRepository;
    private readonly logger;
    constructor(produtoRepository: Repository<Produto>, entidadeRepository: Repository<Entidade>);
    findAllProdutos(filters?: FilterOptions, pagination?: PaginationOptions): Promise<{
        data: Produto[];
        total: number;
        page: number;
        limit: number;
    }>;
    findProdutoById(idProdutos: number, idFilial: number): Promise<Produto | null>;
    findProdutosByCodigo(codigo: string, idFilial?: number): Promise<Produto[]>;
    findProdutosByEntidade(idEntidade: number, idFilial: number): Promise<Produto[]>;
    findAllEntidades(filters?: FilterOptions, pagination?: PaginationOptions): Promise<{
        data: Entidade[];
        total: number;
        page: number;
        limit: number;
    }>;
    findEntidadeById(idEntidade: number, idFilial: number): Promise<Entidade | null>;
    findEntidadesByCnpjCpf(cnpjCpf: string, idFilial?: number): Promise<Entidade[]>;
    findEntidadesByCategoria(categoria: string, idFilial?: number): Promise<Entidade[]>;
    getEstoque(idProdutos: number, idFilial: number): Promise<number>;
    getLimiteCredito(idEntidade: number, idFilial: number): Promise<number>;
    getHealthCheck(): Promise<{
        status: string;
        timestamp: Date;
        counts: any;
    }>;
}
