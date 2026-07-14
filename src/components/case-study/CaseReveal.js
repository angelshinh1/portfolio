// Pure-CSS entrance animation (see .case-reveal in globals.css) — no
// IntersectionObserver. Runs once at mount regardless of scroll position, so
// it can safely be used on hero elements that are already in the initial
// viewport without depending on scroll-timing to ever fire.
export default function CaseReveal({ children, as: Tag = "div", className = "", delay = 0 }) {
  return (
    <Tag className={`case-reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
