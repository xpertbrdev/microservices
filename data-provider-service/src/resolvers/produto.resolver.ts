import { Resolver, Query, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Produto, Entidade } from '../entities';
import { LegacyAdapterService, PaginationOptions, FilterOptions } from '../services/legacy-adapter.service';
import { DataLoaderService, createDataLoaderKey } from '../dataloaders';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class ProdutoConnection {
  @Field(() => [Produto])
  data: Produto[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@Resolver(() => Produto)
export class ProdutoResolver {
  constructor(
    @Inject('LegacyAdapterService') 
    private readonly legacyAdapterService: LegacyAdapterService
  ) {}

  @Query(() => ProdutoConnection, { name: 'produtos' })
  async findAllProdutos(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 }) limit: number,
    @Args('sortBy', { nullable: true, defaultValue: 'idProdutos' }) sortBy: string,
    @Args('sortOrder', { nullable: true, defaultValue: 'ASC' }) sortOrder: 'ASC' | 'DESC',
    @Args('ativo', { type: () => Boolean, nullable: true, defaultValue: true }) ativo: boolean,
    @Args('idFilial', { type: () => Int, nullable: true }) idFilial?: number,
    @Args('search', { nullable: true }) search?: string,
  ): Promise<ProdutoConnection> {
    const pagination: PaginationOptions = { page, limit, sortBy, sortOrder };
    const filters: FilterOptions = { ativo, idFilial, search };
    
    return await this.legacyAdapterService.findAllProdutos(filters, pagination);
  }

  @Query(() => Produto, { name: 'produto', nullable: true })
  async findProdutoById(
    @Args('idProdutos', { type: () => Int }) idProdutos: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
    @Context() context: any,
  ): Promise<Produto | null> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(idProdutos, idFilial);
    return await dataLoaders.produtoByIdLoader.load(key);
  }

  @Query(() => [Produto], { name: 'produtosByCodigo' })
  async findProdutosByCodigo(
    @Args('codigo') codigo: string,
    @Context() context: any,
  ): Promise<Produto[]> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    return await dataLoaders.produtosByCodigoLoader.load(codigo);
  }

  @Query(() => [Produto], { name: 'produtosByEntidade' })
  async findProdutosByEntidade(
    @Args('idEntidade', { type: () => Int }) idEntidade: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
    @Context() context: any,
  ): Promise<Produto[]> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(idEntidade, idFilial);
    return await dataLoaders.produtosByEntidadeLoader.load(key);
  }

  @Query(() => Int, { name: 'estoque' })
  async getEstoque(
    @Args('idProdutos', { type: () => Int }) idProdutos: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
    @Context() context: any,
  ): Promise<number> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(idProdutos, idFilial);
    return await dataLoaders.estoqueLoader.load(key);
  }

  // Resolver de campo para carregar entidade relacionada usando DataLoader
  @ResolveField(() => Entidade, { nullable: true })
  async entidade(
    @Parent() produto: Produto,
    @Context() context: any,
  ): Promise<Entidade | null> {
    if (!produto.idEntidade) {
      return null;
    }

    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(produto.idEntidade, produto.idFilial);
    return await dataLoaders.entidadeByIdLoader.load(key);
  }

  // Resolver de campo para carregar estoque usando DataLoader
  @ResolveField(() => Int, { name: 'estoqueAtual' })
  async estoqueAtual(
    @Parent() produto: Produto,
    @Context() context: any,
  ): Promise<number> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(produto.idProdutos, produto.idFilial);
    return await dataLoaders.estoqueLoader.load(key);
  }
}

