import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
export const Route = createFileRoute("/cookies")({
  head: () => meta("Cookies", "This site only stores your bag and wishlist on your device."),
  component: () => <InfoPage title="Cookies" intro="This site only stores your bag and wishlist on your device."><Link to="/new" className="pill bg-primary text-primary-foreground">Continue shopping</Link></InfoPage>,
});
