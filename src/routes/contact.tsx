import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
import { ContactForm } from "@/components/ContactForm";
export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Questions about an order or product? Reach out and we'll help."),
  component: () => <InfoPage title="Contact" intro="Questions about an order or product? Reach out and we'll help."><ContactForm /></InfoPage>,
});
