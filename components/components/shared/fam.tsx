"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneCall, Car, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const ACTIONS = [
  {
    icon: PhoneCall,
    label: "Konsultasi",
    href: "#",
  },
  {
    icon: Car,
    label: "Test Drive",
    href: "#",
  },
];

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToDesktopQuery(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerIsDesktop() {
  return false;
}

export default function FloatingActions() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopQuery,
    getIsDesktop,
    getServerIsDesktop,
  );
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const collapsed = manualOverride ?? !isDesktop;

  return (
    <aside className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 items-center">
      <button
        onClick={() => setManualOverride(!collapsed)}
        aria-label={
          collapsed ? "Buka menu aksi cepat" : "Tutup menu aksi cepat"
        }
        className="group relative flex h-14 w-8 items-center justify-center rounded-l-2xl border border-r-0 border-white/10 bg-ink text-ink-foreground shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] transition-colors hover:bg-ink/90"
      >
        {collapsed && (
          <span className="absolute -left-1 top-1/2 flex size-2.5 -translate-y-1/2 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-glow opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-glow" />
          </span>
        )}
        {collapsed ? (
          <ChevronLeft className="size-4 text-accent-glow transition-transform group-hover:-translate-x-0.5" />
        ) : (
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="overflow-hidden rounded-l-2xl border border-white/10 bg-ink/95 shadow-2xl backdrop-blur-xl">
              {ACTIONS.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.25 }}
                >
                  <Link
                    href={action.href}
                    className="group/action flex items-center gap-3 px-4 py-4 whitespace-nowrap text-ink-foreground transition-colors hover:bg-primary"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/action:bg-primary-foreground/15">
                      <action.icon className="size-5 transition-transform group-hover/action:scale-110" />
                    </span>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>

                  {index !== ACTIONS.length - 1 && (
                    <div className="mx-4 h-px bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
