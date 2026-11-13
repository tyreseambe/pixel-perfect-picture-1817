import { Link } from "@tanstack/react-router";
type S = { readonly label: string; readonly to: string; readonly q?: string };
export function SubLink({ s, className, onClick }: { s: S; className?: string; onClick?: () => void }) {
  if (s.q) return <Link to="/search" search={{ q: s.q }} className={className} onClick={onClick}>{s.label}</Link>;
  return <Link to={s.to} className={className} onClick={onClick}>{s.label}</Link>;
}
