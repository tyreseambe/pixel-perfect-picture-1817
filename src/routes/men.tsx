import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/men")({
  head: () => meta("Men", "Shop Men at VALE WEAR."),
  component: () => <CollectionPage title="Men" items={filterBySection("men")} />,
});
