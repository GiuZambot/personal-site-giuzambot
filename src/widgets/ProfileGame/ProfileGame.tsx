import { useUnityContext, Unity } from "react-unity-webgl";

interface ProfileGameProps {
  className?: string;
}

export const ProfileGame = ({ className }: ProfileGameProps) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/profile-game/Build/profile-game.loader.js",
    dataUrl: "/profile-game/Build/profile-game.data.gz",
    frameworkUrl: "/profile-game/Build/profile-game.framework.js.gz",
    codeUrl: "/profile-game/Build/profile-game.wasm.gz",
  });

  return <Unity className={className} unityProvider={unityProvider} />;
}
