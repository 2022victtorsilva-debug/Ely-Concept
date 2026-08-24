# Ely Concept

Site comercial premium da **Ely Concept**, salão de beleza em Feira de Santana - BA.

## Stack

- React + TypeScript
- Vite
- CSS editorial responsivo, sem framework visual pesado
- GitHub Pages via GitHub Actions

## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run typecheck
npm run lint
npm run build
```

O workflow executa essas verificações automaticamente em pull requests. Depois de um build aprovado, o `dist` é enviado como artifact oficial do GitHub Pages, publicado pelo `actions/deploy-pages` em um ambiente dedicado e validado por um smoke test HTTP da página e da imagem principal.

## Configuração do negócio

Dados de contato, localização e mensagens ficam centralizados em `src/config.ts`.

O projeto usa `base: '/Ely-Concept/'` no Vite para evitar tela branca e caminhos quebrados no GitHub Pages.
