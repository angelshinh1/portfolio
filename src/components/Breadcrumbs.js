import Link from "next/link";

// items: [{ label, href? }] — the last item should omit href (current page).
export default function Breadcrumbs({ items, className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-2 font-mono text-xs ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" style={{ color: "var(--green-deep)", opacity: 0.5 }}>/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-[var(--text-secondary)] hover:text-[var(--green-deep)] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--text-primary)]" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
