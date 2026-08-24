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

O workflow também executa essas verificações automaticamente em pull requests antes do deploy.

## Configuração do negócio

Dados de contato, localização e mensagens ficam centralizados em `src/config.ts`.

O projeto usa `base: '/Ely-Concept/'` no Vite para evitar tela branca e caminhos quebrados no GitHub Pages.
