import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Entidade, Produto } from '../entities';
import { LegacyAdapterService, PaginationOptions, FilterOptions } from '../services/legacy-adapter.service';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class EntidadeConnection {
  @Field(() => [Entidade])
  data: Entidade[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@Resolver(() => Entidade)
export class EntidadeResolver {
  constructor(
    @Inject('LegacyAdapterService') 
    private readonly legacyAdapterService: LegacyAdapterService
  ) {}

  @Query(() => EntidadeConnection, { name: 'entidades' })
  async findAllEntidades(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 }) limit: number,
    @Args('sortBy', { nullable: true, defaultValue: 'idEntidade' }) sortBy: string,
    @Args('sortOrder', { nullable: true, defaultValue: 'ASC' }) sortOrder: 'ASC' | 'DESC',
    @Args('ativo', { type: () => Boolean, nullable: true, defaultValue: true }) ativo: boolean,
    @Args('idFilial', { type: () => Int, nullable: true }) idFilial?: number,
    @Args('search', { nullable: true }) search?: string,
  ): Promise<EntidadeConnection> {
    const pagination: PaginationOptions = { page, limit, sortBy, sortOrder };
    const filters: FilterOptions = { ativo, idFilial, search };
    
    return await this.legacyAdapterService.findAllEntidades(filters, pagination);
  }

  @Query(() => Entidade, { name: 'entidade', nullable: true })
  async findEntidadeById(
    @Args('idEntidade', { type: () => Int }) idEntidade: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
  ): Promise<Entidade | null> {
    return await this.legacyAdapterService.findEntidadeById(idEntidade, idFilial);
  }

  @Query(() => [Entidade], { name: 'entidadesByCnpjCpf' })
  async findEntidadesByCnpjCpf(
    @Args('cnpjCpf') cnpjCpf: string,
    @Args('idFilial', { type: () => Int, nullable: true }) idFilial?: number,
  ): Promise<Entidade[]> {
    return await this.legacyAdapterService.findEntidadesByCnpjCpf(cnpjCpf, idFilial);
  }

  @Query(() => [Entidade], { name: 'entidadesByCategoria' })
  async findEntidadesByCategoria(
    @Args('categoria') categoria: string,
    @Args('idFilial', { type: () => Int, nullable: true }) idFilial?: number,
  ): Promise<Entidade[]> {
    return await this.legacyAdapterService.findEntidadesByCategoria(categoria, idFilial);
  }

  @Query(() => Int, { name: 'limiteCredito' })
  async getLimiteCredito(
    @Args('idEntidade', { type: () => Int }) idEntidade: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
  ): Promise<number> {
    return await this.legacyAdapterService.getLimiteCredito(idEntidade, idFilial);
  }

  // Resolver de campo para carregar produtos relacionados
  @ResolveField(() => [Produto], { nullable: true })
  async produtos(@Parent() entidade: Entidade): Promise<Produto[]> {
    return await this.legacyAdapterService.findProdutosByEntidade(
      entidade.idEntidade,
      entidade.idFilial
    );
  }
}

