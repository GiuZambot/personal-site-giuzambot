import { Layout } from "antd";
import { useEffect, useRef } from "react";
import Battery from "../../assets/battery.svg";
import Chevron from "../../assets/chevron-up.svg";
import wallpaper from "../../assets/fundo.png";
import Logo from "../../assets/logo.svg";
import Microphone from "../../assets/microbranco.png";
import Notification from "../../assets/notification.svg";
import Search from "../../assets/search.svg";
import Bat from "../../components/Bat/Bat";
import Bibi from "../../components/Bibi/Bibi";
import DesktopIcon from "../../components/DesktopIcons/DesktopIcons";
import ParticlesComponent from "../../components/Particles/Particles";
import Witch from "../../components/Witch/Witch";
import "./Home.css";
import { defaultIcons } from "./Icons";
import { updateClock } from "./methods";

// Placeholder for the startSpeechRecognition function
const startSpeechRecognition = () => {
  console.log("Speech recognition started!");
  // In a real application, this would initiate speech recognition
};

export default function Home() {
  const clock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clock.current !== null) {
      timer = setInterval(() => updateClock(clock.current!), 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Layout.Content>
      <div
        className="windows"
        style={{
          background: `url(${wallpaper}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <Witch />
        <Bat />
        <div id="desktop">
          {defaultIcons.map((icon, i) => (
            <DesktopIcon key={icon.id} top={i * 100 + 20} {...icon} />
          ))}
          <Bibi />
        </div>
        <div id="taskbar">
          <div className="taskbar-left">
            <div id="start-button">
              <img src={Logo} alt="start-button" id="start-button-img" />
            </div>
            <div id="search-bar">
              <img src={Search} alt="search-icon" id="search-icon" />
              <input type="text" placeholder="Pesquisar" id="search-input" />
            </div>
          </div>
          <div id="taskbar-icons">
            <div id="chevron-icon" className="taskbar-icon">
              <img src={Chevron} alt="chevron" />
            </div>
            <div id="battery-icon" className="taskbar-icon">
              <img src={Battery} alt="Battery" />
            </div>
            <div id="clock" ref={clock}></div>
            <div id="notification-icon" className="taskbar-icon">
              <img src={Notification} alt="Notifications" />
            </div>
            {/* New Microphone Button */}
            <div
              className="taskbar-icon microphone-button-container"
              onClick={startSpeechRecognition}
            >
              <img
                src={Microphone}
                alt="Microphone"
                className="microphone-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <ParticlesComponent />
    </Layout.Content>
  );
}
