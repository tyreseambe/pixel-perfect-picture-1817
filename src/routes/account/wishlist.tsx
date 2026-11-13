import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
export const Route = createFileRoute("/account/wishlist")({ head: () => meta("Wishlist", "Your saved VALE pieces."), component: W });
function W() {
  const { wishlist } = useCart();
  const items = wishlist.map(getProduct).filter((p) => !!p);
  return <InfoPage title="Wishlist" intro={items.length ? undefined : "Nothing saved yet."}><div className="grid grid-cols-2 gap-3">{items.map((p) => <ProductCard key={p.slug} p={p} />)}</div></InfoPage>;
}
