import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/imprint")({
  head: () => meta("Imprint", "Legal notice (Impressum). Company details to be provided."),
  component: () => <InfoPage title="Imprint" intro="Legal notice (Impressum). Company details to be provided."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
