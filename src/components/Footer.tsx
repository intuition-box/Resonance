"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import { LINKS, SITE_NAME } from "@/lib/site";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/35">{title}</span>
      <ul className="flex flex-col gap-2 text-sm">{children}</ul>
    </div>
  );
}

function Internal({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/55 transition-colors hover:text-white/90">
        {children}
      </Link>
    </li>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-white/55 transition-colors hover:text-white/90"
      >
        {children}
        <ArrowUpRight className="size-3 opacity-50" />
      </a>
    </li>
  );
}

export function Footer() {
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0f0c08]/50">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex max-w-xs flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/brand/intuition/wordmark.svg" alt="Intuition" className="h-5 w-auto" />
              <span className="h-4 w-px bg-white/20" />
              <img src="/brand/resonance/logo.svg" alt="" className="size-6" />
              <span className="font-headline text-base font-semibold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/45">{f.tagline}</p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-14">
            <Column title={f.navTitle}>
              <Internal href="/">{f.conferences}</Internal>
              <Internal href="/contribute">{f.contribute}</Internal>
            </Column>

            <Column title={f.ecosystemTitle}>
              <External href={LINKS.intuitionBox}>{f.intuitionBox}</External>
              <External href={LINKS.intuitionBoxX}>{f.followX}</External>
              <External href={LINKS.githubOrg}>{f.github}</External>
            </Column>

            <Column title={f.projectTitle}>
              <External href={LINKS.repo}>
                <Github className="size-3.5 opacity-60" />
                {f.source}
              </External>
              <External href={LINKS.license}>{f.license}</External>
            </Column>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-1 border-t border-white/5 pt-6 text-xs text-white/35">
          <span>
            © {year} {SITE_NAME} · {f.builtFor}
          </span>
          <span>{f.rights}</span>
        </div>
      </div>
    </footer>
  );
}
