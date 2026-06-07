"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

// Counts up from 0 to `to` when scrolled into view. Same robustness contract as
// Reveal: a real observer + a failsafe so the final number always lands, even if
// the observer never fires (headless rendering, reduced motion, slow paint).
export default function Counter({ to, duration = 2, className }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let controls;
    const run = () => {
      if (controls) return;
      controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
    };

    const el = ref.current;
    const io = el
      ? new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              run();
              io.disconnect();
            }
          },
          { threshold: 0.5 },
        )
      : null;
    io?.observe(el);
    const timer = setTimeout(run, 1300); // failsafe

    return () => {
      io?.disconnect();
      clearTimeout(timer);
      controls?.stop();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
