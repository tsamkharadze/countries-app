// import Hero from "@/pages/home/components/hero/Hero";
// import CountryCard from "@/pages/home/components/card/Card";
import { lazy } from "react";

const LazyHero = lazy(() => import("@/pages/home/components/hero/Hero"));
const LazyCountryCard = lazy(
  () => import("@/pages/home/components/cards/country-card")
);

const Homeview = () => {
  return (
    <>
      <LazyHero />
      <LazyCountryCard />
    </>
  );
};

export default Homeview;
