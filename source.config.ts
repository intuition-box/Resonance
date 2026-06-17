import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// Collections de documentation Fumadocs. Le contenu bilingue vit dans
// content/docs/ (fichiers `<name>.mdx` = anglais par défaut, `<name>.fr.mdx` = français).
export const { docs, meta } = defineDocs({
  dir: "content/docs",
});

export default defineConfig();
