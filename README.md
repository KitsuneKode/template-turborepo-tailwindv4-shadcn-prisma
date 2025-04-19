# Template Monorepo with Tailwind CSS v4, Shadcn, and Prisma

This is a template monorepo that includes the following:

- A `web` app built with Next.js, Tailwind CSS v4, and Shadcn
- A `db` package with Prisma for database operations
- A `ui` package with a set of reusable React components built with Tailwind CSS v4
- A `types` package with TypeScript types for the entire monorepo

The monorepo is managed with Turborepo, which allows for fast and efficient development across multiple packages.

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run the development server with `pnpm run dev`

## Packages

### `web`

The `web` package is a Next.js app that uses Tailwind CSS v4 and Shadcn. It includes a sample page with a button component from the `ui` package.

### `db`

The `db` package includes Prisma for database operations. It includes a sample schema and a `prisma` command to generate the database client.

### `ui`

The `ui` package includes a set of reusable React components built with Tailwind CSS v4. It includes a sample button component.

### `types`

The `types` package includes TypeScript types for the entire monorepo. It includes types for the `web`, `db`, and `ui` packages.

## Development

The monorepo is managed with Turborepo, which allows for fast and efficient development across multiple packages. The `pnpm run dev` command will start the development server for all packages.

To add a new shadcn component, you can run the following command:

```bash

pnpm dlx shadcn add <component-name> -c packages/ui

```

## Deployment

The monorepo can be deployed to Vercel by running `pnpm run deploy`. This will deploy the `web` app to Vercel.
