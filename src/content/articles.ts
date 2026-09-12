import articleData from "./articles.json";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  lead: string;
  sections: ArticleSection[];
}

export const articles = articleData as Article[];

export const getArticle = (slug?: string) =>
  articles.find((article) => article.slug === slug);

export const formatArticleDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
