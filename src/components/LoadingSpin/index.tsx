import { Row, Spin } from "antd";
import styles from './index.module.css';

export const LoadingSpin = () => {
  const messages = [
    "Criando modelos de conhecimento...",
    "IA criando o site segundo informações dos smurfs...",
    "Esperando Sol carregar baterias...",
    "Determinando coeficiente de curva do rabo da lagartixa...",
    "Gerando relatório de nível de pó da ventoinha...",
    "Pegando café, aguarde...",
    "Desculpe estava pensando no almoço...",
    "Só sei que nada sei, mas não tenho certeza...",
    "Erro na Matrix, recriando simulação da realidade...",
    "Já viu a lua hoje?",
    "Preparando o café da IA...",
    "Brincando de esconde-esconde com os bugs...",
    "Calculando a resposta para a vida, ok, a resposta é...",
    "Pedindo ajuda aos alienígenas...",
    "Polindo os pixels...",
    "Contando até infinito... duas vezes...",
    "Esticando os bytes preguiçosos...",
    "Chamando o mestre dos magos...",
    "Estudando o manual de instruções dos gremlins..."
  ];

  const randomArrIndex = Math.floor(Math.random() * (messages.length));
  const randomMessage = messages[randomArrIndex];

  return (
    <Row align="middle" justify="center" className={styles.loadingSpinRow} >
      <Spin size="large" className={styles.spin}></Spin>
      <div className={styles.spinMessage}>{randomMessage}</div>
    </Row>
  )
}
