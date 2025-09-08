import DataLoader from 'dataloader';
import { Produto, Entidade } from '../entities';

export interface IDataLoaders {
  // DataLoaders para Produtos
  produtoByIdLoader: DataLoader<string, Produto | null>;
  produtosByEntidadeLoader: DataLoader<string, Produto[]>;
  produtosByCodigoLoader: DataLoader<string, Produto[]>;
  
  // DataLoaders para Entidades
  entidadeByIdLoader: DataLoader<string, Entidade | null>;
  entidadesByCnpjCpfLoader: DataLoader<string, Entidade[]>;
  entidadesByCategoriaLoader: DataLoader<string, Entidade[]>;
  
  // DataLoaders para métricas/utilitários
  estoqueLoader: DataLoader<string, number>;
  limiteCreditoLoader: DataLoader<string, number>;
}

export type DataLoaderKey = {
  id: number;
  idFilial: number;
};

export type DataLoaderStringKey = string; // Formato: "id:idFilial"

// Utility functions para criar chaves
export const createDataLoaderKey = (id: number, idFilial: number): string => {
  return `${id}:${idFilial}`;
};

export const parseDataLoaderKey = (key: string): DataLoaderKey => {
  const [id, idFilial] = key.split(':').map(Number);
  return { id, idFilial };
};

