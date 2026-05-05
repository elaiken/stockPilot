import { StockPilotShell } from "../../components/stockpilot-shell";
import { aiSummary, lowStockProducts } from "../../lib/stockpilot-data";

export default function ReportsPage() {
  return (
    <StockPilotShell
      eyebrow="AI Report Page"
      title="Translate inventory state into natural-language business guidance."
      description="This route shows how StockPilot converts stock levels and velocity into a readable operating summary and reorder recommendations."
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
