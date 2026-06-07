"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

export default function Gallery({ images = [], label }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback((i) => {
    setActive(i);
    setOpen(true);
  }, []);
  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (!images.length) return null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => show(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl bg-cream-deep cursor-pointer"
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={src}
              alt={label ? `${label} ${i + 1}` : `Gallery image ${i + 1}`}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink">
                <Expand className="h-5 w-5" />
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            ) : null}

            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[active]}
              alt={label ? `${label} ${active + 1}` : `Gallery image ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-[var(--shadow-lift)]"
            />

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tabular-nums text-white/70">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
