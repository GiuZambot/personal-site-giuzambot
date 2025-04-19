import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingSpin } from "./components/LoadingSpin";
import "./index.css";

import { PrivacyPolicy } from "./screens/privacy/PrivacyPolicy";
import { ProfileGame } from "./widgets/ProfileGame/ProfileGame";

const Home = lazy(() => import("./screens/Home/Home"));

const Game = lazy(() => import("./widgets/GodotGame/GodotGame"));

const Musics = lazy(() => import("./screens/Music/Music"));

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music/:id" element={<Musics />} />
          <Route path="/games/cooking" element={<Game />} />
          <Route
            path="/games/island"
            element={<ProfileGame className="profileGame" />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
