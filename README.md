# Instituto Layla Cerqueira

Site comercial do **Instituto Layla Cerqueira**, em Feira de Santana, BA.

## Stack

- React + TypeScript
- Vite
- CSS responsivo e animação Beauty Reveal
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

O workflow valida o código e publica o conteúdo de `dist` no GitHub Pages. A publicação também executa um smoke test da página e da imagem principal.

## Publicação

O Vite usa `base: '/Instituto-Layla/'`, correspondente ao endereço:

`https://2022victtorsilva-debug.github.io/Instituto-Layla/`
