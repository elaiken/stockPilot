import { StockPilotShell } from "../../components/stockpilot-shell";
import { aiSummary, lowStockProducts } from "../../lib/stockpilot-data";

export default function ReportsPage() {
  return (
    <StockPilotShell
      eyebrow="AI Report"
      title="Translate inventory signals into clear operating guidance."
      description="Generate concise replenishment and product-mix recommendations from current stock pressure and sales velocity."
    >
      <section className="section two-column">
        <div className="card report-card">
          <div className="section-heading">
            <p className="eyebrow">Natural Language Summary</p>
            <h2>AI report snapshot</h2>
          </div>
          <p>{aiSummary}</p>
        </div>
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Recommended Actions</p>
            <h2>Reorder suggestions</h2>
          </div>
          <div className="recommendations">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="recommendation-row">
                <strong>{product.name}</strong>
                <span>Suggested reorder: {product.reorderPoint * 2 - product.quantity} units</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StockPilotShell>
  );
}
