import { createFileRoute, Outlet } from "@tanstack/react-router";
import { meta } from "@/components/InfoPage";
export const Route = createFileRoute("/account")({
  head: () => meta("Account", "Manage your VALE account."),
  component: () => <Outlet />,
});
