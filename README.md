# NestJS @nrwl/nx starter kit

Welcome to the nx nestjs starter-kit 👋 This template tries to shed light on our
nx-conventions and make it easier to get started.

### Features

The nest portion of this repo has a few features to get you started more easily:

- i18n translations
- i18n translated errors
- basic module structure
- prisma implementation
- a typesafe env config module
- some super fast pino http logging
- automatic request validation

### Non-Features

I've intentionally left out the authentication part, as there is a good tutorial on the
nestjs website. Our authentication needs oftentimes differ a lot, as we are sometimes
behind auth proxies and need to handle headers and other times we have to implement a
custom full-blown auth solution.

I just left in the `express-session` package as it might come in handy in more api
projects just to keep track of different requesters.

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

- **[Exports]**: We create `index.ts` files in every folder to make sure we have barrel
  exports for every folder
- **[Module Boundaries]**: When you want to control the exports you can either do that on
  the folder level or just make sure you only export certain functions that should be
  exposed
- **[Exceptions]**: When you're throwing an error - make sure you throw one of the
  translated errors in the exceptions' folder in the app lib.
- **[Import structure]**: The imports are always structured in a certain way: First
  external, then internal, then local and finally type imports. Make sure to always use
  `import type` to avoid making the bundle bigger than it has to be.
- **[Types]**: Types always go to a type library. Either it's a shared type that can be
  put into `./libs/shared/types` or it's a backend specific type that can (or even should)
  live in `./libs/api/types`.
- **[Libraries]**: The naming convention is to group libraries into folders to generate
  meaningful names. For example there are two "types" libraries, but the first is in
  `./libs/api/types` and the second is in `./libs/shared/types` so it's clear what lib is
  the shared types and what lib is the api specific types. In general, we want to discuss
  new library names before we generate them.
- **[Where to put code]**: Always evaluate in which scope we need types/util/other code.
  If it's only needed on module level, keep it in the module. If we need it on the api app
  level, put it in the apps' lib. Always think on how we can keep changes local to a
  library to keep the computation and build time as minimal as possible.

## Starting instructions

### Prerequisites

- You'll need `docker` and `docker-compose` (or `docker compose`).
- The node version is pinned to the current lts version of `node` which is 16 as the time
  of writing. (I recommend using [n](https://github.com/tj/n) for node version management)
- This repo uses `npm` as package manager, which has to be major version 8
- Some basic understanding of [nx](https://nx.dev/) would be good to being able to better
  grasp the whole concept - there are a lot of short introduction guides and videos to get
  you started.

### Getting started

- first you need to install the `nx` cli globally to make your life easier with
  `npm install -g nx`
- then just install your dependencies via `npm i` in the root of the repo
- to get started you can simply copy the `example.env` file to a fresh `.env` file located
  in the `./apps/api` folder
- make sure to execute `docker-compose up -d` (first start your Docker Desktop application if you're on a Mac) in the `./apps/api` folder to spin up your
  database, if you have set up your `.env` correctly compose should pick up your settings
- `cd` into the `./apps/api` directory and execute the command `npx prisma db push` to
  initialize the database and generate the prisma client.

If you have done all those steps you can start your application by executing `nx serve` or
`nx serve api` which will start an auto hot reloading development server. You can also use
the npm scripts via executing `npm start` or `npm run start:api`. If no project is
specified nx will default to the api project.

All the most important commands are located in the "scripts" section in `package.json`.

## How to use the nx-cli

One of the greatest features of nx is that it sees which libs/apps are affected by your
changes and only applies actions to those affected libs/apps.

If you want to see your affected libs/apps just type in the following command

```bash
nx affected:graph
```

If you paid close attention, all the lint and build commands work with the "affected" part
to save you some time to not having to test/lint/build projects you didn't touch.

Nx has a few different schematics to generate different kinds of libraries/apps from react
to next or even nestjs.

One example command to generate a nestjs lib would be:

```bash
nx g @nrwl/nest:lib feature --directory api/modules
```

- nx invokes the nx cli
- `@nrwl/nest:lib` indicates that the nestjs schematic is used, and we want to generate a
  library.
- "feature" is the name of the library
- `--directory` lets us modify the directory where we want to generate our lib/app
- you can also append `--dry-run` to test out your command without changing anything

If you happen to have generated a wrong lib you can always look at the `workspace.json`
file in the root and just remove the lib you just generated via this command:

```bash
nx g rm name-of-just-generated-lib
```

There are also commands for moving libraries but nx' website has
[some great docs](https://nx.dev/using-nx/nx-cli) to get started 😉

If you generated a new library make sure to go to the lib/app root directory and add the
respective tag to it in the `project.json`. You can use existing libs as starting point.
In the root `.eslintrc.json` there are some rules which lib/app tags can import other tags
or also cannot. An example would be that the `scope:backend-app` can only import from
`scope:backend-core` to prevent the generation of circular dependencies right out of the
box.

## Troubleshooting

If you're using a graphical git user interface program, make sure your node/npm is in your
`PATH` before this program is opened. This repo uses git hooks that are executed on
`pre-commit` and `pre-push`. You could also use `--no-verify` but then you'll not be able
to merge your code into the repo as the ci will prevent you from merging non-linted code
that maybe has type errors.
