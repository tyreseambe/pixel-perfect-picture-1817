import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/terms")({
  head: () => meta("Terms", "Terms and conditions of sale. Full text to be provided."),
  component: () => <InfoPage title="Terms" intro="Terms and conditions of sale. Full text to be provided."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
