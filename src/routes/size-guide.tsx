import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/size-guide")({
  head: () => meta("Size Guide", "Our pieces are cut relaxed. If between sizes, size down for a closer fit."),
  component: () => <InfoPage title="Size Guide" intro="Our pieces are cut relaxed. If between sizes, size down for a closer fit."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
