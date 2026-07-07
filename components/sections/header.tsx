"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { NAVLIST } from "@/lib/nav-list";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BydLogo } from "../components/shared/svg/byd-logo";

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
    <section
      className={cn(
        "px-8 py-8 bg-white sticky z-30 top-0",
        isScrolled
          ? "max-w-2xl rounded-full top-5 py-3 px-5 bg-white/20 backdrop-blur-md border border-white/20 shadow-lg"
          : "max-w-full mx-0",
        "transition-all duration-300 ease-in-out mx-auto",
      )}
    >
      <div className="flex justify-between items-center">
        <BydLogo className={cn("w-30 h-fit object-cover")} />
        <div>
          <ul className="flex gap-4">
            {NAVLIST.map((nav) => (
              <li
                className={cn(
                  "text-neutral-600 duration-300 hover:text-black",
                  isScrolled && "text-black text-sm hover:text-gray-300",
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
        <Button className={cn("py-4.5 max-lg:hidden", isScrolled && "hidden")}>
          Dapatkan Penawaran
        </Button>
      </div>
    </section>
  );
}
