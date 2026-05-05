# StockPilot

Portfolio-ready Next.js MVP for an AI-assisted inventory dashboard focused on uploads, stock operations, and reorder guidance.

## MVP scope

Version 1 is intentionally narrow:

- Login/dashboard mock
- Manual inventory entry
- CSV or screenshot intake
- Product storage in frontend state
- Sales, restock, and return updates
- Low-stock warnings
- AI report summary
- Reorder suggestions

## Suggested AWS architecture

- `S3`: upload PDFs, images, CSVs, receipts
- `Lambda`: process uploads and trigger parsing workflows
- `API Gateway`: expose frontend-to-backend endpoints
- `DynamoDB` or `RDS`: store products, suppliers, stock events, and reports
- `Textract`: extract data from receipts, screenshots, and PDFs
- `Bedrock` or `OpenAI API`: generate AI reports and reorder recommendations
- `CloudWatch`: logs, alerts, and operational monitoring
- `IAM`: service roles and permission boundaries

## Pages included

- Dashboard Home
- Inventory Page
- Upload Center
- Analytics Page
- AI Report Page
- Order Form Page

## Local setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Next build steps

1. Add authentication and role-aware dashboard states.
2. Replace mock upload widgets with S3-backed uploads and API Gateway endpoints.
3. Persist inventory in DynamoDB or Postgres.
4. Add Textract-powered parsing for receipts and screenshots.
5. Connect Bedrock or OpenAI for report generation and reorder form drafting.
