import { useEffect, useRef, useState } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  let hiddenTransform = "translate3d(0, 100px, 0)";

  if (direction === "left") {
    hiddenTransform = "translate3d(-180px, 0, 0)";
  }

  if (direction === "right") {
    hiddenTransform = "translate3d(180px, 0, 0)";
  }

  if (direction === "down") {
    hiddenTransform = "translate3d(0, -100px, 0)";
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : hiddenTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: "1200ms",
        transitionTimingFunction:
          "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;