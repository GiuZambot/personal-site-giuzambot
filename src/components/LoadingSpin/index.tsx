import { Row, Spin } from "antd";
import styles from './index.module.css';

export default function LoadingSpin() {
  const messages = [
    "Criando modelos de conhecimento...",
    "IA criando o site segundo informações dos smurfs...",
    "Esperando Sol carregar baterias...",
    "Determinando coificiente de bla bla bla..",
    "Gerando relatório de nivel de pó...",
    "Pegando café, aguarde...",
    "Desculpe estava pensando no almoço...",
    "Só sei que nada sei, mas o que sei tenho certeza...",
    "Erro, recriando simulação da realidade...",
    "Já viu a lua hoje?"
  ];
  const randomArrIndex = Math.floor(Math.random() * (messages.length));
  const randomMessage = messages[randomArrIndex];
  return (
    <Row align="middle" justify="center" className={styles.loadingSpinRow} >
      <Spin size="large" className={styles.spin} tip={randomMessage} />
    </Row>
  )
}

