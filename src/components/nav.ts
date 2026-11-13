export const mainNav = [
  { label: "New Arrivals", to: "/new", sub: [{ label: "All New", to: "/new" }, { label: "Hoodies", to: "/search", q: "hoodie" }, { label: "Jackets", to: "/search", q: "jacket" }] },
  { label: "Men", to: "/men", sub: [{ label: "All Men", to: "/men" }, { label: "T-Shirts", to: "/search", q: "tee" }, { label: "Jackets", to: "/search", q: "jacket" }, { label: "Pants", to: "/search", q: "pant" }] },
  { label: "Women", to: "/women", sub: [{ label: "All Women", to: "/women" }, { label: "Knitwear", to: "/search", q: "knit" }, { label: "Pants", to: "/search", q: "trouser" }] },
  { label: "Collections", to: "/collections", sub: [{ label: "All Collections", to: "/collections" }, { label: "Everyday Essentials", to: "/essentials" }, { label: "New Arrivals", to: "/new" }] },
  { label: "Essentials", to: "/essentials", sub: [{ label: "All Essentials", to: "/essentials" }, { label: "Hoodies", to: "/search", q: "hoodie" }, { label: "T-Shirts", to: "/search", q: "tee" }] },
  { label: "Sale", to: "/sale", sub: [{ label: "All Sale", to: "/sale" }] },
] as const;
