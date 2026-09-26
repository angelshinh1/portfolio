// Layout-only wrapper: content renders immediately, no scroll animation
export default function Reveal({ children, as: Tag = "div", className, delay, y, duration, style, ...rest }) {
  return (
    <Tag className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
