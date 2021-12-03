import { lazy, Suspense } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoadingSpin from "./components/LoadingSpin";

const Home = lazy(
  () => import("./screens/Home")
);

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Suspense>
  );
}