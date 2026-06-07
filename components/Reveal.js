"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Scroll-triggered fade/slide reveal — the calm editorial entrance used site-wide.
//
// Robustness is deliberate: a plain IntersectionObserver drives the reveal, a
// failsafe timer reveals content even if the observer never fires (slow paint,
// headless rendering), and a `@media (scripting: none)` rule in globals.css
// shows everything when JS is unavailable. Content can never get stuck hidden.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.75,
  amount = 0.18,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    // Failsafe: never let content remain invisible.
    const timer = setTimeout(() => setShown(true), 1300);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [amount]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
