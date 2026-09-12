import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingSpin } from "./components/LoadingSpin";
import "./index.css";
import ArticlePage from "./screens/Articles/ArticlePage";
import ArticlesIndex from "./screens/Articles/ArticlesIndex";
import Home from "./screens/Home/Home";

const Musics = lazy(() => import("./screens/Music/Music"));
const Bio = lazy(() => import("./screens/Bio/Bio"));
const PrivacyPolicy = lazy(() =>
  import("./screens/privacy/PrivacyPolicy").then((module) => ({
    default: module.PrivacyPolicy,
  }))
);
const ProfileGame = lazy(() =>
  import("./widgets/ProfileGame/ProfileGame").then((module) => ({
    default: module.ProfileGame,
  }))
);
const NotFound = lazy(() => import("./screens/NotFound/NotFound"));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<ArticlesIndex />} />
        <Route path="/artigos/:slug" element={<ArticlePage />} />
        <Route path="/music/:id" element={<Musics />} />
        <Route path="/music" element={<Musics />} />
        <Route
          path="/games/island"
          element={<ProfileGame className="profileGame" />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
