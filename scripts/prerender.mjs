import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const articles = JSON.parse(
  await readFile(path.join(projectRoot, "src", "content", "articles.json"), "utf8"),
);
const { render } = await import(
  pathToFileURL(path.join(projectRoot, "dist-ssr", "entry-server.js")).href
);

const SITE_URL = "https://www.giuzambot.com";
const escapeAttribute = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const pages = [
  {
    path: "/artigos",
    title: "Diário de Bordo — Giu Zambot",
    description:
      "Reflexões de Giu Zambot sobre criatividade, desenvolvimento de games, protótipos e experiências digitais.",
    type: "website",
  },
  ...articles.map((article) => ({
    path: `/artigos/${article.slug}`,
    title: `${article.title} — Giu Zambot`,
    description: article.description,
    type: "article",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  })),
];

const replaceMeta = (html, attribute, key, content) => {
  const expression = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
};

const applyMetadata = (source, page) => {
  const url = `${SITE_URL}${page.path}`;
  let html = source.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttribute(page.title)}</title>`,
  );
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}" />`,
  );
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(html, "property", "og:type", page.type);
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);

  if (page.type === "article") {
    html = replaceMeta(
      html,
      "property",
      "article:published_time",
      page.publishedAt,
    );
    html = replaceMeta(
      html,
      "property",
      "article:modified_time",
      page.updatedAt,
    );
  }

  return html;
};

for (const page of pages) {
  const appHtml = render(page.path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = applyMetadata(html, page);

  const outputName =
    page.path === "/artigos"
      ? "artigos.html"
      : `artigo-${page.path.split("/").at(-1)}.html`;
  const outputFile = path.join(distDirectory, outputName);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html, "utf8");
}

console.log(`Pré-renderização concluída para ${pages.length} páginas editoriais.`);
