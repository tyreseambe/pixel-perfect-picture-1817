import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Questions about an order or product? Reach out and we'll help."),
  component: () => <InfoPage title="Contact" intro="Questions about an order or product? Reach out and we'll help."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
