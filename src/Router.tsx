import LoadingSpin from "./components/LoadingSpin";
import { lazy, Suspense } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const Home = lazy(
  () => import("./screens/Home/Home")
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
