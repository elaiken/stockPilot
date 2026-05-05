import { StockPilotShell } from "../../components/stockpilot-shell";
import {
  aiSummary,
  cafeLocations,
  initialProducts,
  inventoryValue,
  lowStockProducts,
  topSeller,
  totalUnits,
} from "../../lib/stockpilot-data";

export default function DashboardPage() {
  return (
    <StockPilotShell
      eyebrow="Operations Dashboard"
      title="Coffee inventory command center across stores, suppliers, and replenishment cycles."
      description="Monitor stock health, regional store performance, and replenishment risk across the coffee program from one operating view."
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
            <p className="eyebrow">Executive Snapshot</p>
            <h2>Network summary</h2>
          </div>
          <p className="feature-copy">{aiSummary}</p>
        </div>
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Store Coverage</p>
            <h2>Regional cafe readiness</h2>
          </div>
          <div className="service-list">
            {cafeLocations.map((location) => (
              <div key={location.id} className="service-row">
                <strong>{location.name}</strong>
                <span>
                  {location.region} · {location.manager} · Fill rate {location.fillRate} ·{" "}
                  {location.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Priority Products</p>
            <h2>Low-stock products requiring replenishment</h2>
          </div>
          <div className="recommendations">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="recommendation-row">
                <strong>{product.name}</strong>
                <span>
                  {product.quantity} on hand, reorder threshold {product.reorderPoint}, supplier{" "}
                  {product.supplier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StockPilotShell>
  );
}
