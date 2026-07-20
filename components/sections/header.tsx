"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { NAVLIST } from "@/lib/nav-list";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BydLogo } from "../components/shared/svg/byd-logo";
import MobileNav from "../components/shared/mobile-nav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // threshold in px
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky z-30 top-10">
      <div
        className={cn(
          "mx-auto transition-all duration-300 ease-in-out",
          isScrolled
            ? "mt-2 max-w-2xl rounded-full bg-background/50 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-border/60 shadow-lg"
            : "max-w-full bg-background",
        )}
      >
        <div
          className={cn(
            "shell flex justify-between items-center transition-all duration-300 ease-in-out",
            isScrolled ? "py-3 px-5" : "px-8 pt-5 pb-8",
          )}
        >
          <Link href="/">
            <BydLogo className={cn("w-30 h-fit object-cover")} />
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
