import { Link, useNavigate } from "react-router-dom";
import { PageMetadata } from "../../components/PageMetadata/PageMetadata";
import { articles, formatArticleDate } from "../../content/articles";
import "./Articles.css";

export default function ArticlesIndex() {
  const navigate = useNavigate();

  const openRandomArticle = () => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    navigate(`/artigos/${articles[randomIndex].slug}`);
  };

  return (
    <main className="journal-shell journal-index">
      <PageMetadata
        title="Diário de Bordo — Giu Zambot"
        description="Reflexões de Giu Zambot sobre criatividade, desenvolvimento de games, protótipos e experiências digitais."
        path="/artigos"
      />

      <header className="journal-hero">
        <div>
          <p className="journal-kicker">Arquivo cósmico · volume 01</p>
          <h1>Diário de Bordo</h1>
          <p className="journal-intro">
            Ideias encontradas entre protótipos, mundos em construção e as
            perguntas que continuam acesas depois de fechar o editor.
          </p>
        </div>
        <button className="random-transmission" type="button" onClick={openRandomArticle}>
          <span aria-hidden="true">✦</span>
          Abrir transmissão aleatória
        </button>
      </header>

      <section className="journal-list" aria-labelledby="transmissions-title">
        <div className="journal-section-heading">
          <h2 id="transmissions-title">Transmissões encontradas</h2>
          <span>{articles.length.toString().padStart(2, "0")} registros</span>
        </div>

        <div className="article-grid">
          {articles.map((article, index) => (
            <article className="article-card" key={article.slug}>
              <Link to={`/artigos/${article.slug}`}>
                <div className="article-signal" aria-hidden="true">
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <i />
                </div>
                <p className="article-card-kicker">{article.eyebrow}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <footer>
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(article.publishedAt)}
                  </time>
                  <span>{article.readingTime}</span>
                </footer>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <aside className="studio-bridge">
        <p>
          Algumas dessas ideias escapam do diário e viram jogos no estúdio
          Almatter.
        </p>
        <a
          href="https://almatter.com.br/pt-BR/games"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conhecer os games <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </main>
  );
}
