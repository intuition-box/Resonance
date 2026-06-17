import { Nav } from "@/components/Nav";
import { I18nProvider } from "@/components/i18n-provider";
import { getDictionary } from "@/lib/dictionaries";
import { locales, resolveLocale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

const title = `${SITE_NAME} — Intuition conference hub`;
const description =
  "Recap portal for Spaces, talks and AMAs across the Intuition ecosystem: context, speakers, themes and bounty missions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  icons: { icon: "/brand/intuition-mark.svg" },
  openGraph: { title, description, url: SITE_URL, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary", title, description },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body>
        <I18nProvider lang={locale}>
          <div className="min-h-screen">
            <Nav />
            <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8 sm:px-6">{children}</main>
            <footer className="flex items-center justify-center gap-2 border-t border-white/5 py-8 text-center text-xs text-white/40">
              <img src="/brand/intuition-mark.svg" alt="" className="size-4 opacity-60" />
              {dict.hub.footer}
            </footer>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
