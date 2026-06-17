import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { stackHeadline, stackNotch } from "./fonts";
import "./globals.css";

const title = `${SITE_NAME} · Intuition conference hub`;
const description =
  "Recap portal for Spaces, talks and AMAs across the Intuition ecosystem: context, speakers, themes and bounty missions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title, description, url: SITE_URL, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#13100c",
  colorScheme: "dark",
};

// English-only site: static `lang="en"`. This is the signal that lets browsers offer
// a reliable translation to non-English-speaking visitors.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${stackHeadline.variable} ${stackNotch.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="flex min-h-screen flex-col">
          <Nav />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
