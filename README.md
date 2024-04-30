# dgp-fe

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

Locally you can use bun / npm to run the application.

Due to missing cert functionality in the bun image, the docker build can only with npm.

## Project Setup

```sh
npm / bun install
```

### Compile and Hot-Reload for Development

```sh
npm / bun dev
```

## Running in Docker with Hot-Reload for Development

```sh
docker compose up
```

### Compile and Minify for Production

```sh
npm / bun build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm / bun test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm / bun lint
```
