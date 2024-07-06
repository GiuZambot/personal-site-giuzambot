import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpin } from "./components/LoadingSpin";
import { PrivacyPolicyTappyEscape } from "./screens/privacy/tappyescape/PrivacyPolice";

const Home = lazy(
  () => import("./screens/Home/Home")
);

const Game = lazy(
  () => import("./screens/Home/GameHome")
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
          <Route path="/privacy/tappyescape" element={<PrivacyPolicyTappyEscape />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
