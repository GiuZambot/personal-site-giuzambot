import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpin } from "./components/LoadingSpin";
import { PrivacyPolicyTappyEscape } from "./screens/privacy/tappyescape/PrivacyPolice";
import { ProfileGame } from "./widgets/ProfileGame/ProfileGame";
import "./index.css";

const Home = lazy(
  () => import("./screens/Home/Home")
);

const Game = lazy(
  () => import("./widgets/GodotGame/GodotGame")
);

const Musics = lazy(
  () => import("./screens/Music/Music")
);

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/music' element={<Musics />} />
          <Route path="/games/cooking" element={<Game />} />
          <Route path="/games/island" element={<ProfileGame className="profileGame" />} />
          <Route path="/privacy/tappyescape" element={<PrivacyPolicyTappyEscape />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
