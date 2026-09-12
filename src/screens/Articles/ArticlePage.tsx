import { Link, useParams } from "react-router-dom";
import { PageMetadata } from "../../components/PageMetadata/PageMetadata";
import { articles, formatArticleDate, getArticle } from "../../content/articles";
import "./Articles.css";

const SITE_URL = "https://www.giuzambot.com";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <main className="journal-shell article-missing">
        <p className="journal-kicker">Sinal perdido</p>
        <h1>Esta transmissão não foi encontrada.</h1>
        <Link to="/artigos">Voltar ao Diário de Bordo</Link>
      </main>
    );
  }

  const relatedArticles = articles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 2);
  const articleUrl = `${SITE_URL}/artigos/${article.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "pt-BR",
        mainEntityOfPage: articleUrl,
        image: `${SITE_URL}/og-image.webp`,
        author: {
          "@type": "Person",
          name: "Giu Zambot",
          url: `${SITE_URL}/bio`,
        },
        publisher: {
          "@type": "Person",
          name: "Giu Zambot",
          url: SITE_URL,
        },
        keywords: article.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Giu Zambot",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Diário de Bordo",
            item: `${SITE_URL}/artigos`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="journal-shell article-page">
      <PageMetadata
        title={`${article.title} — Giu Zambot`}
        description={article.description}
        path={`/artigos/${article.slug}`}
        type="article"
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="article-breadcrumb" aria-label="Navegação estrutural">
        <Link to="/">Giu Zambot</Link>
        <span aria-hidden="true">/</span>
        <Link to="/artigos">Diário de Bordo</Link>
      </nav>

      <article>
        <header className="article-header">
          <p className="journal-kicker">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.lead}</p>
          <div className="article-meta">
            <span>Por Giu Zambot</span>
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
            <span>{article.readingTime} de leitura</span>
          </div>
        </header>

        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <footer className="article-footer">
          <div className="article-tags" aria-label="Assuntos do artigo">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="article-studio-cta">
            <p>Quer ver ideias como essas transformadas em mundos jogáveis?</p>
            <a
              href="https://almatter.com.br/pt-BR/games"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descobrir os games da Almatter <span aria-hidden="true">↗</span>
            </a>
          </div>
        </footer>
      </article>

      <aside className="related-articles" aria-labelledby="related-title">
        <h2 id="related-title">Outras transmissões</h2>
        <div>
          {relatedArticles.map((related) => (
            <Link key={related.slug} to={`/artigos/${related.slug}`}>
              <span>{related.eyebrow}</span>
              <strong>{related.title}</strong>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
