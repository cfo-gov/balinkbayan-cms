# Project Structure & Code Organization

## Package Manager

- Use `pnpm` for all package installations and management

## Core Libraries and Versions

- Next.js: ^14.x.x
- React: ^18.x.x
- React DOM: ^18.x.x
- TypeScript: ^5.x.x
- Tailwind CSS: ^3.x.x
- shadcn/ui: Latest components
- Zod: ^3.x.x
- Tanstack Query: ^5.x.x
- Zustand: ^4.x.x

## Naming Conventions

- `kebab-case` - for all folders/files
- `PascalCase` - for classes and types
- `snake_case` - for database tables and columns
- `camelCase` - for functions, zod schemas and etc.

## Common Modules

- `actions` - for server actions **(Only if necessary)**
- `assets` - for assets
- `components` - for components
- `constants` - for constants
- `contexts` - for react context api
- `data` - for data access layer (e.g. `api`, `database`)
- `hooks` - for custom hooks, tanstack query and mutation
- `lib` - for 3rd party integrations libraries
- `services` - for business logic and orchestration of data access layer **(Only if necessary)**
- `stores` - for stores (e.g. `zustand`)
- `types` - for types
- `utils` - for utilities

## Domain Folders

- `src` - main source code and shared common modules
- `src/app` - main Next.js app router folder
- `src/features` - main features folder
- `src/shared` - shared code (e.g. `utils`, `constants`, `types`, `hooks`, `components`).

## Shared Modules Structure

Shared modules follow this structure:

```
`src/shared` - shared modules.
├── assets/                 # Shared assets module
├── components/             # Shared dumb components module
│   └── ui/                 # UI components (button, input, etc.)
├── constants/              # Shared constants module
├── contexts/               # Shared react context api module
├── data/                   # Shared data access layer module (API, database)
├── hooks/                  # Shared custom hooks, tanstack query and mutation
│   ├── use-<hook-name>.ts  # Shared custom hook
│   └── query/              # React-query hooks
│       ├── use-<hook-name>-query.ts     # Shared react-query query (Only if necessary)
│       └── use-<hook-name>-mutation.ts  # Shared react-query mutation (Only if necessary)
├── lib/                    # Shared 3rd party integrations
├── services/               # Shared business logic (only if necessary)
├── stores/                 # Shared state stores (e.g., zustand)
├── types/                  # Shared types
└── utils/                  # Shared utilities
```

## Feature Domain Structure

When creating new feature files, follow this structure:

```
src/features/<feature-name>/
├── actions/               # Feature's server actions (only if necessary)
├── assets/                # Feature's assets (only if necessary)
├── components/            # Feature's components
├── constants/             # Feature's constants
├── contexts/              # Feature's react context API
├── data/                  # Feature's data access layer (only if necessary)
├── hooks/                 # Feature's hooks, tanstack query and mutation (only if necessary)
│   └── query/             # React-query hooks
│       ├── use-<method>-<hook-name>-query.ts     # react-query query (e.g., useGetProductsQuery) (Only if necessary)
│   └── mutation/          # React-mutation hooks
│       ├── use-<method>-<hook-name>-mutation.ts  # react-query mutation (e.g., useCreateProductMutation) (Only if necessary)
│   └── keys.ts            # Feature's query keys
├── lib/                   # Feature's 3rd party integrations (only if necessary)
├── services/              # Feature's business logic (only if necessary)
├── stores/                # Feature's state stores (e.g., zustand)
├── types/                 # Feature's types
└── utils/                 # Feature's utilities
```
