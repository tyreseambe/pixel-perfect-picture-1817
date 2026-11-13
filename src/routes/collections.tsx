import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/collections")({
  head: () => meta("All Collections", "Shop All Collections at VALE WEAR."),
  component: () => <CollectionPage title="All Collections" items={filterBySection("collections")} />,
});
