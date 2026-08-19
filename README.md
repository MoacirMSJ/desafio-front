# CEP e Notícias

Projeto Next.js (App Router) + TypeScript organizado em arquitetura **MVVM**, com Axios para consumo de APIs externas e estilização em CSS puro (CSS Modules, sem frameworks CSS).

## Descrição

Aplicação front-end com duas funcionalidades principais:

- **Busca de CEP**: consulta de endereço a partir de um CEP, usando a API pública [ViaCEP](https://viacep.com.br/).
- **Notícias**: busca, listagem e paginação de notícias, consumidas a partir de uma API própria (ver [Requisitos](#requisitos-para-executar)).

## Estrutura de pastas

```
src/
├── app/                     # Rotas (App Router) — apenas montam as Views
│   ├── page.tsx                → /
│   ├── noticias/page.tsx       → /noticias
│   └── buscar-cep/page.tsx     → /buscar-cep
├── models/                  # Model — tipos/entidades (Cep, Noticia)
├── services/                # Model — instâncias axios e chamadas HTTP
├── viewmodels/              # ViewModel — hooks com estado e lógica
├── views/                   # View — telas completas
└── components/              # Componentes reutilizáveis (Botao, FormularioCep,
                              # CartaoNoticia, ListaNoticias, Paginacao, Modal, etc.)
tests/
├── bdd/                     # Cenários de comportamento (Gherkin)
└── e2e/                     # Testes end-to-end (Playwright)
```

- **Model**: `models/` (tipos) + `services/` (axios + chamadas à API).
- **ViewModel**: `viewmodels/`, hooks React que orquestram estado, chamadas ao Model e expõem dados prontos para a View.
- **View**: `views/`, componentes de tela que consomem o ViewModel e compõem os componentes de `components/`.

## Features

- Consulta de endereço por CEP, com tratamento de CEP não encontrado.
- Busca de notícias por termo, com listagem paginada.
- Cadastro/edição de notícias com confirmação via modal de diálogo.
- Proxy de API via `rewrites` do Next.js (`/api/noticias` → API de notícias).
- Testes end-to-end com Playwright e cenários BDD documentados.

## Requisitos para executar

- [Node.js](https://nodejs.org/) 24+
- npm
- A API de notícias rodando localmente ou acessível remotamente: **[desafio-api](https://github.com/MoacirMSJ/desafio-api)**

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente e ajuste conforme necessário:

   ```bash
   cp .env.local.example .env.local
   ```

   - `NEWS_API_ORIGIN`: origem da API de notícias ([desafio-api](https://github.com/MoacirMSJ/desafio-api)), usada pelo proxy em `next.config.ts`.

3. Suba a API de notícias (ver instruções no repositório [desafio-api](https://github.com/MoacirMSJ/desafio-api)).

4. Rode a aplicação em modo desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse `http://localhost:3000`.

### Com Docker

```bash
docker build -t front-teste-g4f .
docker run -p 3000:3000 --env-file .env.local front-teste-g4f
```

## Como rodar os testes

Os testes end-to-end usam [Playwright](https://playwright.dev/) e sobem a aplicação automaticamente (`npm run dev`), salvo quando `PLAYWRIGHT_BASE_URL` é informado.

```bash
npx playwright install --with-deps
npm run test:e2e
```

Os cenários de comportamento (BDD) que descrevem as funcionalidades cobertas pelos testes estão em [`tests/bdd`](tests/bdd).
