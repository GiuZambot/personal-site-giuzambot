import { useState } from "react";
import "./PrivacyPolicy.css";

export const PrivacyPolicy = () => {
  const [language, setLanguage] = useState("pt");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <main className="layout">
      <div className="privacy-policy">
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange("pt")}>
            🇧🇷 Português
          </button>
          <button onClick={() => handleLanguageChange("en")}>🇺🇸 English</button>
          <button onClick={() => handleLanguageChange("es")}>🇪🇸 Español</button>
          <button onClick={() => handleLanguageChange("zh")}>🇨🇳 中文</button>
        </div>

        {language === "pt" && (
          <div className="policy-content">
            <h1>Política de Privacidade</h1>
            <p>
              Esta Política de Privacidade descreve como nossos jogos lidam com
              os dados dos usuários. Estamos comprometidos com a proteção da
              privacidade de todos os nossos usuários, especialmente crianças.
            </p>
            <h2>Coleta de Dados</h2>
            <p>
              Nossos jogos não coletam informações pessoais dos usuários.
              Projetamos nossas experiências para serem utilizadas sem a
              necessidade de fornecer dados pessoais.
            </p>
            <h2>Anúncios</h2>
            <p>
              Alguns de nossos jogos podem exibir anúncios fornecidos pelo
              Google AdMob. Esses anúncios podem coletar dados anônimos, como
              identificadores de dispositivo e dados de uso, para oferecer
              anúncios mais relevantes. Para mais detalhes, acesse a{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade do Google
              </a>
              .
            </p>
            <h2>Crianças</h2>
            <p>
              Nossos jogos podem ser utilizados por usuários de todas as idades,
              inclusive crianças menores de 13 anos. Não coletamos
              intencionalmente dados pessoais de crianças. Caso descubramos que
              houve coleta de dados sem o devido consentimento dos pais ou
              responsáveis, tomaremos as medidas necessárias para excluir essas
              informações.
            </p>
            <h2>Contato</h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade, entre em
              contato pelo e-mail: <strong>contato@giuzambot.com</strong>.
            </p>
          </div>
        )}

        {language === "en" && (
          <div className="policy-content">
            <h1>Privacy Policy</h1>
            <p>
              This Privacy Policy explains how our games handle user data. We
              are committed to protecting the privacy of all our users,
              especially children.
            </p>
            <h2>Data Collection</h2>
            <p>
              Our games do not collect personal information from users. They are
              designed to be enjoyed without requiring any personal data.
            </p>
            <h2>Advertisements</h2>
            <p>
              Some of our games may display ads provided by Google AdMob. These
              ads may collect anonymous data, such as device identifiers and
              usage data, to serve more relevant ads. For more information,
              visit the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
              .
            </p>
            <h2>Children</h2>
            <p>
              Our games are available to users of all ages, including children
              under 13 years old. We do not knowingly collect personal data from
              children. If we become aware of any such collection without
              parental consent, we will take immediate steps to delete that
              information.
            </p>
            <h2>Contact</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us at: <strong>contato@giuzambot.com</strong>.
            </p>
          </div>
        )}

        {language === "es" && (
          <div className="policy-content">
            <h1>Política de Privacidad</h1>
            <p>
              Esta Política de Privacidad describe cómo nuestros juegos manejan
              los datos de los usuarios. Estamos comprometidos con la protección
              de la privacidad de todos nuestros usuarios, especialmente los
              niños.
            </p>
            <h2>Recopilación de datos</h2>
            <p>
              Nuestros juegos no recopilan información personal de los usuarios.
              Están diseñados para disfrutarse sin necesidad de proporcionar
              datos personales.
            </p>
            <h2>Anuncios</h2>
            <p>
              Algunos de nuestros juegos pueden mostrar anuncios proporcionados
              por Google AdMob. Estos anuncios pueden recopilar datos anónimos,
              como identificadores del dispositivo y datos de uso, para ofrecer
              anuncios más relevantes. Para más información, visita la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de Google
              </a>
              .
            </p>
            <h2>Niños</h2>
            <p>
              Nuestros juegos están disponibles para usuarios de todas las
              edades, incluidos los menores de 13 años. No recopilamos
              intencionalmente datos personales de menores. Si descubrimos que
              se ha recopilado dicha información sin consentimiento parental, la
              eliminaremos de inmediato.
            </p>
            <h2>Contacto</h2>
            <p>
              Si tienes alguna pregunta sobre esta Política de Privacidad,
              contáctanos al correo: <strong>contato@giuzambot.com</strong>.
            </p>
          </div>
        )}

        {language === "zh" && (
          <div className="policy-content">
            <h1>隐私政策</h1>
            <p>
              本隐私政策说明了我们的游戏如何处理用户数据。我们致力于保护所有用户的隐私，尤其是儿童。
            </p>
            <h2>数据收集</h2>
            <p>
              我们的游戏不会收集用户的个人信息。它们的设计目标是不需要提供任何个人数据。
            </p>
            <h2>广告</h2>
            <p>
              我们的一些游戏可能会展示由 Google AdMob
              提供的广告。这些广告可能会收集匿名数据，例如设备标识符和使用数据，以提供更相关的广告。详情请参阅{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 隐私政策
              </a>
              .
            </p>
            <h2>儿童</h2>
            <p>
              我们的游戏适用于所有年龄的用户，包括13岁以下的儿童。我们不会故意收集儿童的个人信息。如果我们发现未经父母同意收集了此类信息，我们将立即删除这些信息。
            </p>
            <h2>联系方式</h2>
            <p>
              如果您对本隐私政策有任何疑问，请通过电子邮件联系我们：
              <strong>contato@giuzambot.com</strong>。
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
