import { Menu } from "antd";
import styles from "../../screens/Home/Home.module.css"
export const MainMenu = () => {
  return (
    <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item title="Voltar ao inicio" key={1}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item title="JavaScript Explorer PlayGround" key={2}>
        <a
          href="https://jep.vercel.app/"
          target="_blank"
          rel="noreferrer noopener"
        >JEP</a>
      </Menu.Item>
      <Menu.Item title="Meu Blog" key={3}>
        <a
          href="https://giuzambot.blogspot.com/"
          target="_blank"
          rel="noreferrer noopener"
        >Blog</a>
      </Menu.Item>
      <Menu.Item title="GitHub" key={4}>
        <a
          href="https://github.com/giuzambot"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </Menu.Item>
      <Menu.Item title="LinkedIn" key={5}>
        <a
          href="https://www.linkedin.com/in/giuzambot/"
          target="_blank"
          rel="noreferrer noopener"
        >LinkedIn</a>
      </Menu.Item>
      <Menu.Item title="Meus Livros" key={6}>
        <a
          href="https://clubedeautores.com.br/livros/autores/giuzambot"
          target="_blank"
          rel="noreferrer noopener"
        >Meus Livros</a>
      </Menu.Item>
      <Menu.Item title="Loja" key={7}>
        <a
          href="https://www.colab55.com/@giuzambot"
          target="_blank"
          rel="noreferrer noopener"
        >Loja</a>
      </Menu.Item>
    </Menu>);
}
