# TODO - Microservice NestJS com LegacyAdapterService + Apollo Gateway

## Fase 1: Análise de arquitetura e recomendação de contratos
- [x] Analisar prós e contras GraphQL Federation vs REST
- [x] Recomendar melhor abordagem para provedor de dados (GraphQL Federation)
- [x] Definir estrutura de pastas para microservices

## Fase 2: Estruturação do projeto e configuração inicial
- [x] Criar estrutura de pastas para microservices
- [x] Configurar ambiente NestJS
- [x] Instalar dependências necessárias

## Fase 3: Implementação do microservice NestJS
- [x] Criar projeto NestJS base
- [x] Configurar estrutura de módulos
- [x] Implementar configurações básicas

## Fase 4: Configuração do LegacyAdapterService e endpoints
- [x] Implementar padrão LegacyAdapterService (read-only)
- [x] Criar endpoints incrementais
- [x] Configurar contratos de API

## Fase 5: Documentação e commit das alterações
- [x] Documentar arquitetura e uso
- [x] Fazer commit das alterações
- [x] Criar README específico do microservice

## NOVA FASE: Gateway de Federação

### Fase 1: Configuração do projeto do gateway
- [x] Criar projeto Node.js para o gateway
- [x] Instalar dependências do Apollo Gateway
- [x] Configurar estrutura básica

### Fase 2: Implementação do Apollo Gateway
- [x] Configurar Apollo Gateway
- [x] Definir subgraphs (data-provider-service)
- [x] Implementar composição de schemas
- [x] Configurar roteamento e resolução

### Fase 3: Documentação e commit do gateway
- [ ] Documentar configuração do gateway
- [ ] Criar docker-compose unificado
- [ ] Fazer commit das alterações

