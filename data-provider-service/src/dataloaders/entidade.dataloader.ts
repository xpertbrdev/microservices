import DataLoader from 'dataloader';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Entidade } from '../entities';
import { 
  DataLoaderKey, 
  DataLoaderStringKey, 
  createDataLoaderKey, 
  parseDataLoaderKey 
} from './dataloader.interface';

@Injectable()
export class EntidadeDataLoader {
  private readonly logger = new Logger(EntidadeDataLoader.name);

  constructor(
    @InjectRepository(Entidade)
    private readonly entidadeRepository: Repository<Entidade>,
  ) {}

  // DataLoader para buscar entidades por ID
  createEntidadeByIdLoader(): DataLoader<DataLoaderStringKey, Entidade | null> {
    return new DataLoader<DataLoaderStringKey, Entidade | null>(
      async (keys: readonly DataLoaderStringKey[]) => {
        this.logger.debug(`Loading entidades by ID: ${keys.join(', ')}`);
        
        const parsedKeys = keys.map(parseDataLoaderKey);
        const entidades = await this.entidadeRepository.find({
          where: parsedKeys.map(({ id, idFilial }) => ({
            idEntidade: id,
            idFilial: idFilial,
          })),
        });

        // Criar mapa para lookup eficiente
        const entidadeMap = new Map<string, Entidade>();
        entidades.forEach(entidade => {
          const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
          entidadeMap.set(key, entidade);
        });

        // Retornar na mesma ordem das chaves
        return keys.map(key => entidadeMap.get(key) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );
  }

  // DataLoader para buscar entidades por CNPJ/CPF
  createEntidadesByCnpjCpfLoader(): DataLoader<string, Entidade[]> {
    return new DataLoader<string, Entidade[]>(
      async (cnpjCpfs: readonly string[]) => {
        this.logger.debug(`Loading entidades by CNPJ/CPF: ${cnpjCpfs.join(', ')}`);
        
        const entidades = await this.entidadeRepository.find({
          where: {
            cnpjCpf: In([...cnpjCpfs]),
          },
          order: { nomeEntidade: 'ASC' },
        });

        // Agrupar entidades por CNPJ/CPF
        const entidadesByCnpjCpf = new Map<string, Entidade[]>();
        
        // Inicializar com arrays vazios
        cnpjCpfs.forEach(cnpjCpf => {
          entidadesByCnpjCpf.set(cnpjCpf, []);
        });

        // Agrupar entidades
        entidades.forEach(entidade => {
          if (entidade.cnpjCpf) {
            const existing = entidadesByCnpjCpf.get(entidade.cnpjCpf) || [];
            existing.push(entidade);
            entidadesByCnpjCpf.set(entidade.cnpjCpf, existing);
          }
        });

        // Retornar na mesma ordem das chaves
        return cnpjCpfs.map(cnpjCpf => entidadesByCnpjCpf.get(cnpjCpf) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );
  }

  // DataLoader para buscar entidades por categoria
  createEntidadesByCategoriaLoader(): DataLoader<string, Entidade[]> {
    return new DataLoader<string, Entidade[]>(
      async (categorias: readonly string[]) => {
        this.logger.debug(`Loading entidades by categoria: ${categorias.join(', ')}`);
        
        const entidades = await this.entidadeRepository.find({
          where: {
            categoria: In([...categorias]),
          },
          order: { nomeEntidade: 'ASC' },
        });

        // Agrupar entidades por categoria
        const entidadesByCategoria = new Map<string, Entidade[]>();
        
        // Inicializar com arrays vazios
        categorias.forEach(categoria => {
          entidadesByCategoria.set(categoria, []);
        });

        // Agrupar entidades
        entidades.forEach(entidade => {
          if (entidade.categoria) {
            const existing = entidadesByCategoria.get(entidade.categoria) || [];
            existing.push(entidade);
            entidadesByCategoria.set(entidade.categoria, existing);
          }
        });

        // Retornar na mesma ordem das chaves
        return categorias.map(categoria => entidadesByCategoria.get(categoria) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );
  }

  // DataLoader para buscar limite de crédito
  createLimiteCreditoLoader(): DataLoader<DataLoaderStringKey, number> {
    return new DataLoader<DataLoaderStringKey, number>(
      async (keys: readonly DataLoaderStringKey[]) => {
        this.logger.debug(`Loading limite credito for: ${keys.join(', ')}`);
        
        const parsedKeys = keys.map(parseDataLoaderKey);
        const entidades = await this.entidadeRepository.find({
          where: parsedKeys.map(({ id, idFilial }) => ({
            idEntidade: id,
            idFilial: idFilial,
          })),
          select: ['idEntidade', 'idFilial', 'limite'],
        });

        // Criar mapa para lookup eficiente
        const limiteMap = new Map<string, number>();
        entidades.forEach(entidade => {
          const key = createDataLoaderKey(entidade.idEntidade, entidade.idFilial);
          limiteMap.set(key, entidade.limite || 0);
        });

        // Retornar na mesma ordem das chaves
        return keys.map(key => limiteMap.get(key) || 0);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );
  }
}

