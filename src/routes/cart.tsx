import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { meta } from "@/components/InfoPage";
import { shippingFor, useCart } from "@/lib/cart";
import { formatEUR, getProduct } from "@/lib/products";
export const Route = createFileRoute("/cart")({ head: () => meta("Bag", "Your VALE shopping bag."), component: Cart });
function Cart() {
  const { lines, setQty, remove, subtotal } = useCart();
  const ship = shippingFor(subtotal);
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-6 text-2xl font-medium">Bag</h1>
        {lines.length === 0 && <p className="text-muted-foreground">Your bag is empty. <Link to="/new" className="underline">Shop new arrivals</Link></p>}
        <ul className="divide-y divide-border">
          {lines.map((l, i) => { const p = getProduct(l.slug); if (!p) return null; return (
            <li key={i} className="flex gap-4 py-5">
              <img src={p.images[0]} alt={p.name} className="h-32 w-28 bg-muted object-cover" />
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{l.color} · Size {l.size}</p>
                <div className="mt-3 flex items-center gap-3">
                  <button aria-label="Decrease" onClick={() => setQty(i, l.qty - 1)}><Minus className="h-4 w-4" /></button>
                  <span>{l.qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(i, l.qty + 1)}><Plus className="h-4 w-4" /></button>
                  <button aria-label="Remove" className="ml-4" onClick={() => remove(i)}><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="font-medium">{formatEUR((p.salePrice ?? p.price) * l.qty)}</p>
            </li>); })}
        </ul>
      </div>
      <aside className="space-y-3">
        <h2 className="text-2xl font-medium">Summary</h2>
        <div className="flex justify-between"><span>Subtotal</span><span>{formatEUR(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{ship ? formatEUR(ship) : "Free"}</span></div>
        <div className="flex justify-between border-y border-border py-4 font-medium"><span>Total</span><span>{formatEUR(subtotal + ship)}</span></div>
        {lines.length > 0 && <Link to="/checkout" className="pill w-full bg-primary text-primary-foreground">Checkout</Link>}
      </aside>
    </div>
  );
}
