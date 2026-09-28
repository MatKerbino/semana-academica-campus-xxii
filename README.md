# Site da 1ª Semana Acadêmica do Campus XXII — UEPA

Site institucional estático (RF-01) construído com **Astro + Tailwind CSS 4 + Lucide**.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ (HTML estático)
npm run preview
```

## Publicação (GitHub Pages)

Site no ar: **https://matkerbino.github.io/semana-academica-campus-xxii/**

```bash
npm run deploy        # build + publica na branch gh-pages
```

O site é servido em subdiretório, por isso o `astro.config.mjs` define `base: '/semana-academica-campus-xxii'`
e todo link interno passa por `url()` (`src/lib/url.ts`). Ao criar link novo, use `href={url("/pagina")}`;
links `http` e `mailto` passam sem alteração.

### Publicação automática a cada push (opcional)

Exige o escopo `workflow` no token (`gh auth refresh -s workflow`). Depois, criar
`.github/workflows/deploy.yml` com o conteúdo abaixo e mudar a fonte do Pages para "GitHub Actions":

```yaml
name: Publicar no GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Publicação anterior na AWS (mantida, sem uso)

A conta 615299760403 tem o bucket privado `semana-academica-uepa-2026`, a distribuição CloudFront
`EE73VTEXD9WT0` (https://d1m0o9ebg8qoay.cloudfront.net) e a CloudFront Function
`semana-academica-uepa-2026-index-rewrite`. Para voltar a usar: `npm run deploy:aws`.

Infraestrutura na conta 615299760403 (`us-east-1`):

- **S3 `semana-academica-uepa-2026`** — bucket privado (Block Public Access ligado), lido apenas pelo CloudFront via OAC `E3FKKV9TW1VT2N`.
- **CloudFront `EE73VTEXD9WT0`** — distribuição já existente; o deploy não a recria.
- **CloudFront Function `semana-academica-uepa-2026-index-rewrite`** (viewer-request) — aponta `/minicursos` e `/minicursos/` para `/minicursos/index.html`. Sem ela, o CloudFront com origem S3 REST não resolve o índice de cada diretório.
- **Páginas de erro** — 403 e 404 servem `/404.html` com status 404. Antes estavam configuradas como SPA (`/index.html` com status 200), o que fazia qualquer URL inválida devolver a página inicial.
- **Cache** — HTML com `max-age=0,must-revalidate`; arquivos de `_astro/` (com hash no nome) com `max-age=31536000,immutable`.

## Tela única (requisito do cliente)

Cabeçalho e rodapé são fixos e a rolagem acontece só dentro do conteúdo. Para o conteúdo caber sem rolagem:

- Cada página divide o conteúdo em **abas** (`src/components/Abas.astro`) — inclusive a página de atividade (Descrição / Tópicos / Responsável).
- Cartões e faixas de título usam espaçamento comprimido em relação ao Figma (o protótipo é uma página longa; aqui a altura é fixa).
- Medição: as 31 rotas foram verificadas em 1440×900 com Chrome headless, comparando `main.scrollHeight` com `main.clientHeight`. Todas fecham com sobra 0px.
- Ao adicionar conteúdo novo, repetir essa medição: itens a mais numa listagem podem estourar a altura e voltar a rolar.

## Decisões de interface (feedback do cliente)

- Cabeçalho e rodapé fixos; a rolagem ocorre **apenas dentro da área de conteúdo** (`src/layouts/Base.astro`).
- Conteúdo dividido em **abas** (`src/components/Abas.astro`) na Página Inicial, no Cronograma e em Artigos, para caber em uma tela.
- Botão "Realizar Inscrição" (verde #33d40c) fixo no cabeçalho em todas as páginas.
- A página de Atividades mostra "Voltar para o Cronograma" quando aberta a partir dele (`?de=cronograma`).
- Todo o conteúdo vem de um único arquivo: `src/data/evento.ts`.

## Rastreabilidade

| Página | Arquivo | Requisitos / Casos de uso |
|---|---|---|
| Página Inicial | `src/pages/index.astro` | RF-01, RF-02, RF-09, RF-10, RF-11 · US-01, US-11 |
| Cronograma | `src/pages/cronograma.astro` | RF-03 · US-02 |
| Atividades (página única, filtro por tipo e `?atividade=slug`) | `src/pages/atividades.astro` | RN-04, RN-05, RN-06 · US-03 |
| Inscrição (assistente em 3 etapas) | `src/pages/inscricao.astro` | US-11 a US-16 |
| Minha inscrição (consulta, edição, cancelamento, devolução) | `src/pages/minha-inscricao.astro` | US-17 a US-21 |
| Cadastro / Entrar / Recuperar senha | `src/pages/cadastro.astro`, `entrar.astro`, `recuperar-senha.astro` | US-08 a US-10 |
| Política de Privacidade | `src/pages/politica-de-privacidade.astro` | US-13 |
| Painel administrativo | `src/pages/admin.astro` | US-22 a US-27 |
| Artigos e Materiais | `src/pages/artigos.astro` | RF-07, RF-12 · US-07 |
| Palestrantes | `src/pages/palestrantes.astro` | RF-05, RF-13 · US-08 |
| Patrocinadores | `src/pages/patrocinadores.astro` | RF-08 · US-10 |
| Local | `src/pages/local.astro` | RF-04 · US-09 |

## Pontos a confirmar com a organização

- **Coordenadas do mapa** (`src/data/evento.ts` → `local.mapaEmbed`): o mapa incorporado é do OpenStreetMap (não exige chave) e está centrado no trecho da BR-316 no Coqueiro; o ponto exato do campus precisa ser confirmado. O botão "Abrir no Google Maps" atende ao RF-04 e usa busca por texto.
- **Links de templates** (`materiais`): URLs do Google Docs são provisórias.
- **E-mails e Currículo Lattes dos palestrantes**: os links de Lattes apontam para lattes.cnpq.br sem o ID de cada pesquisador.

## API e inscrições

O site continua estático, mas as telas de conta, inscrição e admin consomem a API (repo `semana-academica-api`, contrato em `docs/API.md`).
A URL vem de `PUBLIC_API_URL` (ver `.env.example`; `.env.development` aponta para `http://localhost:3000`, e `.env.production`
deve conter a Function URL da Lambda). A sessão (token) fica em `localStorage` (`src/lib/api.ts`); a proteção de rotas no cliente é
só conveniência — a autorização real é feita pela API.

As páginas antigas `/minicursos`, `/palestras`, `/cursos`, `/banners` e `/atividades/<slug>` foram unificadas em `/atividades` (RN-04).
Se o CloudFront tiver regras específicas para essas rotas (ver seção acima), elas podem ser removidas.
