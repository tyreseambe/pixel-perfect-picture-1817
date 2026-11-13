import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/account")({
  head: () => meta("Account", "Customer accounts are being set up."),
  component: () => <InfoPage title="Account" intro="Customer accounts are being set up."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
