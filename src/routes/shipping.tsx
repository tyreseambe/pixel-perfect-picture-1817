import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/shipping")({
  head: () => meta("Shipping", "Shipping is free on orders over €100; otherwise a flat €4.95 applies."),
  component: () => <InfoPage title="Shipping" intro="Shipping is free on orders over €100; otherwise a flat €4.95 applies."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
