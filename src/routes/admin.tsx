import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/admin")({
  head: () => meta("Admin", "The store dashboard is being set up."),
  component: () => <InfoPage title="Admin" intro="The store dashboard is being set up."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
