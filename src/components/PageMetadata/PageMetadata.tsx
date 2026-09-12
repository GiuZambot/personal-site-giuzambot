import { useEffect } from "react";

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
}

const SITE_URL = "https://www.giuzambot.com";

const setMeta = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    const [name, property] = selector.includes("property=")
      ? [undefined, selector.match(/property="([^"]+)"/)?.[1]]
      : [selector.match(/name="([^"]+)"/)?.[1], undefined];
    if (name) element.setAttribute("name", name);
    if (property) element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
};

export function PageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedAt,
  updatedAt,
}: PageMetadataProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document
      .head.querySelectorAll(
        'meta[property="article:published_time"], meta[property="article:modified_time"]',
      )
      .forEach((element) => element.remove());

    if (type === "article" && publishedAt && updatedAt) {
      setMeta(
        'meta[property="article:published_time"]',
        "content",
        publishedAt,
      );
      setMeta(
        'meta[property="article:modified_time"]',
        "content",
        updatedAt,
      );
    }
  }, [description, path, publishedAt, title, type, updatedAt]);

  return null;
}
