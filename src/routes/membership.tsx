import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/membership")({
  head: () => meta("VALE Membership", "Members get a saved wishlist, order history and early-access eligibility for future collections."),
  component: () => <InfoPage title="VALE Membership" intro="Members get a saved wishlist, order history and early-access eligibility for future collections."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
