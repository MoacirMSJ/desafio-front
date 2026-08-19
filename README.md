# CEP e Notícias

Projeto Next.js (App Router) + TypeScript organizado em arquitetura **MVVM**, com Axios para consumo de APIs externas e estilização em CSS puro (CSS Modules, sem frameworks CSS).

## Arquitetura

```
src/
├── app/                # Rotas (App Router) — apenas montam as Views
│   ├── page.tsx            → /
│   ├── news/page.tsx       → /news
│   └── search-cep/page.tsx → /search-cep
├── models/             # Model — tipos/entidades (Cep, News)
├── services/           # Model — instâncias axios e chamadas HTTP
├── viewmodels/         # ViewModel — hooks com estado e lógica (useSearchCepViewModel, useNewsViewModel)
├── views/              # View — telas completas (HomeView, SearchCepView, NewsView)
└── components/         # Componentes reutilizáveis (Button, CepForm, NewsCard, NewsList, PageContainer)
```

- **Model**: `models/` (tipos) + `services/` (axios + chamadas à API).
- **ViewModel**: `viewmodels/`, hooks React que orquestram estado, chamadas ao Model e expõem dados prontos para a View.
- **View**: `views/`, componentes de tela que consomem o ViewModel e compõem os componentes de `components/`.

## APIs externas

- **CEP**: [ViaCEP](https://viacep.com.br/) — não requer chave.
- **Notícias**: [NewsAPI.org](https://newsapi.org/) — requer chave gratuita.

Configure a chave da NewsAPI em `.env.local`:

```
NEXT_PUBLIC_NEWS_API_KEY=sua_chave_aqui
```

## Rodando o projeto

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.
