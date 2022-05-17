# NestJS @nrwl/nx starter kit

### Folder Architecture

This repo contains a starting template implementation of a nestjs app called `api`.

Basically in all `nx` repos apps should only be an empty shell that import all code from a
library. The full folder structure can be seen below.

This project aims to build a base general nx starter scaffolding for apps that use NestJS
as API and maybe expand to some more apps in the future.

The most important module is the core module, as it bundles all important code into one
"entry-point" module which is then imported by the `api` app. This repo works with eslint
module boundaries which make sure, that the app can only import code from the core module
library. Every piece of code that should be exposed to the app must be re-exported through
the core module.

```
nestjs-starter
├── apps
│   ├── api-app-name
│   └── frontend-app-name
└── libs
    ├── api
    │   ├── types                     (lib)
    │   ├── app                       (lib)
    │   │   ├── middlewares           (dir)
    │   │   ├── filters               (dir)
    │   │   └── decorators            (dir)
    │   └── modules
    │       ├── feature-1             (lib)
    │       ├── feature-2             (lib)
    │       └── feature-3             (lib)
    ├── frontend
    │   ├── util                      (lib)
    │   ├── types                     (lib)
    │   └── components                (lib)
    ├── frontend-shared
    │   ├── util                      (lib)
    │   ├── types                     (lib)
    │   └── components                (lib)
    └── shared
        ├── util                      (lib)
        └── types                     (lib)
```

### Conventions

This is a WIP section - some conventions will probably be added on the go

- [Exports]: We create `index.ts` files in every folder to make sure we have barrel
  exports for every folder
- [Module Boundaries]: When you want to control the exports you can either do that on the
  folder level or just make sure you only export certain functions that should be exposed
- [Exceptions]: When you're throwing an error - make sure you throw one of the translated
  errors in the exceptions' folder in the app lib.
- [Import structure]: The imports are always structured in a certain way: First external,
  then internal, then local and finally type imports. Make sure to always use
  `import type` to avoid making the bundle bigger than it has to be.
- [Types]: Types always go to a type library. Either it's a shared type that can be put
  into `./libs/shared/types` or it's a backend specific type that can (or even should)
  live in `./libs/api/types`.

## Starting instructions

### Prerequisites

- You'll need `docker` and `docker-compose` (or `docker compose`).
- The node version is pinned to the current lts version of `node` which is 16 as the time
  of writing. (I recommend using [n](https://github.com/tj/n) for node version management)
- This repo uses `npm` as package manager, which has to be major version 8
- Some basic understanding of [nx](https://nx.dev/) would be good to being able to better
  grasp the whole concept

### Getting started

- first you need to install the `nx` cli globally to make your life easier with
  `npm install -g nx`
- then just install your dependencies via `npm i` in the root of the repo
- to get started you can simply copy the `example.env` file to a fresh `.env` file located
  in the `./apps/api` folder
- make sure to execute `docker-compose up -d` in the `./apps/api` folder to spin up your
  database, if you have set up your `.env` correctly compose should pick up your settings

If you have done all those steps you can start your application by executing `nx serve` or
`nx serve api` which will start an auto hot reloading development server. You can also use
the npm scripts via executing `npm start` or `npm run start:api`. If no project is
specified nx will default to the api project.

All the most important commands are located in the "scripts" section in `package.json`.

## Troubleshooting

If you're using a GIT-UI program, make sure your node/npm is in your `PATH` before this
program is opened. This repo uses git hooks that are executed on `pre-commit` and
`pre-push`. You could also use `--no-verify` but then you'll not be able to merge your
code into the repo as the cli will prevent you from merging non-linted code that maybe has
type errors.
