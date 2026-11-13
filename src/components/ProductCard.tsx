import { Link } from "@tanstack/react-router";
import { formatEUR, type Product } from "@/lib/products";
export function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <Link to="/products/$slug" params={{ slug: p.slug }} className={`group block ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.name} loading="lazy" className={`h-full w-full object-cover transition-opacity duration-500 ${p.images[1] ? "group-hover:opacity-0" : ""}`} />
        {p.images[1] && <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
      </div>
      <div className="pt-3 pb-2">
        {p.label && <p className="text-sm font-medium text-destructive">{p.label}</p>}
        {p.salePrice && !p.label && <p className="text-sm font-medium text-destructive">Sale</p>}
        <p className="font-medium">{p.name}</p>
        <p className="text-muted-foreground">{p.category}</p>
        <p className="text-muted-foreground">{p.colors.length} {p.colors.length === 1 ? "Colour" : "Colours"}</p>
        <p className="mt-1 font-medium">
          {p.salePrice ? (<>{formatEUR(p.salePrice)} <span className="ml-1 font-normal text-muted-foreground line-through">{formatEUR(p.price)}</span></>) : formatEUR(p.price)}
        </p>
      </div>
    </Link>
  );
}
