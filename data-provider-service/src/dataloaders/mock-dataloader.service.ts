import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Produto, Entidade } from '../entities';
import { MockDataService } from '../services/mock-data.service';
import { IDataLoaders, createDataLoaderKey, parseDataLoaderKey } from './dataloader.interface';

@Injectable({ scope: Scope.REQUEST })
export class MockDataLoaderService implements IDataLoaders {
  // DataLoaders para Produtos
  public readonly produtoByIdLoader;
  public readonly produtosByEntidadeLoader;
  public readonly produtosByCodigoLoader;
  
  // DataLoaders para Entidades
  public readonly entidadeByIdLoader;
  public readonly entidadesByCnpjCpfLoader;
  public readonly entidadesByCategoriaLoader;
  
  // DataLoaders para métricas/utilitários
  public readonly estoqueLoader;
  public readonly limiteCreditoLoader;

  constructor(private readonly mockDataService: MockDataService) {
    // Inicializar DataLoaders para Produtos
    this.produtoByIdLoader = this.createProdutoByIdLoader();
    this.produtosByEntidadeLoader = this.createProdutosByEntidadeLoader();
    this.produtosByCodigoLoader = this.createProdutosByCodigoLoader();
    this.estoqueLoader = this.createEstoqueLoader();
    
    // Inicializar DataLoaders para Entidades
    this.entidadeByIdLoader = this.createEntidadeByIdLoader();
    this.entidadesByCnpjCpfLoader = this.createEntidadesByCnpjCpfLoader();
    this.entidadesByCategoriaLoader = this.createEntidadesByCategoriaLoader();
    this.limiteCreditoLoader = this.createLimiteCreditoLoader();
  }

  private createProdutoByIdLoader() {
    return new DataLoader<string, Produto | null>(
      async (keys: readonly string[]) => {
        const produtos = await this.mockDataService.findAllProdutos({}, { page: 1, limit: 100, sortBy: 'idProdutos', sortOrder: 'ASC' });
        
        const produtoMap = new Map<string, Produto>();
        produtos.data.forEach(produto => {
          const key = createDataLoaderKey(produto.idProdutos, produto.idFilial);
          produtoMap.set(key, produto);
        });

        return keys.map(key => produtoMap.get(key) || null);
      },
      { cache: true, maxBatchSize: 100 }
    );
  }

  private createProdutosByEntidadeLoader() {
    return new DataLoader<string, Produto[]>(
      async (keys: readonly string[]) => {
        const produtos = await this.mockDataService.findAllProdutos({}, { page: 1, limit: 100, sortBy: 'idProdutos', sortOrder: 'ASC' });
        
        const produtosByEntidade = new Map<string, Produto[]>();
        keys.forEach(key => produtosByEntidade.set(key, []));

        produtos.data.forEach(produto => {
          if (produto.idEntidade) {
            const key = createDataLoaderKey(produto.idEntidade, produto.idFilial);
            const existing = produtosByEntidade.get(key) || [];
            existing.push(produto);
            produtosByEntidade.set(key, existing);
          }
        });

        return keys.map(key => produtosByEntidade.get(key) || []);
      },
      { cache: true, maxBatchSize: 50 }
    );
  }

  private createProdutosByCodigoLoader() {
    return new DataLoader<string, Produto[]>(
      async (codigos: readonly string[]) => {
        const produtos = await this.mockDataService.findAllProdutos({}, { page: 1, limit: 100, sortBy: 'idProdutos', sortOrder: 'ASC' });
        
        const produtosByCodigo = new Map<string, Produto[]>();
        codigos.forEach(codigo => produtosByCodigo.set(codigo, []));

        produtos.data.forEach(produto => {
          if (produto.codigoProduto && codigos.includes(produto.codigoProduto)) {
            const existing = produtosByCodigo.get(produto.codigoProduto) || [];
            existing.push(produto);
            produtosByCodigo.set(produto.codigoProduto, existing);
          }
        });

        return codigos.map(codigo => produtosByCodigo.get(codigo) || []);
      },
      { cache: true, maxBatchSize: 50 }
    );
  }

  private createEntidadeByIdLoader() {
    return new DataLoader<string, Entidade | null>(
      async (keys: readonly string[]) => {
        const entidades = await this.mockDataService.findAllEntidades({}, { page: 1, limit: 100, sortBy: 'idEntidade', sortOrder: 'ASC' });
        
        const entidadeMap = new Map<string, Entidade>();
        entidades.data.forEach(entidade => {
          const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
          entidadeMap.set(key, entidade);
        });

        return keys.map(key => entidadeMap.get(key) || null);
      },
      { cache: true, maxBatchSize: 100 }
    );
  }

  private createEntidadesByCnpjCpfLoader() {
    return new DataLoader<string, Entidade[]>(
      async (cnpjCpfs: readonly string[]) => {
        const entidades = await this.mockDataService.findAllEntidades({}, { page: 1, limit: 100, sortBy: 'idEntidade', sortOrder: 'ASC' });
        
        const entidadesByCnpjCpf = new Map<string, Entidade[]>();
        cnpjCpfs.forEach(cnpjCpf => entidadesByCnpjCpf.set(cnpjCpf, []));

        entidades.data.forEach(entidade => {
          if (entidade.cnpjCpf && cnpjCpfs.includes(entidade.cnpjCpf)) {
            const existing = entidadesByCnpjCpf.get(entidade.cnpjCpf) || [];
            existing.push(entidade);
            entidadesByCnpjCpf.set(entidade.cnpjCpf, existing);
          }
        });

        return cnpjCpfs.map(cnpjCpf => entidadesByCnpjCpf.get(cnpjCpf) || []);
      },
      { cache: true, maxBatchSize: 50 }
    );
  }

  private createEntidadesByCategoriaLoader() {
    return new DataLoader<string, Entidade[]>(
      async (categorias: readonly string[]) => {
        const entidades = await this.mockDataService.findAllEntidades({}, { page: 1, limit: 100, sortBy: 'idEntidade', sortOrder: 'ASC' });
        
        const entidadesByCategoria = new Map<string, Entidade[]>();
        categorias.forEach(categoria => entidadesByCategoria.set(categoria, []));

        entidades.data.forEach(entidade => {
          if (entidade.categoria && categorias.includes(entidade.categoria)) {
            const existing = entidadesByCategoria.get(entidade.categoria) || [];
            existing.push(entidade);
            entidadesByCategoria.set(entidade.categoria, existing);
          }
        });

        return categorias.map(categoria => entidadesByCategoria.get(categoria) || []);
      },
      { cache: true, maxBatchSize: 50 }
    );
  }

  private createEstoqueLoader() {
    return new DataLoader<string, number>(
      async (keys: readonly string[]) => {
        return keys.map(() => Math.floor(Math.random() * 100)); // Mock estoque
      },
      { cache: true, maxBatchSize: 100 }
    );
  }

  private createLimiteCreditoLoader() {
    return new DataLoader<string, number>(
      async (keys: readonly string[]) => {
        const entidades = await this.mockDataService.findAllEntidades({}, { page: 1, limit: 100, sortBy: 'idEntidade', sortOrder: 'ASC' });
        
        const limiteMap = new Map<string, number>();
        entidades.data.forEach(entidade => {
          const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
          limiteMap.set(key, entidade.limite || 0);
        });

        return keys.map(key => limiteMap.get(key) || 0);
      },
      { cache: true, maxBatchSize: 100 }
    );
  }

  // Método para limpar todos os caches
  clearAll(): void {
    this.produtoByIdLoader.clearAll();
    this.produtosByEntidadeLoader.clearAll();
    this.produtosByCodigoLoader.clearAll();
    this.estoqueLoader.clearAll();
    
    this.entidadeByIdLoader.clearAll();
    this.entidadesByCnpjCpfLoader.clearAll();
    this.entidadesByCategoriaLoader.clearAll();
    this.limiteCreditoLoader.clearAll();
  }
}

