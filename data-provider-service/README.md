# Data Provider Service

Microservice NestJS com padrão **LegacyAdapterService (read-only)** + endpoints incrementais para provedor de dados usando **GraphQL Federation**.

## 🏗️ Arquitetura

- **Padrão**: LegacyAdapterService (somente leitura)
- **API**: GraphQL Federation v2
- **Database**: SQL Server (Legacy ATXDADOS)
- **ORM**: TypeORM
- **Framework**: NestJS

## 📊 Entidades

### Produtos
- **135+ campos** incluindo dados fiscais, tributários, estoque e comerciais
- **Relacionamentos**: Entidades, Grupos, Marcas, CFOP
- **Campos principais**: ID_PRODUTOS, CODIGOPRODUTO, NOMEPRODUTO, CUSTOMEDIO

### Entidades (Clientes/Fornecedores)
- **180+ campos** com dados cadastrais, financeiros e comerciais  
- **Relacionamentos**: Cidades, Empresas, Formas de Pagamento
- **Campos principais**: ID_ENTIDADE, CNPJCPF, NOMEENTIDADE, LIMITE

## 🚀 Endpoints GraphQL

### Produtos
```graphql
# Listar produtos com paginação e filtros
query {
  produtos(page: 1, limit: 50, ativo: true, search: "termo") {
    data {
      idProdutos
      nomeProduto
      codigoProduto
      custoMedio
      ativo
      entidade {
        nomeEntidade
      }
    }
    total
    page
    limit
  }
}

# Buscar produto por ID
query {
  produto(idProdutos: 1, idFilial: 1) {
    nomeProduto
    codigoProduto
    custoMedio
  }
}

# Buscar produtos por código
query {
  produtosByCodigo(codigo: "ABC123") {
    nomeProduto
    custoMedio
  }
}

# Obter estoque
query {
  estoque(idProdutos: 1, idFilial: 1)
}
```

### Entidades
```graphql
# Listar entidades com paginação e filtros
query {
  entidades(page: 1, limit: 50, ativo: true, search: "termo") {
    data {
      idEntidade
      nomeEntidade
      cnpjCpf
      limite
      produtos {
        nomeProduto
      }
    }
    total
  }
}

# Buscar entidade por ID
query {
  entidade(idEntidade: 1, idFilial: 1) {
    nomeEntidade
    cnpjCpf
    limite
  }
}

# Buscar por CNPJ/CPF
query {
  entidadesByCnpjCpf(cnpjCpf: "12345678901") {
    nomeEntidade
    limite
  }
}

# Obter limite de crédito
query {
  limiteCredito(idEntidade: 1, idFilial: 1)
}
```

### Health Check
```graphql
query {
  health {
    status
    timestamp
    counts
  }
}
```

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 20+
- SQL Server (ou Docker)
- NPM/Yarn

### Instalação
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Executar em desenvolvimento
npm run start:dev
```

### Docker
```bash
# Executar com Docker Compose (inclui SQL Server)
docker-compose up -d

# Apenas o serviço
docker build -t data-provider-service .
docker run -p 3000:3000 data-provider-service
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourPassword123
DB_DATABASE=ATXDADOS

# Application
PORT=3000
NODE_ENV=development

# GraphQL
GRAPHQL_PLAYGROUND=true
GRAPHQL_DEBUG=true

# Logging
LOG_LEVEL=debug
```

### Banco de Dados
1. Execute os scripts SQL em `scripts/`:
   - `entidades.sql` - Cria tabela ENTIDADES
   - `produtos.sql` - Cria tabela PRODUTOS

2. Configure a conexão no `.env`

## 📈 Monitoramento

- **GraphQL Playground**: http://localhost:3000/graphql
- **Health Check**: Query `health` no GraphQL
- **Logs**: Console com níveis configuráveis

## 🔒 Segurança

- **Read-Only**: Apenas operações de leitura
- **CORS**: Habilitado para todos os origins
- **Validation**: Pipes globais de validação
- **Error Handling**: Tratamento centralizado de erros

## 🚀 Deploy

### Produção
1. Configure variáveis de ambiente de produção
2. Execute `npm run build`
3. Use Docker ou deploy direto com `npm run start:prod`

### GraphQL Federation
Este serviço é compatível com Apollo Federation v2 e pode ser integrado a um Gateway.

## 📝 Scripts Disponíveis

```bash
npm run start          # Produção
npm run start:dev       # Desenvolvimento com watch
npm run start:debug     # Debug mode
npm run build           # Build para produção
npm run test            # Testes unitários
npm run test:e2e        # Testes end-to-end
```

## 🤝 Contribuição

1. Mantenha o padrão read-only
2. Adicione testes para novos endpoints
3. Documente mudanças no schema GraphQL
4. Siga as convenções de código TypeScript

## 📄 Licença

Proprietary - Uso interno apenas.

