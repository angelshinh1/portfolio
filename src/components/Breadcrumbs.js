import Link from "next/link";

// items: [{ label, href? }] — the last item should omit href (current page).
export default function Breadcrumbs({ items, className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-2 font-type text-[0.7rem] uppercase tracking-[0.14em] ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" style={{ color: "var(--ink-sepia)", opacity: 0.6 }}>/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-[var(--ink-sepia)] hover:text-[var(--green-deep)] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ink-brown)]" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
