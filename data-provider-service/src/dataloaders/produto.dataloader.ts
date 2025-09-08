import DataLoader from 'dataloader';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Produto } from '../entities';
import { 
  DataLoaderKey, 
  DataLoaderStringKey, 
  createDataLoaderKey, 
  parseDataLoaderKey 
} from './dataloader.interface';

@Injectable()
export class ProdutoDataLoader {
  private readonly logger = new Logger(ProdutoDataLoader.name);

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  // DataLoader para buscar produtos por ID
  createProdutoByIdLoader(): DataLoader<DataLoaderStringKey, Produto | null> {
    return new DataLoader<DataLoaderStringKey, Produto | null>(
      async (keys: readonly DataLoaderStringKey[]) => {
        this.logger.debug(`Loading produtos by ID: ${keys.join(', ')}`);
        
        const parsedKeys = keys.map(parseDataLoaderKey);
        const produtos = await this.produtoRepository.find({
          where: parsedKeys.map(({ id, idFilial }) => ({
            idProdutos: id,
            idFilial: idFilial,
          })),
        });

        // Criar mapa para lookup eficiente
        const produtoMap = new Map<string, Produto>();
        produtos.forEach(produto => {
          const key = createDataLoaderKey(produto.idProdutos, produto.idFilial);
          produtoMap.set(key, produto);
        });

        // Retornar na mesma ordem das chaves
        return keys.map(key => produtoMap.get(key) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );
  }

  // DataLoader para buscar produtos por entidade
  createProdutosByEntidadeLoader(): DataLoader<DataLoaderStringKey, Produto[]> {
    return new DataLoader<DataLoaderStringKey, Produto[]>(
      async (keys: readonly DataLoaderStringKey[]) => {
        this.logger.debug(`Loading produtos by entidade: ${keys.join(', ')}`);
        
        const parsedKeys = keys.map(parseDataLoaderKey);
        const produtos = await this.produtoRepository.find({
          where: parsedKeys.map(({ id, idFilial }) => ({
            idEntidade: id,
            idFilial: idFilial,
          })),
          order: { nomeProduto: 'ASC' },
        });

        // Agrupar produtos por entidade
        const produtosByEntidade = new Map<string, Produto[]>();
        
        // Inicializar com arrays vazios
        keys.forEach(key => {
          produtosByEntidade.set(key, []);
        });

        // Agrupar produtos
        produtos.forEach(produto => {
          if (produto.idEntidade) {
            const key = createDataLoaderKey(produto.idEntidade, produto.idFilial);
            const existing = produtosByEntidade.get(key) || [];
            existing.push(produto);
            produtosByEntidade.set(key, existing);
          }
        });

        // Retornar na mesma ordem das chaves
        return keys.map(key => produtosByEntidade.get(key) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );
  }

  // DataLoader para buscar produtos por código
  createProdutosByCodigoLoader(): DataLoader<string, Produto[]> {
    return new DataLoader<string, Produto[]>(
      async (codigos: readonly string[]) => {
        this.logger.debug(`Loading produtos by codigo: ${codigos.join(', ')}`);
        
        const produtos = await this.produtoRepository.find({
          where: {
            codigoProduto: In([...codigos]),
          },
          order: { nomeProduto: 'ASC' },
        });

        // Agrupar produtos por código
        const produtosByCodigo = new Map<string, Produto[]>();
        
        // Inicializar com arrays vazios
        codigos.forEach(codigo => {
          produtosByCodigo.set(codigo, []);
        });

        // Agrupar produtos
        produtos.forEach(produto => {
          if (produto.codigoProduto) {
            const existing = produtosByCodigo.get(produto.codigoProduto) || [];
            existing.push(produto);
            produtosByCodigo.set(produto.codigoProduto, existing);
          }
        });

        // Retornar na mesma ordem das chaves
        return codigos.map(codigo => produtosByCodigo.get(codigo) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );
  }

  // DataLoader para buscar estoque
  createEstoqueLoader(): DataLoader<DataLoaderStringKey, number> {
    return new DataLoader<DataLoaderStringKey, number>(
      async (keys: readonly DataLoaderStringKey[]) => {
        this.logger.debug(`Loading estoque for: ${keys.join(', ')}`);
        
        const parsedKeys = keys.map(parseDataLoaderKey);
        const produtos = await this.produtoRepository.find({
          where: parsedKeys.map(({ id, idFilial }) => ({
            idProdutos: id,
            idFilial: idFilial,
          })),
          select: ['idProdutos', 'idFilial', 'qtdeTotal'],
        });

        // Criar mapa para lookup eficiente
        const estoqueMap = new Map<string, number>();
        produtos.forEach(produto => {
          const key = createDataLoaderKey(produto.idProdutos, produto.idFilial);
          estoqueMap.set(key, produto.qtdeTotal || 0);
        });

        // Retornar na mesma ordem das chaves
        return keys.map(key => estoqueMap.get(key) || 0);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );
  }
}

