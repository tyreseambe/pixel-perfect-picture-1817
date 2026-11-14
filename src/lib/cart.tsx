import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export type CartLine = { slug: string; color: string; size: string; qty: number };
type Store = {
  lines: CartLine[];
  wishlist: string[];
  add: (l: Omit<CartLine, "qty">) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
  toggleWish: (slug: string) => void;
  count: number;
  subtotal: number;
};
const Ctx = createContext<Store | null>(null);

export const SHIPPING_FREE_FROM = 100;
export const SHIPPING_FLAT = 4.95;
export const shippingFor = (subtotal: number) => (subtotal === 0 || subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FLAT);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const savedLines: unknown = JSON.parse(localStorage.getItem("vale-bag") || "[]");
      const savedWish: unknown = JSON.parse(localStorage.getItem("vale-wish") || "[]");
      if (Array.isArray(savedLines)) setLines(savedLines.filter((line) => line && typeof line.slug === "string" && getProduct(line.slug) && Number.isInteger(line.qty) && line.qty > 0));
      if (Array.isArray(savedWish)) setWish(savedWish.filter((slug) => typeof slug === "string" && getProduct(slug)));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("vale-bag", JSON.stringify(lines)); }, [lines, ready]);
  useEffect(() => { if (ready) localStorage.setItem("vale-wish", JSON.stringify(wishlist)); }, [wishlist, ready]);

  const add: Store["add"] = (l) => {
    const product = getProduct(l.slug);
    if (!product || !product.sizes.includes(l.size) || product.soldOut?.includes(l.size) || !product.colors.some((c) => c.name === l.color)) return;
    setLines((cur) => {
      const i = cur.findIndex((c) => c.slug === l.slug && c.color === l.color && c.size === l.size);
      if (i >= 0) return cur.map((c, j) => (j === i ? { ...c, qty: Math.min(10, c.qty + 1) } : c));
      return [...cur, { ...l, qty: 1 }];
    });
  };
  const setQty = (i: number, qty: number) =>
    setLines((cur) => cur.map((c, j) => (j === i ? { ...c, qty: Math.max(1, Math.min(10, qty)) } : c)));
  const remove = (i: number) => setLines((cur) => cur.filter((_, j) => j !== i));
  const toggleWish = (slug: string) =>
    setWish((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => {
    const p = getProduct(l.slug);
    return a + (p ? (p.salePrice ?? p.price) * l.qty : 0);
  }, 0);
  return <Ctx.Provider value={{ lines, wishlist, add, setQty, remove, toggleWish, count, subtotal }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
