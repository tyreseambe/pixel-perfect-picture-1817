import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/vale-home.png.asset.json";
import campaign from "@/assets/campaign.jpg";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VALE WEAR — The Next Chapter" },
      { name: "description", content: "Introducing VALE. Premium streetwear and everyday essentials, designed for the everyday and made to stand apart." },
      { property: "og:title", content: "VALE WEAR — The Next Chapter" },
      { property: "og:description", content: "Premium streetwear and everyday essentials from VALE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const fresh = products.filter((p) => p.collections.includes("new"));
  const trending = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  return (
    <>
      <section className="relative">
        <img src={heroAsset.url} alt="Model wearing a black VALE hoodie and wide-leg trousers in a concrete plaza" width={768} height={1024} className="h-[78vh] w-full object-cover object-[50%_40%] md:h-[88vh] md:object-[50%_35%]" />
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-12 text-center text-primary-foreground md:pb-20">
          <p className="mb-3 font-medium">Introducing VALE</p>
          <h1 className="headline text-6xl md:text-8xl">The Next<br />Chapter.</h1>
          <Link to="/collections" className="pill mt-7 bg-background text-foreground">Explore Collection</Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-5 pt-16 md:px-10 md:pt-24">
        <h2 className="headline mb-8 text-4xl md:text-6xl">Built for every day.</h2>
        <div className="flex snap-x gap-3 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
          {collections.map((c) => (
            <Link key={c.slug} to={`/${c.slug}` as "/men" | "/women" | "/essentials"} className="group relative w-[78%] shrink-0 snap-start overflow-hidden md:w-auto">
              <img src={c.image} alt={c.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute bottom-6 left-6">
                <span className="pill bg-background text-foreground">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {fresh.length > 0 && <section className="pt-16 md:pt-24">
        <div className="mx-auto flex max-w-[1800px] items-end justify-between px-5 md:px-10">
          <h2 className="headline text-4xl md:text-6xl">Just landed.</h2>
          <Link to="/new" className="font-medium underline underline-offset-4">Shop all</Link>
        </div>
        <div className="mt-8 flex snap-x gap-3 overflow-x-auto px-5 no-scrollbar md:px-10">
          {fresh.map((p) => <ProductCard key={p.slug} p={p} className="w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-[24%]" />)}
        </div>
      </section>}

      <section className="relative mt-16 md:mt-24">
        <img src={campaign} alt="Two models in off-white and black layered VALE outfits" loading="lazy" className="h-[70vh] w-full object-cover md:h-[85vh]" />
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-center text-primary-foreground md:pb-20">
          <h2 className="headline text-6xl md:text-8xl">Defined by you.</h2>
          <p className="mt-4 text-lg">Designed for the everyday. Made to stand apart.</p>
          <Link to="/about" className="pill mt-7 bg-background text-foreground">Discover VALE</Link>
        </div>
      </section>

      {trending.length > 0 && <section className="mx-auto max-w-[1800px] px-5 pt-16 md:px-10 md:pt-24">
        <h2 className="headline mb-8 text-4xl md:text-6xl">Trending now.</h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4 md:gap-x-4">
          {trending.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>}

      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">The VALE philosophy</p>
        <p className="headline text-3xl md:text-5xl">Not just clothing.<br />A way of moving.</p>
        <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
          VALE makes considered everyday pieces — clean cuts, honest fabrics and a quiet confidence that works anywhere.
        </p>
        <Link to="/about" className="pill mt-8 border border-input">Our Story</Link>
      </section>

      <Newsletter />
    </>
  );
}
