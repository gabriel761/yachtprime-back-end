# Planejamento de Documentação do Projeto (Obsidian)

Este documento descreve a estrutura proposta para a documentação do projeto **Yacht Prime Back-end**, otimizada para ser visualizada e gerenciada no **Obsidian**.

## Estrutura de Pastas e Arquivos

A documentação será organizada em pastas numeradas para manter a ordem lógica de leitura e navegação.

```text
rest-api-docs/
├── 00-Index.md                   <-- Ponto de entrada (Map of Content)
├── 01-Introdução/
│   ├── 01-Visão-Geral.md         <-- O que é o projeto, objetivos
│   ├── 02-Arquitetura.md         <-- Camadas (Controller, Service, Repo), Tecnologias
│   └── 03-Stack-Tecnológico.md   <-- Node, Express, PG-Promise, Firebase, etc.
├── 02-Começando/
│   ├── 01-Instalação.md          <-- Clone, npm install
│   ├── 02-Configuração-Env.md    <-- Variáveis de ambiente (.env)
│   └── 03-Rodando-Localmente.md  <-- Scripts de start, dev, debug
├── 03-Banco-de-Dados/
│   ├── 01-Schema-Overview.md     <-- Visão geral do DB
│   ├── 02-Migrações-SQL.md       <-- Como funcionam os arquivos na pasta /sql
│   └── 03-Modelos.md             <-- Detalhes das principais tabelas/types
├── 04-API-Reference/
│   ├── 00-Overview-API.md        <-- Padrões, Auth (Bearer Token), Paginação
│   ├── 01-Charter-Module.md      <-- Endpoints de Barco Charter
│   ├── 02-Seminovo-Module.md     <-- Endpoints de Barco Seminovo
│   ├── 03-Users-Module.md        <-- Endpoints de Usuários
│   └── 04-Resources-Module.md    <-- Uploads, Imagens, etc.
├── 05-Guias-Desenvolvimento/
│   ├── 01-Criando-Nova-Rota.md   <-- Tutorial passo-a-passo
│   ├── 02-Testes.md              <-- Como rodar e escrever testes (Vitest)
│   └── 03-Padroes-Codigo.md      <-- Style guide, tratamento de erros, validação
└── 06-Deploy/
    ├── 01-Railway-Deploy.md      <-- Como deployar no Railway
    └── 02-Monitoramento.md       <-- Logs, verificação de saúde
```

---

## Detalhamento do Conteúdo por Arquivo

### 00-Index.md
- **Conteúdo**: Índice MOC (Map of Content) com links para todas as seções principais.
- **Obsidian**: Usar Dataview (opcional) ou links diretos `[[Link]]`.

### 01-Introdução
- **01-Visão-Geral.md**: Descrição do negócio (aluguel e venda de barcos).
- **02-Arquitetura.md**: Diagrama Mermaid explicando o fluxo `Route -> Controller -> Service -> Repository -> DB`.
- **03-Stack-Tecnológico.md**: Lista de deps (Express, pg-promise, Firebase Admin, Vitest) e por que são usadas.

### 02-Começando
- **01-Instalação.md**: Pré-requisitos (Node v18+, PostgreSQL). Comandos git e npm.
- **02-Configuração-Env.md**: Exemplo de `.env`, explicando cada chave (`DATABASE_URL`, `FIREBASE_CREDENTIALS`).
- **03-Rodando-Localmente.md**: Explicação dos scripts `npm run dev`, `npm run build`, `npm start`.

### 03-Banco-de-Dados
- **01-Schema-Overview.md**: Diagrama ER (Mermaid) simplificado.
- **02-Migrações-SQL.md**: Explicação da pasta `sql/` e como o `pg-promise` carrega as queries.
- **03-Modelos.md**: Documentar os tipos principais em `types/` e `models/`.

### 04-API-Reference
- Para cada módulo (Charter, Seminovo, User):
    - **Rotas**: `GET /api/charter`, `POST /api/charter`.
    - **Parâmetros**: Body, Query params.
    - **Respostas**: JSON de sucesso e erro.
    - **Exemplos**: Curl ou JSON de exemplo.

### 05-Guias-Desenvolvimento
- **01-Criando-Nova-Rota.md**: Guia "Receita de Bolo": 1. Criar rota, 2. Criar Controller, 3. Service, 4. Repository.
- **02-Testes.md**: Como rodar `npm run test-charter`. Explicação básica de TDD com Vitest.
- **03-Padroes-Codigo.md**: Como usar o `AppError` / `CustomError`, validações com `validationUtil`.

---

## Sugestões de Melhorias na Documentação

Além dos arquivos Markdown manuais, sugiro as seguintes automações para manter a documentação viva:

1.  **Diagramas Dinâmicos (Mermaid)**:
    -   Usar blocos de código `mermaird` dentro dos arquivos .md para desenhar fluxos e diagramas de classe. O Obsidian renderiza isso nativamente.

2.  **OpenAPI / Swagger (Futuro)**:
    -   Atualmente a documentação de API manual tende a ficar desatualizada. Sugiro futuramente adicionar anotações no código (ex: `tsoa` ou `swagger-jsdoc`) para gerar um `swagger.json` automático.
    -   *No plano atual, faremos manual, mas fica a recomendação.*

3.  **Links Relativos do Obsidian**:
    -   Usar links do tipo `[[BarcoCharterController]]` que podem apontar para definições se você usar plugins de "Code block" no Obsidian, ou apenas links entre os arquivos de documentação.

4.  **Snippets de Código**:
    -   Incluir trechos reais do código nos docs para exemplificar (ex: como instanciar o `BarcoCharterService`).

---

## Próximos Passos

Se você aprovar este plano, eu irei:
1.  Criar a estrutura de pastas proposta em `docs/` (ou outra pasta de sua preferência).
2.  Criar os arquivos .md com o conteúdo inicial baseando-me no código atual.
3.  Preencher os detalhes técnicos lendo os arquivos do projeto.
