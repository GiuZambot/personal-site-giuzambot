import styles from "./Music.module.css"
import { useParams } from "react-router-dom";

export default function Musics() {
  const { id } = useParams()
  const isValidVideoId = typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id);

  if (!isValidVideoId) {
    return (
      <main className={styles.musicError}>
        <h1>Música não encontrada</h1>
        <p>Este portal parece ter perdido a sintonia.</p>
        <a href="/">Voltar para o início</a>
      </main>
    );
  }

  return (
    <main className={styles.musicPage}>
      <div className={styles.videoResponsive}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          credentialless="true"
          loading="lazy"
        ></iframe>
      </div>
    </main>
  );
}
