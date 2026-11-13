import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/login")({
  head: () => meta("Sign In", "Customer sign-in is being set up."),
  component: () => <InfoPage title="Sign In" intro="Customer sign-in is being set up."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
