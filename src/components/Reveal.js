/**
 * Pass-through wrapper. Content renders immediately (no scroll-in
 * animation / lazy reveal) - everything is present on first paint.
 * Animation-only props are absorbed so they never reach the DOM.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  delay,
  y,
  duration,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
