import { StockPilotInventoryManager } from "../../components/stockpilot-inventory-manager";
import { StockPilotShell } from "../../components/stockpilot-shell";

export default function InventoryPage() {
  return (
    <StockPilotShell
      eyebrow="Inventory"
      title="Manage coffee products, reorder thresholds, and stock movement."
      description="Keep store and warehouse counts current across beans, bottled drinks, cups, and syrups with fast operational updates."
    >
      <StockPilotInventoryManager />
    </StockPilotShell>
  );
}
