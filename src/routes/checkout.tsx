import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/checkout")({
  head: () => meta("Checkout", "Secure payment is being set up. Your bag is saved in the meantime."),
  component: () => <InfoPage title="Checkout" intro="Secure payment is being set up. Your bag is saved in the meantime."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
