import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homeview from "./pages/home/views/home";
import DefaultLayout from "./layout/default";
import AboutVieW from "./pages/about/view";
import ExploreCountriesView from "./pages/explore-countries/view";
import Continents from "./pages/continents/view";
import { Suspense } from "react";
import CountryDetailView from "./pages/home/views/country-detail-view";
import ContactView from "./pages/contact/view";
import OtpView from "./pages/OTP/views";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<DefaultLayout />}>
          <Route
            path="home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Homeview />
              </Suspense>
            }
          />
          <Route path="explore" element={<ExploreCountriesView />} />
          <Route path="continents" element={<Continents />} />
          <Route path="contact" element={<ContactView />} />
          <Route path="OTP" element={<OtpView/>}/>
          <Route path="about" element={<AboutVieW />} />
          <Route path="countries/:id" element={<CountryDetailView />} />
        </Route>
        <Route path="/" element={<Navigate to="/ka/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
