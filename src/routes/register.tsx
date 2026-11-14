import { createFileRoute } from "@tanstack/react-router";
import { meta } from "@/components/InfoPage";
import { AuthForm } from "@/components/AuthForm";
export const Route = createFileRoute("/register")({
  head: () => meta("Join Us", "Create your VALE customer account."),
  component: () => <AuthForm mode="register" />,
});
