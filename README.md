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
- custom nest lib generation plugin

### Non-Features

I've intentionally left out the authentication part, as there is a good tutorial on the
nestjs website. Our authentication needs oftentimes differ a lot, as we are sometimes
behind auth proxies and need to handle headers and other times we have to implement a
custom full-blown auth solution.

I just left in the `express-session` package as it might come in handy in more api
projects just to keep track of different requesters. You can rip it out though. Make sure
to also remove all excess tables from the prisma schema if you do so.

## Starting instructions

### Prerequisites

- You'll need `docker` and `docker-compose` (or `docker compose`).
- The node version is pinned to the current lts version of `node` which is 18 as the time
  of writing. (I recommend using [n](https://github.com/tj/n) for node version management)
- This repo uses `npm` as package manager, which has to be major version 8
- Some basic understanding of [nx](https://nx.dev/) would be good to being able to better
  grasp the whole concept - there are a lot of short introduction guides and videos to get
  you started.

### Getting started

- first you need to install the `nx` cli globally to make your life easier with
  `npm install -g nx` (otherwise you can also do `npx nx`)
- then just install your dependencies via `npm install` in the root of the repo
- to get started you can simply copy the `.example.env` file to a fresh `.env` file
  located in the root and `./apps/api` folders
- make sure to execute `docker-compose up -d` (first start your Docker Desktop application
  if you're on a Mac) in the root folder to spin up your database, if you have set up your
  `.env` correctly compose should pick up your settings
- execute the command `npm run db-migrate-dev` to initialize the database and generate the
  prisma client.
- also make sure to search-replace all occurrences of "nestjs-starter" with whatever your
  project is called

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

## Custom nestjs library generation

This project contains a custom nestjs library generation command which already adds our
standard config without having to consider that yourself. It's invoked by executing the
following command:

```bash
npm run gen:lib:nest name-of-lib
```

If you want to pass parameters, you have to use an extra double hyphen (thanks npm 🙄)
like this:

```bash
npm run gen:lib:nest name-of-lib -- --directory=api --dry-run
```

- npm invokes the nx cli with our custom generator
- `@nestjs-starter/workspace:nest-library` indicates that our custom schematic is used,
  and we want to generate a nest-library.
- "name-of-lib" is the name of the library we want to create
- `--directory` lets us modify the directory where we want to generate our lib/app
- you can also append `--dry-run` to test out your command without changing anything

If you happen to have generated a wrong lib you can always look at the `workspace.json`
file in the root and just remove the lib you just generated via this command:

```bash
npm run rm:lib name-of-lib
```

You can also move libraries with the following command:

```bash
npm run mv:lib -- --project name-of-lib --destination api/new-name-for-lib
```

Don't forget the double `--` after the npm command though 🧐

If you want to know more about all available commands, nx' website has
[some great docs](https://nx.dev/using-nx/nx-cli) to get started

If you generated a new library **WITHOUT** our custom plugin make sure to go to the
lib/app root directory and add the respective tag to it in the `project.json`. You can use
existing libs as starting point. In the root `.eslintrc.json` there are some rules which
lib/app tags can import other tags or also cannot.

An example would be that the `scope:backend-app` can only import from `scope:backend-core`
to prevent the generation of circular dependencies right out of the box.

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

## Troubleshooting

If you're using a graphical git user interface program, make sure your node/npm is in your
`PATH` before this program is opened. This repo uses git hooks that are executed on
`pre-commit` and `pre-push`. You could also use `--no-verify` but then you'll not be able
to merge your code into the repo as the ci will prevent you from merging non-linted code
that maybe has type errors.
