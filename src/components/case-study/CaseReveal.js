// CSS-only entrance animation (.case-reveal), runs once at mount
export default function CaseReveal({ children, as: Tag = "div", className = "", delay = 0 }) {
  return (
    <Tag className={`case-reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
