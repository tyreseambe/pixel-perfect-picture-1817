import { Link } from "@tanstack/react-router";
const cols = [
  { title: "Shop", links: [["New Arrivals", "/new"], ["Men", "/men"], ["Women", "/women"], ["Essentials", "/essentials"], ["Sale", "/sale"]] },
  { title: "Help", links: [["Customer Support", "/help"], ["FAQ", "/faq"], ["Shipping", "/shipping"], ["Returns", "/returns"], ["Size Guide", "/size-guide"], ["Contact", "/contact"]] },
  { title: "VALE", links: [["Our Story", "/about"], ["Membership", "/membership"], ["Account", "/account"]] },
  { title: "Legal", links: [["Imprint", "/imprint"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookies", "/cookies"]] },
] as const;
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-10 px-5 py-14 md:grid-cols-4 md:px-10">
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 text-sm font-semibold">{c.title}</h3>
            <ul className="space-y-3">
              {c.links.map(([l, to]) => <li key={to}><Link to={to} className="text-sm text-muted-foreground hover:text-foreground">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1800px] flex-col gap-3 border-t border-border px-5 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} VALE WEAR · vale-wear.com · Germany</span>
        <span>Payment: Card · Apple Pay · Google Pay · PayPal</span>
      </div>
    </footer>
  );
}
