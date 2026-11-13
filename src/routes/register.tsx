import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/register")({
  head: () => meta("Join Us", "Registration is being set up."),
  component: () => <InfoPage title="Join Us" intro="Registration is being set up."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
