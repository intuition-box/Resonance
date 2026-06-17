import type { ReactNode } from "react";
import type { OrgColor } from "../data/types";

export const orgPalette: Record<OrgColor, { dot: string; ring: string; text: string }> = {
  sky: { dot: "bg-sky-400", ring: "ring-sky-400/30", text: "text-sky-300" },
  violet: { dot: "bg-violet-400", ring: "ring-violet-400/30", text: "text-violet-300" },
  caramel: { dot: "bg-caramel-300", ring: "ring-caramel-300/30", text: "text-caramel-200" },
  emerald: { dot: "bg-emerald-400", ring: "ring-emerald-400/30", text: "text-emerald-300" },
  rose: { dot: "bg-rose-400", ring: "ring-rose-400/30", text: "text-rose-300" },
  amber: { dot: "bg-amber-400", ring: "ring-amber-400/30", text: "text-amber-300" },
};

export function OrgTag({
  name,
  color,
  logo,
}: {
  name: string;
  color: OrgColor;
  logo?: string;
}) {
  const m = orgPalette[color] ?? orgPalette.caramel;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full py-0.5 pr-2.5 text-xs font-medium ring-1 ${m.ring} ${m.text} ${logo ? "pl-1" : "pl-2.5"}`}
    >
      {logo ? (
        <img src={logo} alt="" className="size-4 rounded-full object-contain" />
      ) : (
        <span className={`size-1.5 rounded-full ${m.dot}`} />
      )}
      {name}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel-400/80">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-white/60">{description}</p>}
    </div>
  );
}
