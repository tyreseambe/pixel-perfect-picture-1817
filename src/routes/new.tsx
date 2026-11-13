import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { filterBySection } from "@/lib/products";
export const Route = createFileRoute("/new")({
  head: () => meta("New Arrivals", "Shop New Arrivals at VALE WEAR."),
  component: () => <CollectionPage title="New Arrivals" items={filterBySection("new")} />,
});
