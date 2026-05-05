import { StockPilotShell } from "../../components/stockpilot-shell";
import { awsServices, lowStockProducts } from "../../lib/stockpilot-data";

export default function OrdersPage() {
  return (
    <StockPilotShell
      eyebrow="Order Form Page"
      title="Prepare supplier-ready reorder drafts from inventory risk."
      description="This route packages the AI reorder outcome into a supplier workflow and keeps the supporting AWS architecture visible during demos."
    >
      <section className="section two-column">
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Supplier Draft</p>
            <h2>AI-generated order form</h2>
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
            <p className="eyebrow">AWS Services</p>
            <h2>Production services this project can use</h2>
          </div>
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
    </StockPilotShell>
  );
}
