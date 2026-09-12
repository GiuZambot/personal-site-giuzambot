import almatter from "../../assets/optimized/alma.webp";
import Capib from "../../assets/optimized/capib.webp";
import CardEvolution from "../../assets/games/card-evolution.webp";
import Exodus from "../../assets/games/exodus.webp";
import ReturnedVesperNetwork from "../../assets/games/returned-vesper-network.webp";
import SavingCapybaras from "../../assets/games/saving-capybaras.webp";
import SpaceNomadEchoes from "../../assets/games/space-nomad-echoes.webp";
import SpaceRunner from "../../assets/games/space-runner.webp";
import GameIcon from "../../assets/optimized/chapeu.webp";
import Github from "../../assets/optimized/github.webp";
import LinkedIn from "../../assets/optimized/likedin.webp";
import GiuIcon from "../../assets/optimized/mulher.webp";
import Vela from "../../assets/optimized/vela.webp";
import Youtube from "../../assets/youtube.svg";
import type { IconProps } from "../../components/DesktopIcons/DesktopIcons";

interface IconsMap {
  [key: string]: IconProps[];
}

export const myGames: IconProps[] = [
  {
    id: "game-returned-vesper-network",
    name: "Returned: Vesper Network",
    img: ReturnedVesperNetwork,
    url: "https://almatter.com.br/pt-BR/games/returned-vesper-network",
    type: "external",
  },
  {
    id: "game-exodus",
    name: "Exodus",
    img: Exodus,
    url: "https://almatter.com.br/pt-BR/games/exodus",
    type: "external",
  },
  {
    id: "game-saving-capybaras",
    name: "Saving Capybaras",
    img: SavingCapybaras,
    url: "https://almatter.com.br/pt-BR/games/saving-capybaras",
    type: "external",
  },
  {
    id: "game-space-runner",
    name: "Space Runner",
    img: SpaceRunner,
    url: "https://almatter.com.br/pt-BR/games/space-runner",
    type: "external",
  },
  {
    id: "game-space-nomad-echoes",
    name: "Space Nomad Echoes",
    img: SpaceNomadEchoes,
    url: "https://almatter.com.br/pt-BR/games/space-nomad-echoes",
    type: "external",
  },
  {
    id: "game-card-evolution",
    name: "Card Evolution",
    img: CardEvolution,
    url: "https://almatter.com.br/pt-BR/games/card-evolution",
    type: "external",
  },
  {
    id: "profile-game",
    name: "Island Alone — clássico",
    img: Capib,
    url: "/games/island",
    type: "external",
  },
];

const musicVideos = [
  ["ZW3dYkdJyY0", "Ainda é hoje"],
  ["LnJ1Q0Zzc1o", "Ode to Myself"],
  ["KsmwH3lm8Io", "Manifest in Motion"],
  ["2n-rhIH5pEo", "Branches of the Immortal Tree"],
  ["rkYC6a7p9rg", "Your Shadow, My Light"],
  ["tmnX10F8lPo", "Break the Pattern"],
  ["Q1GrtFi-QPo", "Sunshine Jump"],
  ["5vd9CNyZD-M", "Awaken the Dreamer"],
  ["SgDvlWynW3I", "Ghost in the Code"],
  ["y4NR2cm0mOg", "Side by Side"],
  ["Gm115Jdd0D8", "Rise and Conquer"],
  ["q7fVuCqZFeg", "Melhor Amiga"],
  ["whDS8XM8N4Y", "Becoming the Destroyer"],
  ["qrb5qi4Gqpc", "Echoes of Freedom"],
  ["8_2_3zIMBbU", "The Treasure"],
  ["4Duax63ZuZQ", "Eternal"],
  ["tQeBrOqEF-c", "Embrace the Tide"],
  ["zjWCih6ucfA", "I Feel Good"],
  ["aHVHXshuEw0", "Not Me Anymore 3"],
  ["LRnBs2us548", "Not Me Anymore 2"],
  ["9boAh2l7a9o", "Not Me Anymore 1"],
  ["oIopgGnM1LM", "Hope's Horizon"],
  ["uh4rzTqsqfw", "Acceptance Blooms"],
  ["fb_YBcE-OLU", "Dancing to the End"],
  ["rtyAvbZYG4U", "Ephemeral Waltz"],
  ["2J1DCHrxr38", "In Case of Love"],
  ["ZRD4XSwTY98", "Let Go Their Whispers"],
  ["jk_JipWv9tw", "Endless Ocean of Life"],
] as const;

export const myMusics: IconProps[] = musicVideos.map(
  ([videoId, name], index) => ({
    id: `music-${index + 1}`,
    name,
    img: Youtube,
    url: `/music/${videoId}`,
    type: "route",
  }),
);

export const defaultIcons: IconProps[] = [
  {
    id: "bio",
    name: "Biografia",
    img: GiuIcon,
    url: "/bio",
    type: "route",
  },
  {
    id: "almatter",
    name: "Almatter",
    img: almatter,
    type: "external",
    url: "https://almatter.com.br/pt-BR/games",
  },
  {
    id: "LinkedIn",
    name: "LinkedIn",
    img: LinkedIn,
    type: "external",
    url: "https://www.linkedin.com/in/giuzambot",
  },
  {
    id: "Games",
    name: "Games",
    img: GameIcon,
    type: "folder",
    content: "myGames",
  },
  {
    id: "Musics",
    name: "Music",
    img: Vela,
    type: "folder",
    content: "myMusics",
  },
  {
    id: "GitHub",
    name: "GitHub",
    img: Github,
    type: "external",
    url: "https://github.com/giuzambot",
  },
];

export const iconsMap: IconsMap = {
  myGames,
  myMusics,
  defaultIcons,
};
