import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homeview from "./pages/home/views/home";
import DefaultLayout from "./layout/default";
import AboutVieW from "./pages/about/view";
import ExploreCountriesView from "./pages/explore-countries/view";
import Continents from "./pages/continents/view";
import { Suspense } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Homeview />
                </Suspense>
              }
            />
            <Route path="about" element={<AboutVieW />} />
            <Route path="explore" element={<ExploreCountriesView />} />
            <Route path="continents" element={<Continents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
