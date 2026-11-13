import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { SubLink } from "./SubLink";
import { mainNav } from "./nav";
import { useCart } from "@/lib/cart";
import { formatEUR, searchProducts } from "@/lib/products";

const messages = ["Discover the new collection", "Complimentary shipping on orders over €100", "Join the VALE community"];

function useLockScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = o; };
  }, [lock]);
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [msg, setMsg] = useState(0);
  const { count } = useCart();
  useEffect(() => { const t = setInterval(() => setMsg((m) => (m + 1) % messages.length), 4500); return () => clearInterval(t); }, []);
  const iconBtn = "grid h-11 w-11 place-items-center rounded-full hover:bg-muted transition-colors";
  return (
    <>
      <div className="bg-muted py-2 text-center text-xs font-medium uppercase tracking-wide">{messages[msg]}</div>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 md:px-10">
          <Logo className="h-8 md:h-9" />
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((n) => (
              <div key={n.label} className="group relative">
                <Link to={n.to} className="block px-3 py-5 text-[15px] font-medium hover:underline underline-offset-8" activeProps={{ className: "underline" }}>{n.label}</Link>
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 border border-border bg-background p-5 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="space-y-2">
                    {n.sub.map((s) => (
                      <li key={s.label}>
                        <SubLink s={s} className="text-sm text-muted-foreground hover:text-foreground" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
          <div className="flex items-center -mr-2">
            <button aria-label="Search" className={iconBtn} onClick={() => setSearch(true)}><Search className="h-6 w-6" strokeWidth={1.5} /></button>
            <Link to="/account" aria-label="Account" className={iconBtn}><User className="h-6 w-6" strokeWidth={1.5} /></Link>
            <Link to="/account/wishlist" aria-label="Wishlist" className={`${iconBtn} hidden lg:grid`}><Heart className="h-6 w-6" strokeWidth={1.5} /></Link>
            <Link to="/cart" aria-label={`Bag, ${count} items`} className={`${iconBtn} relative`}>
              <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
              {count > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{count}</span>}
            </Link>
            <button aria-label="Open menu" className={`${iconBtn} lg:hidden`} onClick={() => setMenu(true)}><Menu className="h-6 w-6" strokeWidth={1.5} /></button>
          </div>
        </div>
      </header>
      <MobileDrawer open={menu} onClose={() => setMenu(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [panel, setPanel] = useState<number | null>(null);
  useLockScroll(open);
  useEffect(() => {
    if (!open) { const t = setTimeout(() => setPanel(null), 300); return () => clearTimeout(t); }
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  const sub = panel !== null ? mainNav[panel] : null;
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-overlay transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-label="Menu" className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-hidden bg-background transition-transform duration-300 ease-drawer ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          {sub ? <button onClick={() => setPanel(null)} className="-ml-2 flex items-center gap-1 py-2 text-base font-medium"><ChevronLeft className="h-6 w-6" strokeWidth={1.5} />All</button> : <span />}
          <button aria-label="Close menu" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center rounded-full hover:bg-muted"><X className="h-7 w-7" strokeWidth={1.5} /></button>
        </div>
        <div className="relative flex-1">
          <div className={`absolute inset-0 overflow-y-auto px-8 pb-10 transition-transform duration-300 ease-drawer ${sub ? "-translate-x-full" : ""}`}>
            <ul className="mt-4 space-y-1">
              {mainNav.map((n, i) => (
                <li key={n.label}>
                  <button onClick={() => setPanel(i)} className="flex w-full items-center justify-between py-2.5 text-2xl font-medium">
                    {n.label}<ChevronRight className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
            <ul className="mt-12 space-y-5 text-base font-medium">
              <li><Link to="/membership" onClick={onClose}>VALE Membership</Link></li>
              <li><Link to="/about" onClick={onClose}>Our Story</Link></li>
              <li><Link to="/help" onClick={onClose}>Customer Support</Link></li>
            </ul>
            <p className="mt-12 text-xl leading-snug text-muted-foreground">
              Become a VALE Member for early access to future collections and a saved wishlist. <Link to="/membership" onClick={onClose} className="font-medium text-foreground">Learn more</Link>
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/register" onClick={onClose} className="pill bg-primary text-primary-foreground">Join Us</Link>
              <Link to="/login" onClick={onClose} className="pill border border-input">Sign In</Link>
            </div>
          </div>
          <div className={`absolute inset-0 overflow-y-auto px-8 pb-10 transition-transform duration-300 ease-drawer ${sub ? "translate-x-0" : "translate-x-full"}`}>
            {sub && (
              <>
                <h2 className="mt-4 mb-6 text-2xl font-medium">{sub.label}</h2>
                <ul className="space-y-4">
                  {sub.sub.map((s) => (
                    <li key={s.label}><SubLink s={s} onClick={onClose} className="text-lg text-muted-foreground hover:text-foreground" /></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useLockScroll(open);
  const results = searchProducts(q).slice(0, 6);
  useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current?.focus(), 50);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  const go = (slug?: string) => {
    onClose();
    if (slug) navigate({ to: "/products/$slug", params: { slug } });
    else navigate({ to: "/search", search: { q } });
  };
  return (
    <div className="fixed inset-0 z-50 bg-overlay" onClick={onClose}>
      <div className="bg-background px-5 pb-8 pt-4 md:px-10" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-full bg-muted px-4">
            <Search className="h-5 w-5" strokeWidth={1.5} />
            <input
              ref={ref} value={q} placeholder="Search" aria-label="Search products"
              onChange={(e) => { setQ(e.target.value); setActive(0); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
                if (e.key === "Enter") go(results[active]?.slug);
              }}
              className="h-12 flex-1 bg-transparent text-base outline-none"
            />
          </div>
          <button onClick={onClose} className="px-2 py-2 font-medium">Cancel</button>
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          {q && results.length === 0 && <p className="text-muted-foreground">No products match "{q}".</p>}
          {!q && <p className="text-sm text-muted-foreground">Try "hoodie", "black" or "knit".</p>}
          <ul>
            {results.map((p, i) => (
              <li key={p.slug}>
                <button onMouseEnter={() => setActive(i)} onClick={() => go(p.slug)} className={`flex w-full items-center gap-4 p-2 text-left ${i === active ? "bg-muted" : ""}`}>
                  <img src={p.images[0]} alt="" className="h-16 w-14 bg-muted object-cover" />
                  <span className="flex-1"><span className="block font-medium">{p.name}</span><span className="text-sm text-muted-foreground">{p.category}</span></span>
                  <span className="text-sm">{formatEUR(p.salePrice ?? p.price)}</span>
                </button>
              </li>
            ))}
          </ul>
          {results.length > 0 && <button onClick={() => go()} className="mt-4 text-sm font-medium underline">See all results</button>}
        </div>
      </div>
    </div>
  );
}
