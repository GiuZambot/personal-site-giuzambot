import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(
  await readFile(path.join(projectRoot, "src", "content", "articles.json"), "utf8"),
);
const siteUrl = "https://www.giuzambot.com";
const escapeXml = (value) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]);

const pages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/artigos", changefreq: "weekly", priority: "0.8" },
  ...articles.map((article) => ({
    path: `/artigos/${article.slug}`,
    lastmod: article.updatedAt,
    changefreq: "monthly",
    priority: "0.7",
  })),
  { path: "/bio", changefreq: "monthly", priority: "0.7" },
  { path: "/games/island", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

const entries = pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(`${siteUrl}${page.path}`)}</loc>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
    }
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await writeFile(path.join(projectRoot, "public", "sitemap.xml"), sitemap, "utf8");
console.log(`Sitemap gerado com ${pages.length} URLs.`);
