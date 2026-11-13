import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/help")({
  head: () => meta("Customer Support", "Help with orders, shipping, returns and sizing."),
  component: () => <InfoPage title="Customer Support" intro="Help with orders, shipping, returns and sizing."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
