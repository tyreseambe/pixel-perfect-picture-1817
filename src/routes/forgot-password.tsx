import { createFileRoute } from "@tanstack/react-router";
import { meta } from "@/components/InfoPage";
import { AuthForm } from "@/components/AuthForm";
export const Route = createFileRoute("/forgot-password")({
  head: () => meta("Reset Password", "Recover access to your VALE account."),
  component: () => <AuthForm mode="forgot" />,
});
