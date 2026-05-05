"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
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

type UploadRecord = {
  id: number;
  name: string;
  source: string;
  status: string;
};

const initialProducts: Product[] = [
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

const uploadHistory: UploadRecord[] = [
  { id: 1, name: "April inventory.csv", source: "CSV import", status: "Processed" },
  { id: 2, name: "supplier-receipt.jpg", source: "Receipt scan", status: "Textract parsed" },
  { id: 3, name: "warehouse-shelf.png", source: "Stock screenshot", status: "Queued" },
];

const awsServices = [
  ["S3", "Store PDFs, images, CSVs, receipts, and upload artifacts."],
  ["Lambda", "Trigger parsing, clean incoming data, and create events."],
  ["API Gateway", "Connect the dashboard frontend to backend workflows."],
  ["DynamoDB / RDS", "Persist products, suppliers, stock events, and reports."],
  ["Textract", "Read receipts, screenshots, PDFs, and supplier forms."],
  ["Bedrock / OpenAI API", "Generate summaries, demand insights, and reorder guidance."],
  ["CloudWatch", "Track logs, failures, and upload-processing health."],
  ["IAM", "Lock down roles, permissions, and service boundaries."],
] as const;

const pagePlan = [
  "Dashboard Home",
  "Inventory Page",
  "Upload Center",
  "Analytics Page",
  "AI Report Page",
  "Order Form Page",
];

export function StockPilotDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: "0",
    reorderPoint: "0",
    price: "0",
    supplier: "",
  });

  const lowStock = useMemo(
    () => products.filter((product) => product.quantity <= product.reorderPoint),
    [products],
  );
  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + product.quantity * product.price, 0),
    [products],
  );
  const totalUnits = useMemo(
    () => products.reduce((sum, product) => sum + product.quantity, 0),
    [products],
  );
  const topSeller = useMemo(
    () => [...products].sort((a, b) => b.velocity - a.velocity)[0] ?? initialProducts[0],
    [products],
  );

  const handleAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newProduct.name.trim() || !newProduct.sku.trim()) {
      return;
    }

    setProducts((current) => [
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        sku: newProduct.sku.trim().toUpperCase(),
        quantity: Number(newProduct.quantity),
        reorderPoint: Number(newProduct.reorderPoint),
        price: Number(newProduct.price),
        supplier: newProduct.supplier.trim() || "Unassigned supplier",
        velocity: 8,
        returns: 0,
      },
      ...current,
    ]);

    setNewProduct({
      name: "",
      sku: "",
      quantity: "0",
      reorderPoint: "0",
      price: "0",
      supplier: "",
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const aiSummary = `Low-stock pressure is centered on ${lowStock
    .map((product) => product.name)
    .join(", ") || "no critical items right now"}. ${topSeller.name} is the fastest mover at ${
    topSeller.velocity
  } units sold this month. Prioritize a reorder batch for ${lowStock.length} product${
    lowStock.length === 1 ? "" : "s"
  } before the next weekly cycle.`;

  return (
    <div className="app-shell">
      <div className="bg-orb bg-orb-left" />
      <div className="bg-orb bg-orb-right" />

      <header className="hero">
        <nav className="topbar">
          <div>
            <p className="eyebrow">A.I. Inventory Dashboard</p>
            <h1>StockPilot</h1>
          </div>
          <div className="nav-links">
            <a href="#dashboard">Dashboard</a>
            <a href="#inventory">Inventory</a>
            <a href="#uploads">Uploads</a>
            <a href="#analytics">Analytics</a>
            <a href="#report">AI Report</a>
            <a href="#orders">Orders</a>
          </div>
        </nav>

        <section className="hero-grid">
          <div className="hero-copy card">
            <p className="eyebrow">Portfolio MVP</p>
            <h2>Inventory operations with AI summaries, stock alerts, and upload-driven workflows.</h2>
            <p className="lede">
              This first version focuses on the strongest portfolio slice: a login-ready dashboard
              mock, manual inventory management, upload intake, low-stock warnings, and AI-driven
              reorder guidance.
            </p>
            <div className="chip-row">
              <span>CSV uploads</span>
              <span>Screenshot intake</span>
              <span>AI reports</span>
              <span>Reorder suggestions</span>
            </div>
          </div>

          <div className="login-card card">
            <p className="eyebrow">Login Mock</p>
            <h3>Warehouse Operator Access</h3>
            <div className="field">
              <label>Email</label>
              <input value="ops@stockpilot.ai" readOnly />
            </div>
            <div className="field">
              <label>Password</label>
              <input value="••••••••••••" readOnly />
            </div>
            <button type="button" className="primary-button">
              Open dashboard
            </button>
          </div>
        </section>
      </header>

      <main>
        <section id="dashboard" className="section">
          <div className="section-heading">
            <p className="eyebrow">Dashboard Home</p>
            <h2>Core operational snapshot</h2>
          </div>
          <div className="stats-grid">
            <article className="stat-card card">
              <span>Total products</span>
              <strong>{products.length}</strong>
              <small>{totalUnits} units tracked</small>
            </article>
            <article className="stat-card card warn">
              <span>Low-stock alerts</span>
              <strong>{lowStock.length}</strong>
              <small>Products at or below reorder point</small>
            </article>
            <article className="stat-card card">
              <span>Inventory value</span>
              <strong>${inventoryValue.toLocaleString()}</strong>
              <small>Current on-hand estimate</small>
            </article>
            <article className="stat-card card accent">
              <span>AI recommendation</span>
              <strong>{topSeller.name}</strong>
              <small>Restock this top mover first</small>
            </article>
          </div>
        </section>

        <section id="inventory" className="section two-column">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Inventory Page</p>
              <h2>Add, update, and remove products</h2>
            </div>
            <form className="card product-form" onSubmit={handleAddProduct}>
              <div className="form-grid">
                <div className="field">
                  <label>Product name</label>
                  <input
                    value={newProduct.name}
                    onChange={(event) =>
                      setNewProduct((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="Matcha tins"
                  />
                </div>
                <div className="field">
                  <label>SKU</label>
                  <input
                    value={newProduct.sku}
                    onChange={(event) =>
                      setNewProduct((current) => ({ ...current, sku: event.target.value }))
                    }
                    placeholder="MT-990"
                  />
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(event) =>
                      setNewProduct((current) => ({ ...current, quantity: event.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label>Reorder point</label>
                  <input
                    type="number"
                    value={newProduct.reorderPoint}
                    onChange={(event) =>
                      setNewProduct((current) => ({
                        ...current,
                        reorderPoint: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="field">
                  <label>Unit price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(event) =>
                      setNewProduct((current) => ({ ...current, price: event.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label>Supplier info</label>
                  <input
                    value={newProduct.supplier}
                    onChange={(event) =>
                      setNewProduct((current) => ({ ...current, supplier: event.target.value }))
                    }
                    placeholder="Atlas Supply"
                  />
                </div>
              </div>
              <button type="submit" className="primary-button">
                Add product
              </button>
            </form>
          </div>

          <div className="card inventory-table-wrap">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <strong>{product.name}</strong>
                      <span>{product.sku}</span>
                    </td>
                    <td>
                      <strong>{product.quantity}</strong>
                      <span>Reorder at {product.reorderPoint}</span>
                    </td>
                    <td>{product.supplier}</td>
                    <td>
                      <div className="action-row">
                        <button type="button" onClick={() => updateQuantity(product.id, 1)}>
                          + Sale return
                        </button>
                        <button type="button" onClick={() => updateQuantity(product.id, -1)}>
                          - Sale
                        </button>
                        <button type="button" onClick={() => updateQuantity(product.id, 5)}>
                          + Restock
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="uploads" className="section two-column">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Upload Center</p>
              <h2>Intake for CSVs, PDFs, images, and receipts</h2>
            </div>
            <div className="card upload-dropzone">
              <p>Drop PDF, CSV, image, or receipt here</p>
              <small>S3 + Lambda + Textract would power this flow in production.</small>
            </div>
          </div>
          <div className="card">
            <h3>Recent upload activity</h3>
            <div className="upload-list">
              {uploadHistory.map((item) => (
                <div key={item.id} className="upload-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.source}</span>
                  </div>
                  <em>{item.status}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="section">
          <div className="section-heading">
            <p className="eyebrow">Analytics Page</p>
            <h2>Demand, returns, and profitability snapshot</h2>
          </div>
          <div className="analytics-grid">
            <article className="card">
              <h3>Demand over time</h3>
              <div className="mini-chart">
                <span style={{ height: "44%" }} />
                <span style={{ height: "62%" }} />
                <span style={{ height: "56%" }} />
                <span style={{ height: "78%" }} />
                <span style={{ height: "92%" }} />
                <span style={{ height: "68%" }} />
              </div>
            </article>
            <article className="card">
              <h3>Fastest-selling item</h3>
              <p className="feature-copy">
                {topSeller.name} is leading at {topSeller.velocity} monthly units sold.
              </p>
            </article>
            <article className="card">
              <h3>Returns</h3>
              <p className="feature-copy">
                {products.reduce((sum, product) => sum + product.returns, 0)} tracked returns
                across current products.
              </p>
            </article>
            <article className="card">
              <h3>Profit / loss estimate</h3>
              <p className="feature-copy">
                Estimated margin opportunity: ${(inventoryValue * 0.32).toFixed(0)} if the current
                mix sells through.
              </p>
            </article>
          </div>
        </section>

        <section id="report" className="section two-column">
          <div>
            <div className="section-heading">
              <p className="eyebrow">AI Report Page</p>
              <h2>Natural language recommendations</h2>
            </div>
            <div className="card report-card">
              <p>{aiSummary}</p>
            </div>
          </div>
          <div className="card">
            <h3>Reorder suggestions</h3>
            <div className="recommendations">
              {lowStock.length > 0 ? (
                lowStock.map((product) => (
                  <div key={product.id} className="recommendation-row">
                    <strong>{product.name}</strong>
                    <span>Suggested reorder: {product.reorderPoint * 2 - product.quantity} units</span>
                  </div>
                ))
              ) : (
                <p className="feature-copy">No urgent reorders recommended in the current state.</p>
              )}
            </div>
          </div>
        </section>

        <section id="orders" className="section two-column">
          <div className="card">
            <div className="section-heading">
              <p className="eyebrow">Order Form Page</p>
              <h2>AI-generated supplier order draft</h2>
            </div>
            <div className="order-draft">
              {lowStock.map((product) => (
                <div key={product.id} className="order-row">
                  <strong>{product.supplier}</strong>
                  <span>
                    {product.name}: order {product.reorderPoint * 2 - product.quantity} units
                  </span>
                </div>
              ))}
              {lowStock.length === 0 && (
                <p className="feature-copy">All suppliers are currently within healthy stock levels.</p>
              )}
            </div>
          </div>

          <div className="card">
            <h3>AWS services this project can use</h3>
            <div className="service-list">
              {awsServices.map(([service, description]) => (
                <div key={service} className="service-row">
                  <strong>{service}</strong>
                  <span>{description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="card roadmap-card">
            <div className="section-heading">
              <p className="eyebrow">Build Plan</p>
              <h2>Portfolio MVP first, bigger system later</h2>
            </div>
            <div className="roadmap-grid">
              <div>
                <h3>Version 1 must-have</h3>
                <ul>
                  <li>Login/dashboard mock</li>
                  <li>Add inventory manually</li>
                  <li>Upload CSV or screenshot</li>
                  <li>Store products</li>
                  <li>Update sales, restocks, and returns</li>
                  <li>Low-stock warnings</li>
                  <li>AI report generation</li>
                  <li>Reorder suggestion</li>
                </ul>
              </div>
              <div>
                <h3>Pages included in this concept</h3>
                <ul>
                  {pagePlan.map((page) => (
                    <li key={page}>{page}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
