export default function Reveal({ children, as = "div", className, delay, y, duration, style, ...rest }) {
  const Tag = as;
  return (
    <Tag className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
