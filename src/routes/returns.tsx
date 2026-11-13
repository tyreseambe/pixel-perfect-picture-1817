import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/returns")({
  head: () => meta("Returns", "You may withdraw from your purchase within 14 days of delivery."),
  component: () => <InfoPage title="Returns" intro="You may withdraw from your purchase within 14 days of delivery."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
