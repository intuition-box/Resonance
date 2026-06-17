import { defaultLocale, locales } from "@/lib/i18n";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // On exclut les assets statiques, l'API et tout chemin contenant un point (fichiers).
  matcher: ["/((?!api|_next|brand|favicon.ico|.*\\.).*)"],
};
