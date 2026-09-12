import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const articles = JSON.parse(
  await readFile(path.join(projectRoot, "src", "content", "articles.json"), "utf8"),
);
const sitemap = await readFile(path.join(distDirectory, "sitemap.xml"), "utf8");

const requireText = (source, expected, context) => {
  if (!source.includes(expected)) {
    throw new Error(`${context}: conteúdo ausente: ${expected}`);
  }
};

const indexHtml = await readFile(path.join(distDirectory, "artigos.html"), "utf8");
requireText(indexHtml, "Transmissões encontradas", "Índice editorial");
requireText(indexHtml, 'href="/artigos/', "Links do índice editorial");
requireText(indexHtml, "https://www.giuzambot.com/artigos", "Canonical do índice");

for (const article of articles) {
  const outputFile = path.join(distDirectory, `artigo-${article.slug}.html`);
  const html = await readFile(outputFile, "utf8");
  const publicUrl = `https://www.giuzambot.com/artigos/${article.slug}`;

  requireText(html, article.title, article.slug);
  requireText(html, publicUrl, `Canonical de ${article.slug}`);
  requireText(html, '"@type":"BlogPosting"', `BlogPosting de ${article.slug}`);
  requireText(html, '"@type":"BreadcrumbList"', `Breadcrumbs de ${article.slug}`);
  requireText(sitemap, publicUrl, `Sitemap de ${article.slug}`);
}

console.log(
  `Pré-renderização validada: índice e ${articles.length} artigos com SEO estrutural.`,
);
