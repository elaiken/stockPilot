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

function getStatusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("watch") || normalized.includes("risk")) {
    return "badge-warn";
  }
  return "badge-ok";
}

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
            <span>KPI · Active products</span>
            <strong>{initialProducts.length}</strong>
            <small>{totalUnits} units across stores and reserve stock</small>
          </article>
          <article className="stat-card card warn">
            <span>KPI · Low-stock alerts</span>
            <strong>{lowStockProducts.length}</strong>
            <small>Items at or below replenishment threshold</small>
          </article>
          <article className="stat-card card">
            <span>KPI · Inventory value</span>
            <strong>${inventoryValue.toLocaleString()}</strong>
            <small>Estimated on-hand retail replacement value</small>
          </article>
          <article className="stat-card card accent">
            <span>KPI · Fastest mover</span>
            <strong>{topSeller.name}</strong>
            <small>{topSeller.velocity} units sold this month</small>
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
          <table className="inventory-table compact-table">
            <thead>
              <tr>
                <th>Store</th>
                <th>Manager</th>
                <th>Fill rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cafeLocations.map((location) => (
                <tr key={location.id}>
                  <td>
                    <strong>{location.name}</strong>
                    <span>{location.region}</span>
                  </td>
                  <td>{location.manager}</td>
                  <td>{location.fillRate}</td>
                  <td>
                    <span className={`badge ${getStatusTone(location.status)}`}>{location.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Priority Products</p>
            <h2>Low-stock products requiring replenishment</h2>
          </div>
          <table className="inventory-table compact-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>On hand</th>
                <th>Threshold</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <span>{product.sku}</span>
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.reorderPoint}</td>
                  <td>{product.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Action Queue</p>
            <h2>Recommended next steps</h2>
          </div>
          <div className="recommendations">
            <div className="recommendation-row">
              <strong>Approve BluePort replenishment</strong>
              <span>Espresso Beans 2lb should be released before Thursday cutoff.</span>
            </div>
            <div className="recommendation-row">
              <strong>Redistribute thermal cups</strong>
              <span>Move reserve cartons from Seattle to Chicago to protect weekend demand.</span>
            </div>
            <div className="recommendation-row">
              <strong>Audit bottled cold brew counts</strong>
              <span>River North has the highest weekly variance against submitted shelf audits.</span>
            </div>
          </div>
        </div>
      </section>
    </StockPilotShell>
  );
}
