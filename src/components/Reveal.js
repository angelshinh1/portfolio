// Layout wrapper only. Content renders immediately and in full — this is a
// portfolio to read, not an app to watch load, so nothing here waits on scroll
// position or animates in. The component is kept (rather than deleted at every
// call site) because it carries real layout classNames throughout the pages.
export default function Reveal({ children, as: Tag = "div", className, delay, y, duration, style, ...rest }) {
  return (
    <Tag className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
