import { Layout } from "antd";
import { useEffect, useRef } from "react";
import Battery from "../../assets/battery.svg";
import Chevron from "../../assets/chevron-up.svg";
import Logo from "../../assets/logo.svg";
import Notification from "../../assets/notification.svg";
import Search from "../../assets/search.svg";
import Sound from "../../assets/sound-max.svg";
import wallpaper from "../../assets/wallpaper.gif";
import Bibi from "../../components/Bibi/Bibi";
import DesktopIcon from "../../components/DesktopIcons/DesktopIcons";
import "./Home.css";
import { defaultIcons } from "./Icons";
import { updateClock } from "./methods";

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
      <div className="windows">
        <div
          id="desktop"
          style={{
            background: `url(${wallpaper}) no-repeat center center`,
            backgroundSize: "100% 100%",
          }}
        >
          {defaultIcons.map((icon) => (
            <DesktopIcon key={icon.id} {...icon} />
          ))}
          <Bibi />
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
          ></div>
        </div>
        <div id="taskbar">
          <div id="start-button">
            <img src={Logo} alt="start-button" id="start-button-img" />
            <div id="search-bar">
              <img src={Search} alt="search-icon" id="search-icon" />
              <input type="text" placeholder="Pesquisar" id="search-input" />
            </div>
            <div id="open-windows"></div>
          </div>
          <div id="taskbar-icons">
            <div id="chevron-icon" className="taskbar-icon">
              <img src={Chevron} alt="chevron" />
            </div>
            <div id="battery-icon" className="taskbar-icon">
              <img src={Battery} alt="Battery" />
            </div>
            <div id="volume-icon" className="taskbar-icon">
              <img src={Sound} alt="Volume" />
            </div>
            <div id="clock" ref={clock}></div>
            <div id="notification-icon" className="taskbar-icon">
              <img src={Notification} alt="Notifications" />
            </div>
          </div>
        </div>
      </div>
    </Layout.Content>
  );
}
