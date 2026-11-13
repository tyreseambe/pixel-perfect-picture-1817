import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/essentials")({
  head: () => meta("Everyday Essentials", "Shop Everyday Essentials at VALE WEAR."),
  component: () => <CollectionPage title="Everyday Essentials" items={filterBySection("essentials")} />,
});
