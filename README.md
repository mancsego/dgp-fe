# dgp-fe

## Getting started

Locally you can use bun / npm to run the application.

Due to missing cert functionality in the bun image, the docker build can only work with npm.

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
