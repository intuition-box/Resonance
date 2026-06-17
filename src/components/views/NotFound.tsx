"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import Link from "next/link";

export function NotFound({ title, message }: { title?: string; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-caramel-500/30">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">{title ?? dict.notFound.title}</h1>
      <p className="mt-2 text-white/50">{message ?? dict.notFound.message}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-caramel-500/15 px-4 py-2 text-sm font-medium text-caramel-200 transition-colors hover:bg-caramel-500/25"
      >
        {dict.notFound.back}
      </Link>
    </div>
  );
}
