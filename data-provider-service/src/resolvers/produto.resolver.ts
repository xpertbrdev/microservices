import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Produto, Entidade } from '../entities';
import { LegacyAdapterService, PaginationOptions, FilterOptions } from '../services/legacy-adapter.service';
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
  ): Promise<Produto | null> {
    return await this.legacyAdapterService.findProdutoById(idProdutos, idFilial);
  }

  @Query(() => [Produto], { name: 'produtosByCodigo' })
  async findProdutosByCodigo(
    @Args('codigo') codigo: string,
    @Args('idFilial', { type: () => Int, nullable: true }) idFilial?: number,
  ): Promise<Produto[]> {
    return await this.legacyAdapterService.findProdutosByCodigo(codigo, idFilial);
  }

  @Query(() => [Produto], { name: 'produtosByEntidade' })
  async findProdutosByEntidade(
    @Args('idEntidade', { type: () => Int }) idEntidade: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
  ): Promise<Produto[]> {
    return await this.legacyAdapterService.findProdutosByEntidade(idEntidade, idFilial);
  }

  @Query(() => Int, { name: 'estoque' })
  async getEstoque(
    @Args('idProdutos', { type: () => Int }) idProdutos: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
  ): Promise<number> {
    return await this.legacyAdapterService.getEstoque(idProdutos, idFilial);
  }

  // Resolver de campo para carregar entidade relacionada
  @ResolveField(() => Entidade, { nullable: true })
  async entidade(@Parent() produto: Produto): Promise<Entidade | null> {
    if (!produto.idEntidade) return null;
    
    return await this.legacyAdapterService.findEntidadeById(
      produto.idEntidade,
      produto.idFilial
    );
  }
}

