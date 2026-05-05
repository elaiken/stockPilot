import { StockPilotShell } from "../../components/stockpilot-shell";
import { uploadHistory } from "../../lib/stockpilot-data";

export default function UploadsPage() {
  return (
    <StockPilotShell
      eyebrow="Upload Center"
      title="Ingest store counts, invoices, shelf audits, and receiving records."
      description="Centralize coffee inventory files from stores and suppliers so operators can reconcile counts and track inbound product faster."
    >
      <section className="section two-column">
        <div className="card upload-dropzone">
          <p>Drop PDF, CSV, image, or receipt here</p>
          <small>S3 + Lambda + Textract would power this flow in production.</small>
        </div>
        <div className="card">
          <div className="section-heading">
            <p className="eyebrow">Recent Activity</p>
            <h2>Upload processing queue</h2>
          </div>
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
    </StockPilotShell>
  );
}
