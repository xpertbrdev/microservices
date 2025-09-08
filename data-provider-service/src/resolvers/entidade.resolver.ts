import { Resolver, Query, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Entidade, Produto } from '../entities';
import { LegacyAdapterService, PaginationOptions, FilterOptions } from '../services/legacy-adapter.service';
import { DataLoaderService, createDataLoaderKey } from '../dataloaders';
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
    @Context() context: any,
  ): Promise<Entidade | null> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(idEntidade, idFilial);
    return await dataLoaders.entidadeByIdLoader.load(key);
  }

  @Query(() => [Entidade], { name: 'entidadesByCnpjCpf' })
  async findEntidadesByCnpjCpf(
    @Args('cnpjCpf') cnpjCpf: string,
    @Context() context: any,
  ): Promise<Entidade[]> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    return await dataLoaders.entidadesByCnpjCpfLoader.load(cnpjCpf);
  }

  @Query(() => [Entidade], { name: 'entidadesByCategoria' })
  async findEntidadesByCategoria(
    @Args('categoria') categoria: string,
    @Context() context: any,
  ): Promise<Entidade[]> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    return await dataLoaders.entidadesByCategoriaLoader.load(categoria);
  }

  @Query(() => Int, { name: 'limiteCredito' })
  async getLimiteCredito(
    @Args('idEntidade', { type: () => Int }) idEntidade: number,
    @Args('idFilial', { type: () => Int }) idFilial: number,
    @Context() context: any,
  ): Promise<number> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(idEntidade, idFilial);
    return await dataLoaders.limiteCreditoLoader.load(key);
  }

  // Resolver de campo para carregar produtos relacionados usando DataLoader
  @ResolveField(() => [Produto], { nullable: true })
  async produtos(
    @Parent() entidade: Entidade,
    @Context() context: any,
  ): Promise<Produto[]> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
    return await dataLoaders.produtosByEntidadeLoader.load(key);
  }

  // Resolver de campo para carregar limite de crédito usando DataLoader
  @ResolveField(() => Int, { name: 'limiteCreditoAtual' })
  async limiteCreditoAtual(
    @Parent() entidade: Entidade,
    @Context() context: any,
  ): Promise<number> {
    const dataLoaders: DataLoaderService = context.dataLoaders;
    const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
    return await dataLoaders.limiteCreditoLoader.load(key);
  }
}

