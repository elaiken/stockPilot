export type Product = {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  reorderPoint: number;
  price: number;
  supplier: string;
  velocity: number;
  returns: number;
};

export type UploadRecord = {
  id: number;
  name: string;
  source: string;
  status: string;
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Espresso Beans 2lb",
    sku: "ESP-201",
    quantity: 12,
    reorderPoint: 15,
    price: 28,
    supplier: "BluePort Roasters",
    velocity: 31,
    returns: 1,
  },
  {
    id: 2,
    name: "Cold Brew Bottles",
    sku: "CB-110",
    quantity: 44,
    reorderPoint: 20,
    price: 6,
    supplier: "Urban Beverage Co.",
    velocity: 52,
    returns: 3,
  },
  {
    id: 3,
    name: "Thermal Cups",
    sku: "TC-430",
    quantity: 8,
    reorderPoint: 10,
    price: 14,
    supplier: "NorthPeak Supply",
    velocity: 19,
    returns: 0,
  },
  {
    id: 4,
    name: "Vanilla Syrup",
    sku: "VS-305",
    quantity: 26,
    reorderPoint: 12,
    price: 11,
    supplier: "Sweetline Foods",
    velocity: 15,
    returns: 2,
  },
];

export const uploadHistory: UploadRecord[] = [
  { id: 1, name: "April inventory.csv", source: "CSV import", status: "Processed" },
  { id: 2, name: "supplier-receipt.jpg", source: "Receipt scan", status: "Textract parsed" },
  { id: 3, name: "warehouse-shelf.png", source: "Stock screenshot", status: "Queued" },
];

export const awsServices = [
  ["S3", "Store PDFs, images, CSVs, receipts, and upload artifacts."],
  ["Lambda", "Trigger parsing, clean incoming data, and create events."],
  ["API Gateway", "Connect the dashboard frontend to backend workflows."],
  ["DynamoDB / RDS", "Persist products, suppliers, stock events, and reports."],
  ["Textract", "Read receipts, screenshots, PDFs, and supplier forms."],
  ["Bedrock / OpenAI API", "Generate summaries, demand insights, and reorder guidance."],
  ["CloudWatch", "Track logs, failures, and upload-processing health."],
  ["IAM", "Lock down roles, permissions, and service boundaries."],
] as const;

export const pagePlan = [
  "Dashboard Home",
  "Inventory Page",
  "Upload Center",
  "Analytics Page",
  "AI Report Page",
  "Order Form Page",
];

export const lowStockProducts = initialProducts.filter(
  (product) => product.quantity <= product.reorderPoint,
);

export const inventoryValue = initialProducts.reduce(
  (sum, product) => sum + product.quantity * product.price,
  0,
);

export const totalUnits = initialProducts.reduce((sum, product) => sum + product.quantity, 0);

export const topSeller =
  [...initialProducts].sort((a, b) => b.velocity - a.velocity)[0] ?? initialProducts[0];

export const totalReturns = initialProducts.reduce((sum, product) => sum + product.returns, 0);

export const aiSummary = `Low-stock pressure is centered on ${lowStockProducts
  .map((product) => product.name)
  .join(", ")}. ${topSeller.name} is the fastest mover at ${
  topSeller.velocity
} units sold this month. Prioritize a reorder batch for ${lowStockProducts.length} products before the next weekly cycle.`;
