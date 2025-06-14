import Capib from "../../assets/capib.png";
import Github from "../../assets/github.svg";
import Jep from "../../assets/jep.svg";
import LinkedIn from "../../assets/linkedin.svg";
import almatter from "../../assets/logo_almatter48x48.png";
import Youtube from "../../assets/youtube.svg";
import { IconProps } from "../../components/DesktopIcons/DesktopIcons";

interface IconsMap {
  [key: string]: IconProps[];
}

export const myGames: IconProps[] = [
  {
    id: "game-cooking",
    name: "Cooking(in develop)",
    img: Capib,
    top: 30,
    left: 20,
    url: "games/cooking",
  },
  {
    id: "profile-game",
    name: "Island Alone (old site home)",
    img: Capib,
    top: 130,
    left: 20,
    url: "/games/island",
  },
];

let musicId = 1;
export const myMusics: IconProps[] = [
  {
    id: `music-${musicId++}`,
    name: "Branches of the Immortal Tree",
    img: Youtube,
    top: 20,
    left: 20,
    url: "music/2n-rhIH5pEo",
  },
  {
    id: `music-${musicId++}`,
    name: "Your Shadow, My Light",
    img: Youtube,
    top: 120,
    left: 20,
    url: "music/rkYC6a7p9rg",
  },
  {
    id: `music-${musicId++}`,
    name: "Break the Pattern - Silesia",
    img: Youtube,
    top: 220,
    left: 20,
    url: "music/tmnX10F8lPo",
  },
  {
    id: `music-${musicId++}`,
    name: "Sunshine Jump",
    img: Youtube,
    top: 20,
    left: 120,
    url: "music/Q1GrtFi-QPo",
  },
  {
    id: `music-${musicId++}`,
    name: "Awaken the Dreamer",
    img: Youtube,
    top: 120,
    left: 120,
    url: "music/5vd9CNyZD-M",
  },
  {
    id: `music-${musicId++}`,
    name: "Ghost in the code",
    img: Youtube,
    top: 220,
    left: 120,
    url: "music/SgDvlWynW3I",
  },
  {
    id: `music-${musicId++}`,
    name: "Side by side",
    img: Youtube,
    top: 20,
    left: 220,
    url: "music/y4NR2cm0mOg",
  },
  {
    id: `music-${musicId++}`,
    name: "Rise and Conquer",
    img: Youtube,
    top: 120,
    left: 220,
    url: "music/Gm115Jdd0D8",
  },
  {
    id: `music-${musicId++}`,
    name: "Melhor amiga",
    img: Youtube,
    top: 220,
    left: 220,
    url: "music/q7fVuCqZFeg",
  },
  {
    id: `music-${musicId++}`,
    name: "Becoming the destroyer",
    img: Youtube,
    top: 20,
    left: 320,
    url: "music/whDS8XM8N4Y",
  },
  {
    id: `music-${musicId++}`,
    name: "Echoes of Freedom",
    img: Youtube,
    top: 120,
    left: 320,
    url: "music/qrb5qi4Gqpc",
  },
  {
    id: `music-${musicId++}`,
    name: "The treasure",
    img: Youtube,
    top: 220,
    left: 320,
    url: "music/8_2_3zIMBbU",
  },
  {
    id: `music-${musicId++}`,
    name: "Eternal",
    img: Youtube,
    top: 20,
    left: 420,
    url: "music/4Duax63ZuZQ",
  },
  {
    id: `music-${musicId++}`,
    name: "Embrace the tide",
    img: Youtube,
    top: 120,
    left: 420,
    url: "music/tQeBrOqEF-c",
  },
  {
    id: `music-${musicId++}`,
    name: "I Feel Good",
    img: Youtube,
    top: 220,
    left: 420,
    url: "music/zjWCih6ucfA",
  },
  {
    id: `music-${musicId++}`,
    name: "Not Me Anymore",
    img: Youtube,
    top: 20,
    left: 20,
    url: "music/LRnBs2us548",
  },
  {
    id: `music-${musicId++}`,
    name: "Hope's Horizon",
    img: Youtube,
    top: 120,
    left: 20,
    url: "music/oIopgGnM1LM",
  },
  {
    id: `music-${musicId++}`,
    name: "Acceptance Blooms",
    img: Youtube,
    top: 220,
    left: 20,
    url: "music/uh4rzTqsqfw",
  },
  {
    id: `music-${musicId++}`,
    name: "Dancing to the end",
    img: Youtube,
    top: 20,
    left: 120,
    url: "music/fb_YBcE-OLU",
  },
  {
    id: `music-${musicId++}`,
    name: "Ephemeral Waltz",
    img: Youtube,
    top: 120,
    left: 120,
    url: "music/rtyAvbZYG4U",
  },
  {
    id: `music-${musicId++}`,
    name: "In Case of Love",
    img: Youtube,
    top: 220,
    left: 120,
    url: "music/2J1DCHrxr38",
  },
  {
    id: `music-${musicId++}`,
    name: "Let Go Their Whispers",
    img: Youtube,
    top: 20,
    left: 220,
    url: "music/ZRD4XSwTY98",
  },
  {
    id: `music-${musicId++}`,
    name: "Endless Ocean of Life",
    img: Youtube,
    top: 120,
    left: 220,
    url: "music/jk_JipWv9tw",
  },
  {
    id: `music-${musicId++}`,
    name: "Wounded Sky",
    img: Youtube,
    top: 220,
    left: 220,
    url: "music/HIDDEN_VIDEO_ID_1",
  },
  {
    id: `music-${musicId++}`,
    name: "Aether's Calling",
    img: Youtube,
    top: 20,
    left: 320,
    url: "music/HIDDEN_VIDEO_ID_2",
  },
];

const initialPosition = 100;

export const defaultIcons: IconProps[] = [
  {
    id: "Games",
    name: "My Games",
    img: Capib,
    top: initialPosition,
    left: 30,
    type: "folder",
    content: "myGames",
  },
  {
    id: "Musics",
    name: "My Musics",
    img: Youtube,
    top: initialPosition + 100,
    left: 30,
    type: "folder",
    content: "myMusics",
  },
  {
    id: "almatter",
    name: "almatter games",
    img: almatter,
    top: initialPosition + 200,
    left: 30,
    url: "https://almatter.com.br/",
  },
  {
    id: "LinkedIn",
    name: "LinkedIn",
    img: LinkedIn,
    top: initialPosition + 300,
    left: 30,
    type: "external",
    url: "https://www.linkedin.com/in/giuzambot",
  },
  {
    id: "GitHub",
    name: "GitHub",
    img: Github,
    top: initialPosition + 400,
    left: 30,
    type: "external",
    url: "https://github.com/giuzambot",
  },
  {
    id: "Jep",
    name: "JEP",
    img: Jep,
    top: initialPosition + 500,
    left: 30,
    url: "https://jep.vercel.app/",
  },
];

export const iconsMap: IconsMap = {
  myGames,
  myMusics,
  defaultIcons,
};
