import { Layout } from "antd";
import "./Home.css"

import Battery from '../../assets/battery.svg'
import Logo from '../../assets/logo.svg'
import Search from '../../assets/search.svg'
import Chevron from '../../assets/chevron-up.svg'
import Sound from '../../assets/sound-max.svg'
import Notification from '../../assets/notification.svg'

import Capib from '../../assets/capib.png'
import CapibMouth from '../../assets/capib-mouth.png'

import { useEffect, useRef } from "react";
import { updateClock } from "./methods";
import DesktopIcon from "./DesktopIcons";

const defaultIcons = [
  {
    id: "icon4",
    name: "game rel",
    img: "../../assets/capib.png",
    top: 550,
    left: 50,
    url: "games/cooking",
  },
  {
    id: "icon5",
    name: "Music",
    img: "../../assets/capib.png",
    top: 650,
    left: 50,
    url: "music",
  },
  {
    id: "icon6",
    name: "Cooking",
    img: "../../assets/capib.png",
    top: 750,
    left: 50,
    url: "https://localhost:5173/games/cooking",
  },
];

let voices = []

export default function Home() {
  const clock = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (clock.current !== null) {
      timer = setInterval(() => updateClock(clock.current!), 1000)
    }


    const loadVoices = () => {
      voices = window.speechSynthesis.getVoices()
      console.log(voices);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = function () { loadVoices(); }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Layout.Content>
      <div className="windows">
        <div id="desktop">
          <div id="icons">
            {defaultIcons.map(icon => (
            <DesktopIcon key={icon.id} {...icon} />
            ))}
          </div>
          <div id="capybara-widget" className="widget">
            <div className="capybara">
              <div className="eye left-eye">
                <div className="eyelid"></div>
              </div>
              <div className="eye right-eye">
                <div className="eyelid"></div>
              </div>
              <img src={Capib} alt="Capybara" id="capybara-img" />
              <img src={CapibMouth} className="capybara-mouth" alt="Capybara Mouth" id="capybara-mouth" />
            </div>
            <input type="text" id="input-text" placeholder="Type a message" hidden />
            <div id="responses"></div>
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
