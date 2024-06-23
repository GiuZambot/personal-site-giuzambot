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

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/games/cooking" element={<Game />} />
          <Route path="/privacy/tappyescape" element={<PrivacyPolicyTappyEscape />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
