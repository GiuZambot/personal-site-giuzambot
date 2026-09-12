import { useEffect, useRef } from "react";
import wallpaper from "../../assets/optimized/fundo.webp";
import Logo from "../../assets/logo.svg";
import Bat from "../../components/Bat/Bat";
import DesktopIcon from "../../components/DesktopIcons/DesktopIcons";
import Witch from "../../components/Witch/Witch";
import "./Home.css";
import { defaultIcons } from "./Icons";
import { updateClock } from "./methods";

export default function Home() {
  const clock = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    if (clock.current !== null) {
      updateClock(clock.current);
      timer = window.setInterval(() => {
        if (clock.current) updateClock(clock.current);
      }, 1000);
    }

    return () => {
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="windows">
      <a className="skip-link" href="#desktop-navigation">
        Ir para a navegação
      </a>
      <img
        className="desktop-wallpaper"
        src={wallpaper}
        alt=""
        width="1536"
        height="1024"
      />
        <Witch />
        <Bat />
        <div id="desktop">
          <nav
            id="desktop-navigation"
            className="desktop-navigation"
            aria-label="Explorar o universo de Giu Zambot"
          >
            {defaultIcons.map((icon, index) => (
              <DesktopIcon key={icon.id} top={index * 100 + 20} {...icon} />
            ))}
          </nav>
          <section className="discovery-panel" aria-labelledby="site-title">
            <p className="discovery-eyebrow">Criatividade que vira mundo</p>
            <h1 id="site-title">Giu Zambot</h1>
            <p>
              Desenvolvedora e criadora de experiências. Explore meus projetos
              ou conheça os games do estúdio Almatter.
            </p>
            <a
              className="discovery-cta"
              href="https://almatter.com.br/pt-BR/games"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jogar games da Almatter
            </a>
          </section>
        </div>
        <div id="taskbar">
          <div className="taskbar-left">
            <a id="start-button" href="/" aria-label="Página inicial de Giu Zambot">
              <img src={Logo} alt="" id="start-button-img" />
              <span>Giu Zambot</span>
            </a>
            <div id="open-windows"></div>
          </div>
          <time id="clock" ref={clock} aria-label="Hora local"></time>
        </div>
    </main>
  );
}
