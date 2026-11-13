import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/sale")({
  head: () => meta("Sale", "Shop Sale at VALE WEAR."),
  component: () => <CollectionPage title="Sale" items={filterBySection("sale")} />,
});
