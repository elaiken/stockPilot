import { StockPilotShell } from "../../components/stockpilot-shell";
import { lowStockProducts, supplierStatuses } from "../../lib/stockpilot-data";

export default function OrdersPage() {
  return (
    <StockPilotShell
      eyebrow="Order Center"
      title="Prepare supplier-ready replenishment drafts from live inventory pressure."
      description="Coordinate purchase requests, vendor confirmations, and inbound timing for the next coffee replenishment cycle."
    >
      <section className="section two-column">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Supplier Draft</p>
            <h2>Recommended purchase orders</h2>
          </div>
          <div className="order-draft">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="order-row">
                <strong>{product.supplier}</strong>
                <span>
                  {product.name}: order {product.reorderPoint * 2 - product.quantity} units
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Inbound Status</p>
            <h2>Supplier and freight updates</h2>
          </div>
          <div className="service-list">
            {supplierStatuses.map((supplier) => (
              <div key={supplier.id} className="service-row">
                <strong>{supplier.supplier}</strong>
                <span>
                  ETA {supplier.eta} · {supplier.lane} · {supplier.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StockPilotShell>
  );
}
