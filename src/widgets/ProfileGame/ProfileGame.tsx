import { useUnityContext, Unity } from "react-unity-webgl";

interface ProfileGameProps {
  className?: string;
}

export const ProfileGame = ({ className }: ProfileGameProps) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/profile-game/Build/profile-game.loader.js",
    dataUrl: "/profile-game/Build/profile-game.data",
    frameworkUrl: "/profile-game/Build/profile-game.framework.js",
    codeUrl: "/profile-game/Build/profile-game.wasm",
    companyName: "GiuZambot",
    productName: "Profile-game",
    productVersion: "0.1.0"
  });

  return <Unity className={className} unityProvider={unityProvider} />;
}
