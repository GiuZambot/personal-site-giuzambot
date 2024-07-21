import { Layout } from "antd";
import styles from "./Music.module.css"

export default function Musics() {
  return (
    <Layout>
      <div className={styles.videoResponsive}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/?listType=playlist&list=PLzXU62mJbRgZFSTb0mGXJKbN4zPKB671L&index=1&cc_load_policy=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}
