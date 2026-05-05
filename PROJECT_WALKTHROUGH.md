# StockPilot Project Walkthrough

This document is the recruiter-friendly version of the project story. It is meant to help explain what `StockPilot` is, why it matters, what has been built so far, and how to demo it clearly.

## One-line summary

`StockPilot` is an AI-assisted inventory dashboard MVP built with `Next.js`, `React`, and `TypeScript` for businesses that need better visibility into stock levels, uploads, sales activity, and reorder planning.

## The problem

Small and mid-sized businesses often track inventory across spreadsheets, receipts, screenshots, PDFs, and manual updates. That creates several problems:

- Inventory data is fragmented
- Stock levels fall out of date quickly
- Reorder decisions are reactive instead of proactive
- Uploads like receipts or supplier documents are hard to operationalize
- Teams do not get clear AI-powered summaries from their inventory data

## The solution

`StockPilot` is designed as a centralized operations dashboard where a business can:

- Track products and quantities
- Update sales, restocks, and returns
- Upload CSVs, images, PDFs, and receipts
- Surface low-stock risks
- Generate AI summaries
- Produce reorder recommendations

The current version is an MVP focused on proving the product flow and interface before building the full cloud-backed system.

## What is built right now

The current MVP includes:

- A login/dashboard mock
- Dedicated routes for each major workflow
- A dashboard overview with key inventory metrics
- Manual inventory entry
- Quantity update actions for sales, returns, and restocks
- Low-stock warnings
- Upload center UI concept
- Analytics cards for demand, returns, and profit/loss estimation
- AI report summary section
- AI-style reorder suggestion section
- Supplier order draft concept

## Current stack

The project currently uses:

- `Next.js`
- `React`
- `TypeScript`
- `App Router`
- Plain CSS

This is useful in interviews because it shows a modern production-style frontend stack without unnecessary complexity.

## Why this is a strong portfolio project

`StockPilot` is stronger than a generic CRUD project because it combines:

- Product thinking
- Dashboard UI design
- Operational workflows
- AI feature planning
- Realistic cloud architecture

It shows that the project is not just a frontend mockup. It is a product concept with a believable path to production.

## What to show during the demo

When walking someone through the project, the best sequence is:

1. Start on `/dashboard` and explain that this is the operational home screen.
2. Show the top-level metrics: total products, low-stock alerts, inventory value, and AI recommendation.
3. Move to `/inventory` and add a new product in the inventory form.
4. Update stock counts using the sale, return, and restock actions.
5. Point out how low-stock warnings and reorder suggestions are derived from state.
6. Move to `/uploads` and explain how this would later connect to `S3`, `Lambda`, and `Textract`.
7. Move to `/analytics` and explain how this supports operational decision-making.
8. Move to `/reports` and `/orders` to explain where `Bedrock` or the `OpenAI API` would fit.

## Demo script

If you want a short script, use this:

`StockPilot is an AI-assisted inventory dashboard MVP. I built it in Next.js and TypeScript to model a realistic inventory workflow for small businesses. The app now has dedicated routes for dashboard, inventory, uploads, analytics, reports, and orders. Users can track products, update stock, see low-stock alerts, review upload workflows, and generate AI-style reorder guidance. Right now it uses frontend state for speed and clarity, but the architecture is designed to plug into S3, Lambda, Textract, DynamoDB, and an AI provider like Bedrock or OpenAI.`

## Technical story to tell

If an engineer asks how it is structured, the clean explanation is:

- The app uses the `Next.js` App Router
- The root entry in [app/page.tsx](/Users/elaiken/Projects/StockPilot/app/page.tsx) redirects to `/dashboard`
- Route pages live under `app/dashboard`, `app/inventory`, `app/uploads`, `app/analytics`, `app/reports`, and `app/orders`
- Shared route chrome lives in [components/stockpilot-shell.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-shell.tsx)
- The interactive inventory logic lives in [components/stockpilot-inventory-manager.tsx](/Users/elaiken/Projects/StockPilot/components/stockpilot-inventory-manager.tsx)
- Shared mock data lives in [lib/stockpilot-data.ts](/Users/elaiken/Projects/StockPilot/lib/stockpilot-data.ts)
- Global styling and responsive layout live in [app/globals.css](/Users/elaiken/Projects/StockPilot/app/globals.css)
- The current version uses client-side state to model business operations quickly
- The UI was intentionally scoped as an MVP so backend complexity would not slow the first demonstrable version

## Product decisions that matter

A strong part of this project is the decision to build the MVP first instead of the full system.

That means the first version focuses on:

- Inventory visibility
- Manual state changes
- Upload workflow concepts
- Low-stock risk surfacing
- AI-assisted reporting and reorder planning

This is a good product decision because it proves the most important user flows before adding backend cost and infrastructure complexity.

## Architecture story

The architecture planned for future versions is:

- `S3` for uploaded files
- `Lambda` for ingestion and parsing workflows
- `API Gateway` for frontend/backend communication
- `DynamoDB` or `RDS` for persistent inventory data
- `Textract` for receipts, screenshots, and PDFs
- `Bedrock` or `OpenAI API` for AI reports and reorder recommendations
- `CloudWatch` for logging and monitoring
- `IAM` for security and permissions

This gives you a strong answer if someone asks, `How would this scale beyond the demo?`

## What this project says about you

This project demonstrates:

- You can scope a product into a realistic MVP
- You can build with a modern React stack
- You understand dashboard UX and operational workflows
- You think beyond the frontend into architecture and system integration
- You know how to position AI as part of a business tool, not just a chatbot demo

## Best talking points for recruiters

- This is an inventory operations product, not just a UI exercise.
- It combines AI concepts with a real business workflow.
- The MVP is intentionally narrow to prove value quickly.
- The technical stack is current and production-relevant.
- The architecture leaves a clear path to cloud services and persistence.

## Best talking points for hiring engineers

- The project uses `Next.js` App Router with a clean separation between route entry and client-side interaction logic.
- The MVP uses typed frontend state to model business actions quickly.
- The UI is already split into route-based pages and is positioned for backend integration.
- The product flow is already mapped to realistic AWS services.
- The current version is build-verified and ready for iterative extension.

## What is not built yet

Be direct about what is still planned:

- Authentication is not implemented yet
- Data persistence is not implemented yet
- Real uploads are not wired yet
- AI integration is still mocked
- Supplier workflows are still conceptual

This is not a weakness if you frame it correctly. It shows disciplined scoping.

## Best way to frame the roadmap

The best next-step explanation is:

1. Add persistent inventory storage
2. Add real upload ingestion
3. Add AI API integration
4. Add authentication and role-based access
5. Add server-side workflows for reports and ingestion

## Closing summary

`StockPilot` is a polished MVP that demonstrates product strategy, frontend engineering, and cloud-oriented system design. It is a good demo project because it tells a clear story: a real business problem, a focused technical solution, and a credible path from prototype to production.
