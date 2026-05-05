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

export type CafeLocation = {
  id: number;
  name: string;
  region: string;
  manager: string;
  fillRate: string;
  status: string;
};

export type SupplierStatus = {
  id: number;
  supplier: string;
  eta: string;
  lane: string;
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
  { id: 1, name: "SoHo Cafe weekly count.csv", source: "Store inventory upload", status: "Processed" },
  { id: 2, name: "BluePort invoice 4421.jpg", source: "Roaster invoice scan", status: "Parsed" },
  { id: 3, name: "Midtown shelf audit.png", source: "Store floor audit", status: "Queued" },
];

export const cafeLocations: CafeLocation[] = [
  {
    id: 1,
    name: "SoHo Flagship",
    region: "New York City",
    manager: "Maya Brooks",
    fillRate: "96.4%",
    status: "Stable",
  },
  {
    id: 2,
    name: "River North",
    region: "Chicago",
    manager: "Daniel Kim",
    fillRate: "91.8%",
    status: "Watchlist",
  },
  {
    id: 3,
    name: "Capitol Hill",
    region: "Seattle",
    manager: "Jordan Ellis",
    fillRate: "97.2%",
    status: "Stable",
  },
] as const;

export const supplierStatuses: SupplierStatus[] = [
  {
    id: 1,
    supplier: "BluePort Roasters",
    eta: "May 8",
    lane: "LTL / refrigerated",
    status: "Confirmed",
  },
  {
    id: 2,
    supplier: "NorthPeak Supply",
    eta: "May 9",
    lane: "Ground",
    status: "Pending approval",
  },
  {
    id: 3,
    supplier: "Sweetline Foods",
    eta: "May 11",
    lane: "Regional freight",
    status: "Scheduled",
  },
] as const;

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
} units sold this month. Prioritize a replenishment batch for ${lowStockProducts.length} products before Friday's inter-store transfer window.`;
