import Battery from "../../assets/battery.svg";
import Bibi from "../../components/Bibi/Bibi";
import Chevron from "../../assets/chevron-up.svg";
import DesktopIcon from "../../components/DesktopIcons/DesktopIcons";
import Logo from "../../assets/logo.svg";
import Notification from "../../assets/notification.svg";
import Search from "../../assets/search.svg";
import Sound from "../../assets/sound-max.svg";
import wallpaper from "../../assets/wallpaper.gif";
import { defaultIcons } from "./Icons";
import { Layout } from "antd";
import { updateClock } from "./methods";
import { useEffect, useRef } from "react";
import "./Home.css";

export default function Home() {
  const clock = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (clock.current !== null) {
      timer = setInterval(() => updateClock(clock.current!), 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Layout.Content>
      <div className="windows">
        <div id="desktop"
          style={{
            background: `url(${wallpaper}) no-repeat center center`,
            backgroundSize: '100% 100%',
          }}
        >
          <div className="site-title">
            <h1>Giu Zambot</h1>
            <p>Games and Codes</p>
          </div>
          {defaultIcons.map(icon => (
            <DesktopIcon key={icon.id} {...icon} />
          ))}
          <Bibi />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          </div>
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
  )
}
