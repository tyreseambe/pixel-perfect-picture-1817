import { createFileRoute } from "@tanstack/react-router";
import { meta } from "@/components/InfoPage";
import { AdminPanel } from "@/components/AdminPanel";
export const Route = createFileRoute("/admin")({
  head: () => meta("Store Management", "VALE store administration."),
  component: AdminPanel,
});
