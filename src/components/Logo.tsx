import logo from "@/assets/vale-logo.png.asset.json";
import { Link } from "@tanstack/react-router";
export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <Link to="/" aria-label="VALE home" className="inline-flex items-center">
      <img src={logo.url} alt="VALE" className={`${className} w-auto object-contain mix-blend-multiply`} />
    </Link>
  );
}
