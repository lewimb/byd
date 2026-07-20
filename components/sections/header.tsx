"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { NAVLIST } from "@/lib/nav-list";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import MobileNav from "../components/shared/mobile-nav";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Hysteresis: different engage/release thresholds so hovering
        // near one pixel value doesn't flip state (and restart the
        // transition) back and forth while scrolling.
        setIsScrolled((prev) =>
          prev ? window.scrollY > 4 : window.scrollY > 24,
        );
        raf = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav className={cn("sticky top-0 z-100 w-full", isScrolled && "top-10")}>
      <div
        className={cn(
          "mx-auto transition-[max-width,margin-top,background-color,box-shadow,border-color] duration-300 ease-in-out",
          isScrolled
            ? "max-w-2xl rounded-full bg-background/50 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-border/60 shadow-lg"
            : "max-w-full bg-background",
        )}
      >
        <div
          className={cn(
            "shell flex justify-between items-center transition-[padding] duration-300 ease-in-out",
            isScrolled ? "py-3 px-5" : "px-8 pt-5 pb-8",
          )}
        >
          <Link href="/">
            <Image src="/logo.svg" width={120} height={24} alt="BYD" priority />
          </Link>
          <div>
            <ul className="hidden lg:flex gap-4">
              {NAVLIST.map((nav) => (
                <li
                  className={cn(
                    "text-muted-foreground duration-300 hover:text-primary",
                    isScrolled && "text-foreground text-sm hover:text-primary",
                  )}
                  key={nav.title}
                >
                  <Link scroll={true} href={nav.url}>
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Button
            className={cn("py-4.5 max-lg:hidden", isScrolled && "hidden")}
          >
            Dapatkan Penawaran
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
