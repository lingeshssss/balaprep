"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button ref={button} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>
        {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </button>
      <div id="mobile-links" className="mobile-links" hidden={!open} onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setOpen(false);
          button.current?.focus();
        }
      }}>
        {children}
      </div>
    </div>
  );
}

export function Reveal({ children, delay = 0, stagger = 0, hero = false, className }: { children: ReactNode; delay?: number; stagger?: number; hero?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [waiting, setWaiting] = useState(false);

  // The server HTML stays visible. Once JavaScript runs, only content still below the fold is hidden, before paint.
  useLayoutEffect(() => {
    if (!hero && ref.current && ref.current.getBoundingClientRect().top >= window.innerHeight) setWaiting(true);
  }, [hero]);

  if (hero) {
    return (
      <motion.div
        className={className}
        initial={false}
        {...(!reduced && { animate: { opacity: [0.82, 1], y: [9, 0], transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } } })}
      >
        {children}
      </motion.div>
    );
  }

  // Cards stack at this width, so each one reveals on its own as it enters the viewport.
  const stacked = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;
  const hidden = waiting && !inView && !reduced;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={false}
      animate={hidden
        ? { opacity: 0, y: 8, transition: { duration: 0 } }
        : { opacity: 1, y: 0, transition: reduced ? { duration: 0 } : { duration: 0.45, delay: delay + (stacked ? 0 : stagger), ease: [0.22, 1, 0.36, 1] as const } }}
      onFocusCapture={() => setWaiting(false)}
    >
      {children}
    </motion.div>
  );
}
