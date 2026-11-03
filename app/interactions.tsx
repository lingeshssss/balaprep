"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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

export function Reveal({ children, delay = 0, hero = false, className }: { children: ReactNode; delay?: number; hero?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const entrance = { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } };
  return (
    <motion.div
      className={className}
      initial={false}
      {...(!reduced && (hero ? { animate: { opacity: [0.82, 1], y: [9, 0], transition: entrance.transition } } : {
        whileInView: { ...entrance, opacity: [0.82, 1], y: [9, 0] },
        viewport: { once: true, amount: 0.25 },
      }))}
    >
      {children}
    </motion.div>
  );
}
