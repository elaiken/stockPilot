import { StockPilotShell } from "../../components/stockpilot-shell";
import {
  aiSummary,
  initialProducts,
  inventoryValue,
  lowStockProducts,
  pagePlan,
  topSeller,
  totalUnits,
} from "../../lib/stockpilot-data";

export default function DashboardPage() {
  return (
    <StockPilotShell
      eyebrow="Dashboard Home"
      title="Core inventory visibility for operators, founders, and supply teams."
      description="This dashboard route anchors the MVP: health metrics, low-stock pressure, AI guidance, and a clear path into the deeper operational pages."
    >
      <section className="section">
        <div className="stats-grid">
          <article className="stat-card card">
            <span>Total products</span>
            <strong>{initialProducts.length}</strong>
            <small>{totalUnits} units tracked</small>
          </article>
          <article className="stat-card card warn">
            <span>Low-stock alerts</span>
            <strong>{lowStockProducts.length}</strong>
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

      <section className="section two-column">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Snapshot</p>
            <h2>What the operator sees first</h2>
          </div>
          <p className="feature-copy">{aiSummary}</p>
        </div>
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Route Map</p>
            <h2>MVP pages now split into real routes</h2>
          </div>
          <ul className="route-list">
            {pagePlan.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Priority Products</p>
            <h2>Low-stock products requiring action</h2>
          </div>
          <div className="recommendations">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="recommendation-row">
                <strong>{product.name}</strong>
                <span>
                  {product.quantity} on hand, reorder threshold {product.reorderPoint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StockPilotShell>
  );
}
