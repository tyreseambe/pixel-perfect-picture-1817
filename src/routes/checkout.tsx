import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/checkout")({
  head: () => meta("Checkout", "VALE checkout availability."),
  component: () => <InfoPage title="Checkout" intro="The store is not accepting orders yet. Payments will become available when the collection launches."><Link to="/cart" className="pill bg-primary text-primary-foreground">Back to bag</Link></InfoPage>,
});
