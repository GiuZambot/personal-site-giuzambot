import styles from "../../screens/Home/Home.module.css";
import { Col, Layout, Row } from "antd";
import { MainMenu } from "../Menu/Menu";

export const Header = () => {
  const { Header, Content } = Layout;

  return (
    <Content>
      <Header className={styles.header}>
        <Row>
          <Col className={styles.logo}></Col>
          <Col span={20}>
            <MainMenu />
          </Col>
        </Row>
      </Header>
    </Content>
  )
}
