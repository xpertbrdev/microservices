import { Injectable, Scope } from '@nestjs/common';
import { ProdutoDataLoader } from './produto.dataloader';
import { EntidadeDataLoader } from './entidade.dataloader';
import { IDataLoaders } from './dataloader.interface';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService implements IDataLoaders {
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

  constructor(
    private readonly produtoDataLoader: ProdutoDataLoader,
    private readonly entidadeDataLoader: EntidadeDataLoader,
  ) {
    // Inicializar DataLoaders para Produtos
    this.produtoByIdLoader = this.produtoDataLoader.createProdutoByIdLoader();
    this.produtosByEntidadeLoader = this.produtoDataLoader.createProdutosByEntidadeLoader();
    this.produtosByCodigoLoader = this.produtoDataLoader.createProdutosByCodigoLoader();
    this.estoqueLoader = this.produtoDataLoader.createEstoqueLoader();
    
    // Inicializar DataLoaders para Entidades
    this.entidadeByIdLoader = this.entidadeDataLoader.createEntidadeByIdLoader();
    this.entidadesByCnpjCpfLoader = this.entidadeDataLoader.createEntidadesByCnpjCpfLoader();
    this.entidadesByCategoriaLoader = this.entidadeDataLoader.createEntidadesByCategoriaLoader();
    this.limiteCreditoLoader = this.entidadeDataLoader.createLimiteCreditoLoader();
  }

  // Método para limpar todos os caches (útil para testes)
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

  // Método para limpar cache específico de um produto
  clearProduto(idProdutos: number, idFilial: number): void {
    const key = `${idProdutos}:${idFilial}`;
    this.produtoByIdLoader.clear(key);
    this.estoqueLoader.clear(key);
  }

  // Método para limpar cache específico de uma entidade
  clearEntidade(idEntidade: number, idFilial: number): void {
    const key = `${idEntidade}:${idFilial}`;
    this.entidadeByIdLoader.clear(key);
    this.limiteCreditoLoader.clear(key);
    this.produtosByEntidadeLoader.clear(key);
  }
}

