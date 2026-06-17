"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Nav() {
  const pathname = usePathname() || "";
  const addActive = pathname === "/contribute";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:pt-4">
      <nav
        className={`mx-auto flex w-full max-w-5xl items-center gap-3 rounded-2xl border px-3 py-2.5 ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${
          scrolled
            ? "border-white/10 bg-[#181410]/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
            : "border-white/[0.06] bg-[#181410]/40"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2 sm:gap-2.5" aria-label="Resonance">
          <img
            src="/brand/resonance/logo.svg"
            alt=""
            className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 sm:size-9 lg:size-10"
          />
          <span className="font-headline text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-caramel-200 sm:text-xl lg:text-2xl">
            {dict.nav.brandSuffix}
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/contribute"
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              addActive
                ? "border-caramel-500/30 bg-caramel-500/15 text-caramel-200"
                : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Plus className="size-4" />
            <span>{dict.nav.add}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
