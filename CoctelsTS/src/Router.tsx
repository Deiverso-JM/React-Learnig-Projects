import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import Layout from "./layouts/Layout";
import { lazy, Suspense } from "react";

export default function AppRouter() {

  const FavoritesPage =lazy(() => import('./views/FavoritesPage'))
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback="Cargando...">
              <IndexPage />
            </Suspense> 
            } index></Route>
          <Route path="/favoritos" element={
             <Suspense fallback="Cargando..." >
              <FavoritesPage/>
             </Suspense>
          }></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
