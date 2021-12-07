import styles from './index.module.css';
import { Carousel, Col, Layout, Menu, Row } from 'antd';

export default function Home() {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header className={styles.header}>
        <Row>
          <Col className={styles.logo}></Col>
          <Col span={20}>
            <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item title="Votlar ao inicio" key={1}>
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
            </Menu>
          </Col>
        </Row>
      </Header>

      <Content className={styles.content}>
        <h1>Cursos</h1>

      </Content>
      <Footer className={styles.footer}>Giu Zambot ©2021</Footer>
    </Layout>

  );
}