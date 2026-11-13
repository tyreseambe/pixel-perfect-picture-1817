import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { meta } from "@/components/InfoPage";
import { searchProducts } from "@/lib/products";
export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({ q: typeof s.q === "string" ? s.q : undefined }),
  head: () => meta("Search", "Search the VALE catalogue."),
  component: S,
});
function S() {
  const { q = "" } = Route.useSearch();
  return <CollectionPage key={q} title={q ? `Results for "${q}"` : "Search"} items={searchProducts(q)} />;
}
