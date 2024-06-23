import { Footer } from "../../../components/Footer/Footer";
import { Header } from "../../../components/Header/Header";
import { Layout } from "antd";
import { useState } from "react";
import "./PrivacyPolice.css";

export const PrivacyPolicyTappyEscape = () => {
  const [language, setLanguage] = useState('pt');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <Layout className="layout">
      <Header />
      <div className="privacy-policy">
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange('pt')}>Português</button>
          <button onClick={() => handleLanguageChange('en')}>English</button>
        </div>

        {language === 'pt' && (
          <div className="policy-content">
            <h1>Política de Privacidade</h1>
            <p>
              Esta Política de Privacidade descreve como o nosso jogo lida com os dados dos usuários. Nós nos
              comprometemos a proteger a privacidade de nossos usuários, especialmente das crianças.
            </p>
            <h2>Coleta de Dados</h2>
            <p>
              Não coletamos quaisquer informações pessoais dos usuários. O nosso jogo é projetado para ser
              usado sem a necessidade de fornecer qualquer dado pessoal.
            </p>
            <h2>Anúncios</h2>
            <p>
              Nosso jogo exibe anúncios fornecidos pelo Google AdMob. Esses anúncios podem coletar dados
              anônimos para melhorar a experiência do usuário e fornecer anúncios relevantes. Para mais
              informações sobre como o Google coleta e usa dados, por favor, consulte a
              <a href="https://policies.google.com/privacy"> Política de Privacidade do Google</a>.
            </p>
            <h2>Crianças</h2>
            <p>
              Nosso jogo está disponível para usuários de todas as idades, incluindo crianças menores de 13
              anos. Não coletamos informações pessoais de crianças. Se soubermos que coletamos dados pessoais
              de uma criança sem verificação do consentimento dos pais, tomaremos medidas para apagar essas
              informações o mais rápido possível.
            </p>
            <h2>Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através
              do e-mail: suporte@seujogo.com.
            </p>
          </div>
        )}

        {language === 'en' && (
          <div className="policy-content">
            <h1>Privacy Policy</h1>
            <p>
              This Privacy Policy describes how our game handles user data. We are committed to protecting
              the privacy of our users, especially children.
            </p>
            <h2>Data Collection</h2>
            <p>
              We do not collect any personal information from users. Our game is designed to be used without
              the need to provide any personal data.
            </p>
            <h2>Advertisements</h2>
            <p>
              Our game displays ads provided by Google AdMob. These ads may collect anonymous data to improve
              user experience and provide relevant ads. For more information on how Google collects and uses
              data, please refer to the
              <a href="https://policies.google.com/privacy"> Google Privacy Policy</a>.
            </p>
            <h2>Children</h2>
            <p>
              Our game is available to users of all ages, including children under 13 years old. We do not
              collect personal information from children. If we become aware that we have collected personal
              data from a child without parental consent verification, we will take steps to delete that
              information as soon as possible.
            </p>
            <h2>Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: suporte@seujogo.com.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};
