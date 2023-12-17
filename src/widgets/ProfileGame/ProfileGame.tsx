import { useUnityContext, Unity } from "react-unity-webgl";

interface ProfileGameProps {
  className?: string;
}

export const ProfileGame = ({ className }: ProfileGameProps) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../../../public/profile-game/Build/profile-game.loader.js",
    dataUrl: "../../../public/profile-game/Build/profile-game.data.gz",
    frameworkUrl: "../../../public/profile-game/Build/profile-game.framework.js.gz",
    codeUrl: "../../../public/profile-game/Build/profile-game.wasm.gz",
  });

  return <Unity className={className} unityProvider={unityProvider} />;
}
