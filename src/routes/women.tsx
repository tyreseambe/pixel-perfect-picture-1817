import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/women")({
  head: () => meta("Women", "Shop Women at VALE WEAR."),
  component: () => <CollectionPage title="Women" items={filterBySection("women")} />,
});
