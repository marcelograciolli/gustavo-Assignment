# Félix mais+ — Site de Supermercado

Site com 3 páginas: Home, Lista de Produtos e Página de Detalhe do Produto (PDP). Anatomia da home: hero slideshow, atalhos de categoria, carrossel de ofertas, grade de 4 banners e carrosséis por categoria.

## Sobre

Projeto escolar em Next.js (App Router + TypeScript) + Tailwind CSS. Marca verde/laranja em [`src/app/globals.css`](src/app/globals.css). Mock de **80 produtos** (8 categorias × 10) em [`data/products.json`](data/products.json) — imagens remotas HTTPS (CDN Pão de Açúcar + fallbacks), prontas para deploy na Vercel.

## Estrutura

```
data/products.json               # mock (precoOriginal = oferta; imagem = URL remota)
src/app/page.tsx                  # Home
src/app/produtos/page.tsx         # Lista (?categoria= / ?busca=)
src/app/produtos/[slug]/          # PDP
src/components/HeroSlideshow.tsx  # 3 slides placeholder (cores)
src/components/BannerGrid.tsx     # 4 banners 16:9 placeholder
src/components/                   # Header, Footer, ProductCard, carrosséis, etc.
src/lib/products.ts               # helpers
```

## Marca

- Nome: **Félix mais+ Supermercado**
- Cores: `brand-*` / `accent-*` (tokens em `globals.css`)
- Logo: [`public/logo.png`](public/logo.png)

## Como rodar

```bash
npm install
npm run dev
```

Dev local deste protótipo: [http://localhost:61230](http://localhost:61230) (porta do Claude Code; `:3000` pode estar ocupada por outro projeto).

## Build de produção

```bash
npm run build
npm start
```

## Próximos passos

- Trocar placeholders do hero (3 slides) e da grade de 4 banners pelas artes finais.
- Carrinho / conta ainda só visuais.
- API/backend real, se necessário.

## Status

🚧 Em desenvolvimento (protótipo escolar)
