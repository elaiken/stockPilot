import { StockPilotInventoryManager } from "../../components/stockpilot-inventory-manager";
import { StockPilotShell } from "../../components/stockpilot-shell";

export default function InventoryPage() {
  return (
    <StockPilotShell
      eyebrow="Inventory Page"
      title="Manage product records, thresholds, and operational stock changes."
      description="This route focuses on the most hands-on workflow in the MVP: adding products, adjusting quantities, and tracking supplier-linked inventory risk."
    >
      <StockPilotInventoryManager />
    </StockPilotShell>
  );
}
