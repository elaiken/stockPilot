import { StockPilotShell } from "../../components/stockpilot-shell";
import { initialProducts, inventoryValue, topSeller, totalReturns } from "../../lib/stockpilot-data";

export default function AnalyticsPage() {
  return (
    <StockPilotShell
      eyebrow="Analytics"
      title="Surface demand patterns, returns, and margin opportunity."
      description="Track which coffee products are moving fastest, which stores are generating waste, and where margin can improve."
    >
      <section className="section">
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
              {totalReturns} tracked returns across {initialProducts.length} products.
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
    </StockPilotShell>
  );
}
