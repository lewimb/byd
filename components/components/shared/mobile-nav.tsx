"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAVLIST } from "@/lib/nav-list";

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Buka menu navigasi"
        aria-expanded={open}
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  key="mobile-nav-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu navigasi"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-y-0 right-0 z-50 flex h-full w-[80vw] max-w-sm flex-col border-l border-white/10 bg-ink text-ink-foreground shadow-2xl lg:hidden"
                >
                  <div className="flex items-center justify-between p-6">
                    <p className="text-sm font-semibold tracking-widest text-accent-glow uppercase">
                      Menu
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Tutup menu navigasi"
                      className="text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
                      onClick={() => setOpen(false)}
                    >
                      <X className="size-5" />
                    </Button>
                  </div>

                  <ul className="flex flex-col overflow-y-auto px-6">
                    {NAVLIST.map((nav) => (
                      <li
                        key={nav.title}
                        className="border-b border-white/10 last:border-none"
                      >
                        <Link
                          href={nav.url}
                          scroll={true}
                          onClick={() => setOpen(false)}
                          className="block py-4 text-lg font-medium text-ink-muted transition-colors hover:text-accent-glow"
                        >
                          {nav.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto p-6">
                    <Button className="w-full py-4.5" onClick={() => setOpen(false)}>
                      Dapatkan Penawaran
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
