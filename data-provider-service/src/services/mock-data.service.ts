import { Injectable, Logger } from '@nestjs/common';
import { Produto, Entidade } from '../entities';

@Injectable()
export class MockDataService {
  private readonly logger = new Logger(MockDataService.name);

  // Mock data for products
  private mockProdutos: Produto[] = [
    {
      idProdutos: 1,
      idFilial: 1,
      idEntidade: 1,
      nomeProduto: 'Produto Mock 1',
      codigoProduto: 'MOCK001',
      custoMedio: 10.50,
      ativo: true,
      unidade: 'UN',
      qtdeTotal: 100,
      dataCadastro: new Date(),
      ultAlteracao: new Date(),
    } as Produto,
    {
      idProdutos: 2,
      idFilial: 1,
      idEntidade: 2,
      nomeProduto: 'Produto Mock 2',
      codigoProduto: 'MOCK002',
      custoMedio: 25.75,
      ativo: true,
      unidade: 'KG',
      qtdeTotal: 50,
      dataCadastro: new Date(),
      ultAlteracao: new Date(),
    } as Produto,
  ];

  // Mock data for entities
  private mockEntidades: Entidade[] = [
    {
      idEntidade: 1,
      idFilial: 1,
      nomeEntidade: 'Cliente Mock 1',
      cnpjCpf: '12345678901',
      email: 'cliente1@mock.com',
      ativo: true,
      limite: 1000.00,
      dtaCadastro: new Date(),
      ultAlteracao: new Date(),
    } as Entidade,
    {
      idEntidade: 2,
      idFilial: 1,
      nomeEntidade: 'Cliente Mock 2',
      cnpjCpf: '98765432100',
      email: 'cliente2@mock.com',
      ativo: true,
      limite: 2000.00,
      dtaCadastro: new Date(),
      ultAlteracao: new Date(),
    } as Entidade,
  ];

  // ========== PRODUTOS ==========

  async findAllProdutos(filters: any = {}, pagination: any = {}) {
    const { page = 1, limit = 50 } = pagination;
    const { ativo = true, search } = filters;

    let filteredProdutos = this.mockProdutos.filter(p => p.ativo === ativo);

    if (search) {
      filteredProdutos = filteredProdutos.filter(p => 
        p.nomeProduto.toLowerCase().includes(search.toLowerCase()) ||
        p.codigoProduto?.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = filteredProdutos.length;
    const startIndex = (page - 1) * limit;
    const data = filteredProdutos.slice(startIndex, startIndex + limit);

    this.logger.log(`Mock: Found ${data.length} produtos (total: ${total})`);

    return { data, total, page, limit };
  }

  async findProdutoById(idProdutos: number, idFilial: number): Promise<Produto | null> {
    const produto = this.mockProdutos.find(p => p.idProdutos === idProdutos && p.idFilial === idFilial);
    if (produto) {
      this.logger.log(`Mock: Found produto: ${produto.nomeProduto}`);
    }
    return produto || null;
  }

  async findProdutosByCodigo(codigo: string, idFilial?: number): Promise<Produto[]> {
    const produtos = this.mockProdutos.filter(p => 
      p.codigoProduto === codigo && (!idFilial || p.idFilial === idFilial)
    );
    this.logger.log(`Mock: Found ${produtos.length} produtos with code: ${codigo}`);
    return produtos;
  }

  async findProdutosByEntidade(idEntidade: number, idFilial: number): Promise<Produto[]> {
    const produtos = this.mockProdutos.filter(p => 
      p.idEntidade === idEntidade && p.idFilial === idFilial
    );
    this.logger.log(`Mock: Found ${produtos.length} produtos for entidade ${idEntidade}`);
    return produtos;
  }

  // ========== ENTIDADES ==========

  async findAllEntidades(filters: any = {}, pagination: any = {}) {
    const { page = 1, limit = 50 } = pagination;
    const { ativo = true, search } = filters;

    let filteredEntidades = this.mockEntidades.filter(e => e.ativo === ativo);

    if (search) {
      filteredEntidades = filteredEntidades.filter(e => 
        e.nomeEntidade?.toLowerCase().includes(search.toLowerCase()) ||
        e.cnpjCpf?.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = filteredEntidades.length;
    const startIndex = (page - 1) * limit;
    const data = filteredEntidades.slice(startIndex, startIndex + limit);

    this.logger.log(`Mock: Found ${data.length} entidades (total: ${total})`);

    return { data, total, page, limit };
  }

  async findEntidadeById(idEntidade: number, idFilial: number): Promise<Entidade | null> {
    const entidade = this.mockEntidades.find(e => e.idEntidade === idEntidade && e.idFilial === idFilial);
    if (entidade) {
      this.logger.log(`Mock: Found entidade: ${entidade.nomeEntidade}`);
    }
    return entidade || null;
  }

  async findEntidadesByCnpjCpf(cnpjCpf: string, idFilial?: number): Promise<Entidade[]> {
    const entidades = this.mockEntidades.filter(e => 
      e.cnpjCpf === cnpjCpf && (!idFilial || e.idFilial === idFilial)
    );
    this.logger.log(`Mock: Found ${entidades.length} entidades with CNPJ/CPF: ${cnpjCpf}`);
    return entidades;
  }

  async findEntidadesByCategoria(categoria: string, idFilial?: number): Promise<Entidade[]> {
    const entidades = this.mockEntidades.filter(e => 
      e.categoria === categoria && (!idFilial || e.idFilial === idFilial)
    );
    this.logger.log(`Mock: Found ${entidades.length} entidades with categoria: ${categoria}`);
    return entidades;
  }

  // ========== MÉTODOS UTILITÁRIOS ==========

  async getEstoque(idProdutos: number, idFilial: number): Promise<number> {
    const produto = await this.findProdutoById(idProdutos, idFilial);
    return produto?.qtdeTotal || 0;
  }

  async getLimiteCredito(idEntidade: number, idFilial: number): Promise<number> {
    const entidade = await this.findEntidadeById(idEntidade, idFilial);
    return entidade?.limite || 0;
  }

  async getHealthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      counts: {
        produtos: this.mockProdutos.length,
        entidades: this.mockEntidades.length,
      },
    };
  }
}

