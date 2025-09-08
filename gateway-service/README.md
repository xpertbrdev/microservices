# Apollo Federation Gateway

Gateway de federação para a arquitetura de microservices, usando **Apollo Gateway** e **Apollo Federation v2**.

## 🏗️ Arquitetura

- **Gateway**: Apollo Gateway
- **Federação**: Apollo Federation v2
- **Servidor**: Apollo Server 5
- **Linguagem**: TypeScript

## 📡 Subgraphs

Este gateway é configurado para compor os schemas dos seguintes subgraphs:

- **data-provider-service**: Provedor de dados legado (Produtos e Entidades)
- *Outros serviços podem ser adicionados em `config/subgraphs.ts`*

## 🚀 Endpoints

- **GraphQL Playground**: http://localhost:4000/
- **Health Check**: Query `__typename` no GraphQL

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 20+
- Docker (para orquestração)
- NPM/Yarn

### Instalação
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as URLs dos subgraphs

# Executar em desenvolvimento
npm run start:dev
```

### Docker
```bash
# Executar com Docker Compose (inclui todos os serviços)
docker-compose up -d

# Apenas o gateway
docker build -t gateway-service .
docker run -p 4000:4000 gateway-service
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
# Gateway
PORT=4000
NODE_ENV=development

# Subgraphs
DATA_PROVIDER_URL=http://localhost:3000/graphql

# Configurações
POLL_INTERVAL_MS=30000
INTROSPECTION_ENABLED=true

# Logging
LOG_LEVEL=debug
```

### Adicionar Novos Subgraphs
1. Adicione a URL do novo subgraph no `.env`
2. Adicione a configuração em `config/subgraphs.ts`
3. O gateway irá compor o novo schema automaticamente

## 📈 Monitoramento

- **GraphQL Playground**: http://localhost:4000/
- **Health Check**: Query `__typename` no GraphQL
- **Logs**: Console com níveis configuráveis

## 🔒 Segurança

- **Context Propagation**: Propaga headers de autenticação e trace IDs
- **Error Handling**: Tratamento centralizado de erros
- **Introspection**: Desabilitado em produção

## 🚀 Deploy

### Produção
1. Configure variáveis de ambiente de produção
2. Execute `npm run build`
3. Use Docker ou deploy direto com `npm run start:prod`

## 📝 Scripts Disponíveis

```bash
npm run start          # Produção
npm run start:dev       # Desenvolvimento com watch
npm run build           # Build para produção
```

## 🤝 Contribuição

1. Mantenha o gateway agnóstico de lógica de negócio
2. Adicione testes para novas funcionalidades
3. Documente mudanças na configuração

## 📄 Licença

Proprietary - Uso interno apenas.

