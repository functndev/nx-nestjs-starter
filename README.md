### General architecture TODO:

- some libs should not be able to require others to prevent circular dependencies (tags)
- figure out complete folder structure

### NestJS todo

- figure out complete translated error handling
- add scaffolding for auth structure
- think about how to handle global modules (do we want importable modules or just global modules)

## Folder Architecture

This project aims to build a base general nx starter scaffolding for apps that use NestJS as API and maybe expand to some more apps in the future.
The app folder should only contain shell applications that are basically entry points into some core application libraries.

```
nestjs-starter
├── apps
│   ├── api-app-name
│   └── frontend-app-name
└── libs
    ├── api
    │   ├── types                     (lib)
    │   ├── util                      (lib)
    │   │   ├── middlewares           (dir)
    │   │   ├── filters               (dir)
    │   │   └── decorators            (dir)
    │   └── modules
    │       ├── feature-1		          (lib)
    │       ├── feature-2		          (lib)
    │       └── feature-3		          (lib)
    ├── api-shared
    │   ├── types                     (lib)
    │   ├── util                      (lib)
    │   └── modules                   (dir)
    │       ├── core-module           (lib)
    │       ├── base-module-1         (lib)
    │       ├── base-module-2         (lib)
    │       └── base-module-3         (lib)
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
