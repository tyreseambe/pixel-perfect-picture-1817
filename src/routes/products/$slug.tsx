import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatEUR, getProduct, products } from "@/lib/products";
export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => { const p = getProduct(params.slug); if (!p) throw notFound(); return { name: p.name, description: p.description }; },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.name} — VALE` }, { name: "description", content: loaderData.description },
    { property: "og:title", content: `${loaderData.name} — VALE` }, { property: "og:description", content: loaderData.description },
    { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" },
  ] : [{ title: "Unavailable — VALE" }, { name: "robots", content: "noindex" }] }),
  component: PDP,
});
function PDP() {
  const { slug } = Route.useParams();
  const p = getProduct(slug);
  if (!p) throw notFound();
  const { add, wishlist, toggleWish } = useCart();
  const [color, setColor] = useState(p.colors[0]?.name ?? "");
  const [size, setSize] = useState<string>();
  const [msg, setMsg] = useState("");
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.slug !== p.slug)).slice(0, 4);
  return (
    <div className="mx-auto max-w-[1400px] md:px-10 md:py-10">
      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        <div className="flex snap-x overflow-x-auto no-scrollbar md:grid md:grid-cols-2 md:gap-2">
          {p.images.map((src, i) => <img key={i} src={src} alt={`${p.name} view ${i + 1}`} className="aspect-[4/5] w-full shrink-0 snap-start bg-muted object-cover" />)}
        </div>
        <div className="px-5 md:px-0">
          <h1 className="text-2xl font-medium">{p.name}</h1>
          <p className="text-muted-foreground">{p.category}</p>
          <p className="mt-3 text-lg font-medium">{p.salePrice ? <>{formatEUR(p.salePrice)} <span className="text-muted-foreground line-through">{formatEUR(p.price)}</span></> : formatEUR(p.price)}</p>
          <p className="mt-6 font-medium">Colour: {color}</p>
          <div className="mt-2 flex gap-2">{p.colors.map((c) => <button key={c.name} aria-label={c.name} onClick={() => setColor(c.name)} style={{ background: c.swatch }} className={`h-10 w-10 rounded-full border-2 ${color === c.name ? "border-foreground" : "border-border"}`} />)}</div>
          <div className="mt-6 flex justify-between"><p className="font-medium">Select size</p><Link to="/size-guide" className="text-muted-foreground underline">Size guide</Link></div>
          <div className="mt-2 grid grid-cols-3 gap-2">{p.sizes.map((s) => { const out = p.soldOut?.includes(s); return <button key={s} disabled={out} onClick={() => setSize(s)} className={`h-12 rounded border ${size === s ? "border-foreground" : "border-input"} disabled:text-muted-foreground disabled:line-through`}>{s}</button>; })}</div>
          <button onClick={() => { if (!size) return setMsg("Please select a size."); add({ slug: p.slug, color, size }); setMsg("Added to bag."); }} className="pill mt-6 h-14 w-full bg-primary text-primary-foreground">Add to Bag</button>
          <button onClick={() => toggleWish(p.slug)} className="pill mt-3 h-14 w-full gap-2 border border-input"><Heart className="h-5 w-5" fill={wishlist.includes(p.slug) ? "currentColor" : "none"} strokeWidth={1.5} />Favourite</button>
          {msg && <p role="status" className="mt-3 text-sm">{msg} {msg.startsWith("Added") && <Link to="/cart" className="underline">View bag</Link>}</p>}
          <p className="mt-8 leading-relaxed">{p.description}</p>
          <details className="mt-6 border-t border-border py-4"><summary className="cursor-pointer font-medium">Material & care</summary><p className="mt-3 text-muted-foreground">{p.material}</p></details>
          <details className="border-t border-border py-4"><summary className="cursor-pointer font-medium">Shipping & returns</summary><p className="mt-3 text-muted-foreground">Free shipping over €100. 14-day withdrawal. <Link to="/returns" className="underline">Details</Link></p></details>
        </div>
      </div>
      <h2 className="headline mt-20 px-5 text-3xl md:px-0">You might also like</h2>
      <div className="mt-6 grid grid-cols-2 gap-2 px-5 md:grid-cols-4 md:px-0">{related.map((x) => <ProductCard key={x.slug} p={x} />)}</div>
    </div>
  );
}
