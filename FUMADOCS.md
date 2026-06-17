# Intégration Fumadocs — terrain préparé

L'app est déjà **Next.js App Router + i18n (en/fr)**, ce qui est le prérequis de Fumadocs.
Tout le pipeline de contenu est en place ; il ne reste qu'à **monter la route docs + l'UI**.

## ✅ Déjà fait

| Élément | Fichier |
|--------|---------|
| Dépendances | `fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx` (+ `@types/mdx`) |
| Plugin MDX | `next.config.mjs` → `createMDX()` |
| Collections | `source.config.ts` → `defineDocs({ dir: "content/docs" })` |
| i18n Fumadocs | `src/lib/fumadocs-i18n.ts` (aligné sur `src/lib/i18n.ts`, défaut `en`) |
| Contenu bilingue | `content/docs/*.mdx` (EN) + `*.fr.mdx` (FR) — index, context, speakers, timeline, missions, glossary + `meta.json` |
| Génération | `postinstall: fumadocs-mdx` → `.source/` (regénérer : `pnpm exec fumadocs-mdx`) |

> Le build du portail reste vert avec ce pipeline.

## ⏳ À faire (montage de la route)

> ⚠️ L'API du **loader** est sensible à la version de `fumadocs-mdx` (ici **15.x**). Les
> exports générés sont dans `.source/server.ts` (`docs`, `meta`). Vérifie le snippet
> « lib/source.ts » du quick-start de la version installée avant de copier-coller.

### 1. `src/lib/source.ts` — le loader

```ts
import { loader } from "fumadocs-core/source";
import { docs, meta } from "../../.source/server"; // alias @/ = src/, donc import relatif
import { fumadocsI18n } from "./fumadocs-i18n";

export const source = loader({
  i18n: fumadocsI18n,
  baseUrl: "/docs",
  // Selon la version : docs.toFumadocsSource() OU un builder à partir de { docs, meta }.
  source: /* cf. quick-start fumadocs-mdx 15 */,
});
```

### 2. `src/components/mdx.tsx` — composants MDX

```tsx
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultComponents, ...components };
}
```

### 3. `src/app/[lang]/docs/layout.tsx` — layout docs (DocsLayout + RootProvider)

```tsx
import "fumadocs-ui/style.css"; // ⚠️ CSS GLOBAL — voir note plus bas
import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { resolveLocale } from "@/lib/i18n";

export default async function Layout({ params, children }: {
  params: Promise<{ lang: string }>; children: React.ReactNode;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  return (
    <RootProvider i18n={{ locale }}>
      <DocsLayout tree={source.pageTree[locale]} nav={{ title: "Intuition Docs" }}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
```

### 4. `src/app/[lang]/docs/[[...slug]]/page.tsx` — rendu MDX

```tsx
import { source } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody><MDX components={getMDXComponents()} /></DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
```

### 5. Lien « Docs » dans la nav

Ajouter dans `src/components/Nav.tsx` un `<Link href={\`/${lang}/docs\`}>` (clé i18n à créer
dans `src/lib/dictionaries.ts` : `nav.docs`).

## ⚠️ Réconciliation CSS

`fumadocs-ui/style.css` est **global** (variables `--color-*`, typographie de base). Il peut
percuter le thème *dark caramel* du portail (`src/app/globals.css`). Options :

1. **Scoper** : n'importer `fumadocs-ui/style.css` que dans `app/[lang]/docs/layout.tsx`
   (déjà le cas ci-dessus) et vérifier visuellement que le portail (hors `/docs`) n'est pas
   affecté ; sinon préfixer/encapsuler.
2. **Aligner les tokens** : surcharger les variables Fumadocs avec la palette caramel pour une
   identité unifiée hub ↔ docs.

C'est l'étape qui demande un arbitrage visuel — laissée volontairement à l'intégration finale.
