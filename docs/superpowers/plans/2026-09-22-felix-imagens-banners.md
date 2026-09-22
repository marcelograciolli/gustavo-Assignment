# Félix mais+ — Imagens PdA + Banners Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Popular os 80 produtos do Félix com imagens remotas alinhadas ao catálogo do Pão de Açúcar (ofertas do dia), adicionar hero slideshow (3 slides placeholder) e section de 4 banners 16:9 na home, e inventar dados do footer — sem tocar no logo nem no carrinho/conta.

**Architecture:** Mock JSON (`data/products.json`) passa a apontar `imagem` para URLs HTTPS remotas (CDN PdA ou equivalente estável). UI: novo `HeroSlideshow` substitui o hero atual; novo `BannerGrid` (4 colunas, aspect 16:9) entra após o carrossel “Ofertas da semana”. Footer recebe endereço/telefone/e-mail fictícios de trabalho de escola.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript, mock local em JSON.

**Spec:** Confirmações Marcelo (2026-09-22): (1) imagens remotas OK p/ Vercel; (2) 80 produtos, tudo novo; (3) footer inventado; (4) hero = slides com fundo de cor (placeholder); (5) banners 4 colunas 16:9; (6) execução líder + subagentes; logo e carrinho/conta **não alterar**.

## Global Constraints

- Workspace: `/Users/graciollismacstudio/_Drive/Dropbox/Local_Network/work_workgroup/Gustavo-work`
- Site Félix em **http://localhost:61230/** (não usar :3000 — é Vibra NEXT)
- **NÃO** alterar tamanho do logo no `Header.tsx`
- **NÃO** implementar carrinho/conta reais
- Copy e inventados em **pt-BR**
- `next.config` deve permitir domínios de imagem remota se usar `next/image`; ProductCard hoje usa `<img>` — manter ou ajustar `remotePatterns` se migrar
- Fonte de referência: https://www.paodeacucar.com/especial/ofertasdodia-pao2023 — mapear produto Félix ↔ imagem/categoria mais próxima do PdA
- Protótipo escolar: URLs remotas aceitáveis; se CDN bloquear hotlink, baixar para `public/products/` e documentar no README

## File map

| Arquivo | Responsabilidade |
|---------|------------------|
| `data/products.json` | 80 SKUs; campo `imagem` = URL remota |
| `next.config.ts` | `images.remotePatterns` se necessário |
| `src/components/HeroSlideshow.tsx` | 3 slides coloridos + dots/autoplay |
| `src/components/BannerGrid.tsx` | 4 banners placeholder 16:9 |
| `src/app/page.tsx` | Montar hero + carrosséis + BannerGrid |
| `src/components/Footer.tsx` | Dados fictícios Félix |
| `README.md` | Atualizar status (80 produtos, banners, imagens remotas) |

## Orquestração (líder + subagentes)

```
┌─────────────┐
│ Líder       │──▶ plano, merge, verify :61230
└──────┬──────┘
       │
   ┌───┴───────────────────────────────┐
   │                                   │
┌──▼──────────┐  ┌──────────────┐  ┌───▼────────┐
│ A Catálogo  │  │ B UI banners │  │ C Footer   │
│ products.json│  │ Hero+Grid   │  │ inventado  │
└─────────────┘  └──────────────┘  └────────────┘
```

- **A** e **B+C** em paralelo (arquivos distintos).
- Líder só merge/verify após os três.

---

### Task 1: Catálogo — imagens remotas (Subagente A)

**Files:** `data/products.json`, opcional `next.config.ts`, opcional script em `/tmp`

- [ ] Abrir a página de ofertas PdA e/ou endpoints públicos de mídia; coletar URLs de imagens de produto por categoria próxima às do Félix: Hortifruti, Padaria, Mercearia, Bebidas, Limpeza, Açougue, Peixaria, Pet Care
- [ ] Para cada um dos 80 itens em `products.json`, escolher a imagem **mais próxima** do nome/categoria; atualizar `imagem` para URL `https://…` (sem SVG placeholder local)
- [ ] Garantir `preco`/`precoOriginal`/`slug`/`nome` coerentes (pode manter nomes Félix; só troca imagem — ou alinhar leve se a imagem for de produto claramente diferente)
- [ ] Se hotlink falhar (403), baixar JPG/WebP para `public/products/<slug>.jpg` e apontar path local
- [ ] Smoke: amostra de 5 URLs retorna HTTP 200

### Task 2: Hero slideshow + BannerGrid (Subagente B)

**Files:** `src/components/HeroSlideshow.tsx` (novo), `src/components/BannerGrid.tsx` (novo), `src/app/page.tsx`

- [ ] `HeroSlideshow`: 3 slides; fundo sólido/gradiente brand (verde/laranja/amarelo); texto curto tipo “Banner 1 — placeholder”; setas + dots; autoplay ~5s; pausa no hover
- [ ] Substituir a `<section>` hero atual em `page.tsx` por `<HeroSlideshow />`
- [ ] `BannerGrid`: grid 1→2→4 colunas; cada item `aspect-video` (16:9); fundo colorido + label “Banner A/B/C/D — placeholder”
- [ ] Inserir `<BannerGrid />` **imediatamente após** o primeiro `ProductCarousel` (“Ofertas da semana”), **antes** dos carrosséis por categoria
- [ ] **Não** mexer em Header/logo/carrinho

### Task 3: Footer inventado (Subagente C)

**Files:** `src/components/Footer.tsx`

- [ ] Inventar dados escolares coerentes (ex.: Rua das Laranjeiras 450, Jardim Félix, Campinas/SP; tel `(19) 3456-7890`; e-mail `contato@felixmais.escola.br`)
- [ ] Manter estrutura de colunas; links institucionais podem permanecer texto simples

### Task 4: Verify (Líder)

- [ ] `curl`/screenshots em `http://localhost:61230/`, `/produtos`, uma PDP
- [ ] Confirmar: imagens ≠ cereal-em-banana; hero 3 slides; 4 banners 16:9 após ofertas; footer inventado; logo intacto; carrinho ainda visual
- [ ] Atualizar README (80 produtos, imagens remotas, banners)
- [ ] Aprender no BRAIN/DEV

## Done when

1. Nenhum produto com SVG placeholder ou imagem claramente errada na amostra visual
2. Home: slideshow 3 + ofertas + 4 banners + carrosséis categoria
3. Footer com dados inventados
4. Logo e carrinho/conta inalterados na intenção do pedido
