import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Layout } from "antd";
import { ProfileGame } from "../../widgets/ProfileGame/ProfileGame";
import styles from "./Home.module.css"

export default function Home() {
  return (
    <Layout>
      <Header />
      <ProfileGame className={styles.profileGame} />
      <Footer />
    </Layout>
  );
}
