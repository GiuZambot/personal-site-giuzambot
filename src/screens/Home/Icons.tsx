import Capib from '../../assets/capib.png'
import LinkedIn from '../../assets/linkedin.svg'
import Github from '../../assets/github.svg'
import { IconProps } from '../../components/DesktopIcons/DesktopIcons';

interface IconsMap {
  [key: string]: IconProps[];
}

export const myGames: IconProps[] = [
  {
    id: "game-cooking",
    name: "Game Cooking",
    img: Capib,
    top: 30,
    left: 20,
    url: "games/cooking",
  },
  {
    id: "profile-game",
    name: "Island Alone",
    img: Capib,
    top: 130,
    left: 20,
    url: "/games/island",
  }
];

const initialPosition = 100

export const defaultIcons: IconProps[] = [
  {
    id: "Games",
    name: "My Games",
    img: Capib,
    top: initialPosition,
    left: 30,
    type: 'folder',
    content: 'myGames',
  },
  {
    id: "Musics",
    name: "My Musics",
    img: Capib,
    top: initialPosition + 100,
    left: 30,
    url: "music",
  },
  {
    id: "LinkedIn",
    name: "LinkedIn",
    img: LinkedIn,
    top: initialPosition + 200,
    left: 30,
    type: 'external',
    url: 'https://www.linkedin.com/in/giuzambot',
  },
  {
    id: "GitHub",
    name: "GitHub",
    img: Github,
    top: initialPosition + 300,
    left: 30,
    type: 'external',
    url: 'https://github.com/giuzambot',
  }
];


export const iconsMap: IconsMap = {
  myGames,
  defaultIcons
}
