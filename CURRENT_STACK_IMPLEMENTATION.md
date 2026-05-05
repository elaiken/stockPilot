# StockPilot Current Stack Implementation

This document explains the exact process used to build the current version of `StockPilot` so it can be presented clearly to recruiters, hiring managers, and engineers.

## Project purpose

`StockPilot` is a portfolio MVP for an AI-assisted inventory dashboard. The current version is intentionally scoped to show strong product thinking, clean frontend implementation, and a realistic path to AWS-backed production architecture.

The MVP currently demonstrates:

- Login/dashboard mock
- Route-based application structure
- Manual inventory entry
- Product quantity updates
- Low-stock warnings
- Upload center concept for CSVs, PDFs, screenshots, and receipts
- AI summary and reorder suggestion UI
- Order draft concept

## Current stack

The app is built with:

- `Next.js`
- `React`
- `TypeScript`
- `App Router`
- Plain CSS via `app/globals.css`

Current package setup from [package.json](/Users/elaiken/Projects/StockPilot/package.json):

- `next`: `^15.3.1`
- `react`: `^18.3.1`
- `react-dom`: `^18.3.1`
- `typescript`: `^5.6.2`
- `eslint`: `^9.18.0`
- `eslint-config-next`: `^15.3.1`
- `@types/node`: `^22.10.1`
- `@types/react`: `^18.3.3`
- `@types/react-dom`: `^18.3.0`

## Why the current stack was chosen

The current implementation uses `Next.js` because that is the stack you are already comfortable with, and it is a strong signal for hiring teams because it reflects a modern React production workflow.

This stack is useful for a portfolio project because it supports:

- Modern routing with the App Router
- Easy future API routes and server actions
- Production-ready build tooling
- Strong TypeScript support
- Clean migration path from mock frontend state to real backend services

## Build process used

The current project was built in the following sequence.

### 1. Created the project folder

A new standalone project folder was created at:

- [/Users/elaiken/Projects/StockPilot](/Users/elaiken/Projects/StockPilot)

This keeps the app isolated from other projects in the workspace.

### 2. Built the first MVP interface

The first version was created as a frontend-only inventory dashboard concept with:

- Hero section and dashboard overview
- Inventory management form
- Product table with stock actions
- Upload center section
- Analytics section
- AI report section
- Reorder and order-draft section
- AWS services planning section

This established the product concept and interaction model before connecting any real backend systems.

### 3. Converted the app to Next.js

The implementation was then aligned to the current stack by replacing the earlier scaffold with a `Next.js` App Router setup.

That included:

- Replacing the old single-entry frontend setup with `app/`
- Adding `app/layout.tsx`
- Adding `app/page.tsx`
- Moving the interactive dashboard into a dedicated client component
- Updating scripts in `package.json` to use `next dev`, `next build`, and `next start`
- Updating `tsconfig.json` for Next.js
- Adding `next-env.d.ts`
- Adding `next.config.ts`

### 4. Separated server and client responsibilities

The root entry is a redirect:

- [app/page.tsx](/Users/elaiken/Projects/StockPilot/app/page.tsx)

It now redirects users to the main dashboard route:

- `/dashboard`

The app is split into dedicated route pages:

- [app/dashboard/page.tsx](/Users/elaiken/Projects/StockPilot/app/dashboard/page.tsx)
- [app/inventory/page.tsx](/Users/elaiken/Projects/StockPilot/app/inventory/page.tsx)
- [app/uploads/page.tsx](/Users/elaiken/Projects/StockPilot/app/uploads/page.tsx)
- [app/analytics/page.tsx](/Users/elaiken/Projects/StockPilot/app/analytics/page.tsx)
- [app/reports/page.tsx](/Users/elaiken/Projects/StockPilot/app/reports/page.tsx)
- [app/orders/page.tsx](/Users/elaiken/Projects/StockPilot/app/orders/page.tsx)

The shared application shell lives in:

- [components/stockpilot-shell.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-shell.tsx)

The interactive inventory workflow lives in:

- [components/stockpilot-inventory-manager.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-inventory-manager.tsx)

Shared demo data and derived metrics live in:

- [lib/stockpilot-data.ts](/Users/elaiken/Projects/StockPilot/lib/stockpilot-data.ts)

This is a clean Next.js pattern because:

- Each page now maps to a real product area
- Shared chrome is isolated from route content
- Stateful inventory logic is isolated
- The project can later introduce server-side data loading without rewriting the dashboard structure

### 5. Added global styling

The visual system is defined in:

- [app/globals.css](/Users/elaiken/Projects/StockPilot/app/globals.css)

The styling approach uses:

- CSS variables
- Responsive grid layouts
- Card-based dashboard sections
- Strong visual hierarchy
- Mobile-friendly breakpoints

The interface was intentionally designed to look more polished than a default CRUD dashboard so it feels portfolio-ready.

### 6. Solved build compatibility issues

During the Next.js setup, the build initially failed because `next/font/google` attempted to fetch Google Fonts during the production build, and the environment could not resolve `fonts.googleapis.com`.

To keep the build self-contained and reliable, that dependency was removed and replaced with local system font stacks in:

- [app/layout.tsx](/Users/elaiken/Projects/StockPilot/app/layout.tsx)
- [app/globals.css](/Users/elaiken/Projects/StockPilot/app/globals.css)

This made the build deterministic in a restricted environment.

### 7. Verified the project

The current app was validated by running:

```bash
npm install
npm run build
```

The production build completed successfully on the current stack.

### 8. Split the MVP into real Next.js routes

After the initial Next.js conversion, the app was upgraded from a single long page into a route-based application.

That included:

- Redirecting `/` to `/dashboard`
- Creating dedicated pages for inventory, uploads, analytics, reports, and orders
- Adding shared route navigation
- Extracting shared mock data into `lib/stockpilot-data.ts`
- Keeping the inventory page interactive with a dedicated client component

This made the application more realistic for demos and closer to a production information architecture.

## Current file structure

Key files in the current implementation:

- [app/layout.tsx](/Users/elaiken/Projects/StockPilot/app/layout.tsx): root HTML layout and metadata
- [app/page.tsx](/Users/elaiken/Projects/StockPilot/app/page.tsx): root redirect to `/dashboard`
- [app/dashboard/page.tsx](/Users/elaiken/Projects/StockPilot/app/dashboard/page.tsx): dashboard overview route
- [app/inventory/page.tsx](/Users/elaiken/Projects/StockPilot/app/inventory/page.tsx): inventory workflow route
- [app/uploads/page.tsx](/Users/elaiken/Projects/StockPilot/app/uploads/page.tsx): upload center route
- [app/analytics/page.tsx](/Users/elaiken/Projects/StockPilot/app/analytics/page.tsx): analytics route
- [app/reports/page.tsx](/Users/elaiken/Projects/StockPilot/app/reports/page.tsx): AI report route
- [app/orders/page.tsx](/Users/elaiken/Projects/StockPilot/app/orders/page.tsx): order form route
- [app/globals.css](/Users/elaiken/Projects/StockPilot/app/globals.css): global styling and responsive layout
- [components/stockpilot-shell.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-shell.tsx): shared route shell and navigation
- [components/stockpilot-inventory-manager.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-inventory-manager.tsx): interactive inventory UI and state logic
- [lib/stockpilot-data.ts](/Users/elaiken/Projects/StockPilot/lib/stockpilot-data.ts): shared demo data and derived metrics
- [package.json](/Users/elaiken/Projects/StockPilot/package.json): scripts and dependencies
- [tsconfig.json](/Users/elaiken/Projects/StockPilot/tsconfig.json): TypeScript config for Next.js
- [next.config.ts](/Users/elaiken/Projects/StockPilot/next.config.ts): Next.js config
- [README.md](/Users/elaiken/Projects/StockPilot/README.md): project summary and roadmap

## How the current UI works

The application is currently frontend-driven and uses in-memory React state plus shared mock data.

### Routes

The current route structure is:

- `/dashboard`
- `/inventory`
- `/uploads`
- `/analytics`
- `/reports`
- `/orders`

### Inventory state

The inventory route stores an initial product list in component state and derives:

- Total products
- Total units
- Inventory value
- Low-stock items
- Top-selling item

### User interactions

The current UI supports:

- Adding a new product
- Updating quantity with sale, return, and restock actions
- Deleting a product
- Generating low-stock recommendations from current state

### AI summary behavior

The current AI report is a simulated summary generated from frontend state. It is not connected to a live AI API yet, but the UI and product flow are designed so real AI integration can be added later without redesigning the page.

## Production architecture planned from this MVP

The current frontend is designed to connect later to:

- `S3` for upload storage
- `Lambda` for file processing
- `API Gateway` for frontend/backend communication
- `DynamoDB` or `RDS` for inventory persistence
- `Textract` for document and receipt parsing
- `Bedrock` or `OpenAI API` for AI-generated reports and reorder suggestions
- `CloudWatch` for monitoring
- `IAM` for permissions and security boundaries

This is useful in interviews because it shows both MVP discipline and systems thinking.

## Local development workflow

To run the project locally:

```bash
cd /Users/elaiken/Projects/StockPilot
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

To create a production build:

```bash
npm run build
```

To run the production server after building:

```bash
npm run start
```

## Git and repository setup

The project was initialized as its own git repository and pushed to GitHub.

Repository:

- `https://github.com/elaiken/stockPilot.git`

Git steps completed:

1. Initialized a new git repository inside `StockPilot`
2. Added a `.gitignore` for `node_modules`, `.next`, and `dist`
3. Created the initial commit
4. Renamed the branch to `main`
5. Added the GitHub remote
6. Pushed `main` to GitHub

Initial commit:

- `b866fde` - `Initial Next.js StockPilot MVP`

## How to explain this in a demo

If you are presenting this to recruiters or hiring engineers, the clean explanation is:

1. `StockPilot` is an AI-assisted inventory dashboard MVP designed for real operational workflows.
2. The current version is intentionally frontend-first so the product flow can be demonstrated quickly.
3. It is built with `Next.js`, `React`, and `TypeScript` using the App Router.
4. The MVP now uses dedicated routes for dashboard, inventory, uploads, analytics, reports, and orders.
5. The application already models inventory actions, upload workflows, AI reporting, and reorder planning.
6. The architecture is designed to scale into AWS services like `S3`, `Lambda`, `Textract`, `DynamoDB`, and `Bedrock`.

## Best recruiter-facing talking points

- This project shows product scoping discipline by starting with a focused MVP instead of overbuilding.
- It demonstrates practical frontend engineering with a modern `Next.js` stack.
- It reflects systems design thinking because the UI is already mapped to realistic AWS integrations.
- It shows how AI features can be placed inside an operational business application instead of a toy chatbot.
- It is structured so mock state can later be replaced by real persistence and AI endpoints with limited refactoring.

## Recommended next implementation steps

The best next steps for the codebase are:

1. Add persistent storage for products and stock events.
2. Add real upload handling.
3. Add authentication.
4. Replace mock AI summary logic with a real API integration.
5. Add API routes or server actions for backend workflows.

## Summary

The current `StockPilot` stack is a verified `Next.js + React + TypeScript` MVP that is already suitable for demos. It presents a realistic inventory operations product, demonstrates clean frontend engineering, and leaves a clear path toward AWS-backed and AI-powered production functionality.
