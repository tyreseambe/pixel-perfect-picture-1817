import hoodie from "@/assets/p-hoodie.jpg";
import tee from "@/assets/p-tee.jpg";
import pants from "@/assets/p-pants.jpg";
import jacket from "@/assets/p-jacket.jpg";
import men from "@/assets/men.jpg";
import women from "@/assets/women.jpg";
import hero from "@/assets/hero.jpg";
import campaign from "@/assets/campaign.jpg";

export type Gender = "men" | "women" | "unisex";
export type Product = {
  slug: string;
  name: string;
  category: string;
  gender: Gender;
  collections: string[];
  price: number;
  salePrice?: number;
  colors: { name: string; swatch: string }[];
  sizes: string[];
  soldOut?: string[];
  images: string[];
  label?: "New" | "Limited";
  popularity: number;
  added: number;
  description: string;
  material: string;
};

const BLACK = { name: "Black", swatch: "oklch(0.178 0 0)" };
const BONE = { name: "Bone", swatch: "oklch(0.95 0.01 90)" };
const CHAR = { name: "Charcoal", swatch: "oklch(0.4 0 0)" };
const GREY = { name: "Heather Grey", swatch: "oklch(0.75 0 0)" };
const S = ["XS", "S", "M", "L", "XL"];

// The storefront stays empty until real products are imported and approved.
export const products: Product[] = [];

export const collections = [
  { slug: "essentials", name: "Everyday Essentials", image: hoodie },
  { slug: "men", name: "Men's Collection", image: men },
  { slug: "women", name: "Women's Collection", image: women },
];

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export function filterBySection(section: string) {
  switch (section) {
    case "men": return products.filter((p) => p.gender !== "women");
    case "women": return products.filter((p) => p.gender !== "men");
    case "new": return products.filter((p) => p.collections.includes("new"));
    case "essentials": return products.filter((p) => p.collections.includes("essentials"));
    case "sale": return products.filter((p) => p.salePrice);
    default: return products;
  }
}

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return products.filter((p) =>
    [p.name, p.category, p.gender, ...p.colors.map((c) => c.name)].join(" ").toLowerCase().includes(t),
  );
}
