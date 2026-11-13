import type { ReactNode } from "react";
export function InfoPage({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h1 className="headline text-5xl md:text-7xl">{title}</h1>
      {intro && <p className="mt-6 text-lg text-muted-foreground">{intro}</p>}
      <div className="mt-10 space-y-6 leading-relaxed [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_a]:underline">{children}</div>
    </div>
  );
}
export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — VALE` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — VALE` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
