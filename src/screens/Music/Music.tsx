import { Layout } from "antd";
import styles from "./Music.module.css"
import { useParams } from "react-router-dom";

export default function Musics() {
  const { id } = useParams()

  return (
    <Layout>
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
        ></iframe>
      </div>
    </Layout>
  );
}
