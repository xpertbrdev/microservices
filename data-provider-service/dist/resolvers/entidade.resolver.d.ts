import { Entidade, Produto } from '../entities';
import { LegacyAdapterService } from '../services/legacy-adapter.service';
declare class EntidadeConnection {
    data: Entidade[];
    total: number;
    page: number;
    limit: number;
}
export declare class EntidadeResolver {
    private readonly legacyAdapterService;
    constructor(legacyAdapterService: LegacyAdapterService);
    findAllEntidades(page: number, limit: number, sortBy: string, sortOrder: 'ASC' | 'DESC', ativo: boolean, idFilial?: number, search?: string): Promise<EntidadeConnection>;
    findEntidadeById(idEntidade: number, idFilial: number): Promise<Entidade | null>;
    findEntidadesByCnpjCpf(cnpjCpf: string, idFilial?: number): Promise<Entidade[]>;
    findEntidadesByCategoria(categoria: string, idFilial?: number): Promise<Entidade[]>;
    getLimiteCredito(idEntidade: number, idFilial: number): Promise<number>;
    produtos(entidade: Entidade): Promise<Produto[]>;
}
export {};
