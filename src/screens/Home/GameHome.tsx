import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Layout } from "antd";
import Game from "../../widgets/GodotGame/GodotGame";

export default function GameHome() {
  return (
    <Layout>
      <Header />
      <Game />
      <Footer />
    </Layout>
  );
}
