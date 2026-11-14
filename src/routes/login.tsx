import { createFileRoute } from "@tanstack/react-router";
import { meta } from "@/components/InfoPage";
import { AuthForm } from "@/components/AuthForm";
export const Route = createFileRoute("/login")({
  head: () => meta("Sign In", "Sign in to your VALE account."),
  component: () => <AuthForm mode="login" />,
});
