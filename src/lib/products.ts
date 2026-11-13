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

export const products: Product[] = [
  { slug: "heavyweight-hoodie", name: "Heavyweight Hoodie", category: "Hoodies", gender: "unisex", collections: ["essentials", "new"], price: 89, colors: [BLACK, CHAR], sizes: S, images: [hoodie, hero], label: "New", popularity: 98, added: 20, description: "A dense brushed-back fleece hoodie with a relaxed, dropped-shoulder fit and a structured double-layer hood.", material: "Cotton fleece. Machine wash cold, inside out. Do not tumble dry." },
  { slug: "boxy-tee", name: "Boxy Tee", category: "T-Shirts", gender: "unisex", collections: ["essentials", "new"], price: 39, colors: [BONE, BLACK, GREY], sizes: S, images: [tee], label: "New", popularity: 95, added: 19, description: "A heavyweight jersey tee cut wide through the body with a tight ribbed neckline.", material: "Cotton jersey. Machine wash cold. Dry flat." },
  { slug: "wide-leg-sweatpant", name: "Wide-Leg Sweatpant", category: "Pants", gender: "unisex", collections: ["essentials"], price: 79, colors: [CHAR, BLACK], sizes: S, soldOut: ["XS"], images: [pants], popularity: 90, added: 15, description: "A relaxed fleece sweatpant with a straight wide leg and an elasticated waistband.", material: "Cotton fleece. Machine wash cold, inside out." },
  { slug: "padded-bomber", name: "Padded Bomber", category: "Jackets", gender: "men", collections: ["new"], price: 189, colors: [BLACK], sizes: ["S", "M", "L", "XL"], images: [jacket, men], label: "Limited", popularity: 88, added: 18, description: "A lightly padded bomber with ribbed trims, a two-way zip and clean welt pockets.", material: "Shell: polyamide. Machine wash cold, gentle cycle." },
  { slug: "core-bomber-set", name: "Core Bomber Look", category: "Jackets", gender: "men", collections: [], price: 169, salePrice: 129, colors: [BLACK], sizes: ["S", "M", "L", "XL"], images: [men, jacket], popularity: 70, added: 8, description: "The unlined version of our bomber, cut slightly closer for everyday layering.", material: "Cotton blend. Machine wash cold." },
  { slug: "oversized-knit", name: "Oversized Knit", category: "Knitwear", gender: "women", collections: ["new"], price: 129, colors: [BONE], sizes: S, images: [women], label: "New", popularity: 92, added: 17, description: "A chunky crew-neck knit with dropped shoulders and deep ribbed cuffs.", material: "Wool blend. Hand wash cold. Dry flat." },
  { slug: "pleated-trouser", name: "Pleated Wide Trouser", category: "Pants", gender: "women", collections: [], price: 119, salePrice: 89, colors: [BLACK], sizes: S, images: [women], popularity: 75, added: 10, description: "A high-rise trouser with front pleats and a long, fluid wide leg.", material: "Polyester blend. Machine wash cold, gentle cycle." },
  { slug: "long-coat", name: "Long Overcoat", category: "Coats", gender: "unisex", collections: ["new"], price: 249, colors: [BONE, BLACK], sizes: ["S", "M", "L"], images: [campaign], label: "Limited", popularity: 84, added: 16, description: "An unstructured longline coat with a relaxed shoulder and patch pockets.", material: "Wool blend. Dry clean only." },
];

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
