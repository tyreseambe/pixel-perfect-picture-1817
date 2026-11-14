import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type Sort = "newest" | "price-asc" | "price-desc" | "popular";
const PAGE = 12;

export function CollectionPage({ title, items }: { title: string; items: Product[] }) {
  const [sort, setSort] = useState<Sort>("newest");
  const [cats, setCats] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [inStock, setInStock] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const allCats = [...new Set(items.map((p) => p.category))];
  const allSizes = ["XS", "S", "M", "L", "XL"];
  const allColors = [...new Set(items.flatMap((p) => p.colors.map((c) => c.name)))];
  const price = (p: Product) => p.salePrice ?? p.price;

  const list = useMemo(() => {
    const r = items.filter((p) =>
      (!cats.length || cats.includes(p.category)) &&
      (!sizes.length || sizes.some((s) => p.sizes.includes(s) && !p.soldOut?.includes(s))) &&
      (!colors.length || p.colors.some((c) => colors.includes(c.name))) &&
      price(p) <= maxPrice &&
      (!inStock || p.sizes.some((s) => !p.soldOut?.includes(s))),
    );
    const sorters: Record<Sort, (a: Product, b: Product) => number> = {
      newest: (a, b) => b.added - a.added,
      "price-asc": (a, b) => price(a) - price(b),
      "price-desc": (a, b) => price(b) - price(a),
      popular: (a, b) => b.popularity - a.popularity,
    };
    return r.sort(sorters[sort]);
  }, [items, cats, sizes, colors, maxPrice, inStock, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filters = (
    <div className="space-y-8">
      <Group title="Category">{allCats.map((c) => <Check key={c} label={c} on={cats.includes(c)} onChange={() => toggle(cats, setCats, c)} />)}</Group>
      <Group title="Size">
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((s) => <button key={s} onClick={() => toggle(sizes, setSizes, s)} className={`h-10 rounded border text-sm ${sizes.includes(s) ? "border-foreground" : "border-input"}`}>{s}</button>)}
        </div>
      </Group>
      <Group title="Colour">{allColors.map((c) => <Check key={c} label={c} on={colors.includes(c)} onChange={() => toggle(colors, setColors, c)} />)}</Group>
      <Group title={`Max price: €${maxPrice}`}>
        <input type="range" min={30} max={300} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-current" aria-label="Maximum price" />
      </Group>
      <Group title="Availability"><Check label="In stock only" on={inStock} onChange={() => setInStock(!inStock)} /></Group>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1800px] px-5 md:px-10">
      <div className="sticky top-16 z-20 flex items-center justify-between bg-background py-5">
        <h1 className="text-2xl font-medium">{title} <span className="text-muted-foreground">({list.length})</span></h1>
        {items.length > 0 && <div className="flex items-center gap-4">
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2 font-medium lg:hidden">Filter <SlidersHorizontal className="h-5 w-5" strokeWidth={1.5} /></button>
          <label className="flex items-center gap-2 font-medium">
            <span className="hidden sm:inline">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent font-medium outline-none" aria-label="Sort products">
              <option value="newest">Newest</option><option value="popular">Popular</option>
              <option value="price-asc">Price: Low–High</option><option value="price-desc">Price: High–Low</option>
            </select>
          </label>
        </div>}
      </div>
      <div className="flex gap-10">
        {items.length > 0 && <aside className="hidden w-56 shrink-0 lg:block">{filters}</aside>}
        <div className="flex-1">
          {list.length === 0 ? <div className="py-20 text-center"><h2 className="text-xl font-medium">{items.length ? "No products match these filters." : "The next collection is on its way."}</h2><p className="mt-3 text-muted-foreground">{items.length ? "Try changing your filters." : "No pieces are available yet."}</p></div> : (
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-4">
              {list.slice(0, shown).map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
          {shown < list.length && <div className="mt-10 text-center"><button onClick={() => setShown(shown + PAGE)} className="pill border border-input">Load more</button></div>}
        </div>
      </div>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-overlay" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-medium">Filter</h2><button aria-label="Close filters" onClick={() => setDrawer(false)}><X className="h-6 w-6" strokeWidth={1.5} /></button></div>
            {filters}
            <button onClick={() => setDrawer(false)} className="pill mt-8 w-full bg-primary text-primary-foreground">Show {list.length} results</button>
          </div>
        </div>
      )}
    </div>
  );
}
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="mb-3 font-medium">{title}</h3><div className="space-y-2">{children}</div></div>;
}
function Check({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={on} onChange={onChange} className="h-4 w-4 accent-current" />{label}</label>;
}
