import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  as = "div",
  className,
  delay,
  y,
  duration,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const { style: restStyle, ...restWithoutStyle } = rest;
  const mergedStyle =
    delay || restStyle
      ? { ...(delay ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : {}), ...restStyle }
      : undefined;

  return (
    <Tag
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...restWithoutStyle}
    >
      {children}
    </Tag>
  );
}
