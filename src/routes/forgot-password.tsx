import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/forgot-password")({
  head: () => meta("Reset Password", "Password reset becomes available once accounts are live."),
  component: () => <InfoPage title="Reset Password" intro="Password reset becomes available once accounts are live."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
