import { Menu } from "antd";
import styles from "../../screens/Home/Home.module.css"
export const MainMenu = () => {
  return (
    <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item title="Voltar ao inicio" key={1}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item title="GitHub" key={2}>
        <a
          href="https://github.com/giuzambot"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </Menu.Item>
      <Menu.Item title="LinkedIn" key={3}>
        <a
          href="https://www.linkedin.com/in/giuzambot/"
          target="_blank"
          rel="noreferrer noopener"
        >LinkedIn</a>
      </Menu.Item>
      <Menu.Item title="Meus Livros" key={4}>
        <a
          href="https://clubedeautores.com.br/livros/autores/giuzambot"
          target="_blank"
          rel="noreferrer noopener"
        >Meus Livros</a>
      </Menu.Item>
    </Menu>);
}
