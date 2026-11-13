import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy", "How VALE handles your personal data. Full policy text to be provided."),
  component: () => <InfoPage title="Privacy Policy" intro="How VALE handles your personal data. Full policy text to be provided."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
