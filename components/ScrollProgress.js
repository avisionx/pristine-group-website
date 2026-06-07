"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Hairline gradient reading-progress bar pinned to the very top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="bg-gradient-brand fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      aria-hidden
    />
  );
}
