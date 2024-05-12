import LoadingSpin from "./components/LoadingSpin";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
