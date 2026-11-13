import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/about")({
  head: () => meta("Our Story", "VALE makes considered everyday clothing. Our full story is coming soon."),
  component: () => <InfoPage title="Our Story" intro="VALE makes considered everyday clothing. Our full story is coming soon."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
