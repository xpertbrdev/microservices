import { Produto, Entidade } from '../entities';
import { LegacyAdapterService } from '../services/legacy-adapter.service';
declare class ProdutoConnection {
    data: Produto[];
    total: number;
    page: number;
    limit: number;
}
export declare class ProdutoResolver {
    private readonly legacyAdapterService;
    constructor(legacyAdapterService: LegacyAdapterService);
    findAllProdutos(page: number, limit: number, sortBy: string, sortOrder: 'ASC' | 'DESC', ativo: boolean, idFilial?: number, search?: string): Promise<ProdutoConnection>;
    findProdutoById(idProdutos: number, idFilial: number): Promise<Produto | null>;
    findProdutosByCodigo(codigo: string, idFilial?: number): Promise<Produto[]>;
    findProdutosByEntidade(idEntidade: number, idFilial: number): Promise<Produto[]>;
    getEstoque(idProdutos: number, idFilial: number): Promise<number>;
    entidade(produto: Produto): Promise<Entidade | null>;
}
export {};
