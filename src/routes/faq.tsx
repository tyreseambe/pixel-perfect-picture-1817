import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/faq")({
  head: () => meta("FAQ", "Answers to common questions."),
  component: () => <InfoPage title="FAQ" intro="Answers to common questions."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
