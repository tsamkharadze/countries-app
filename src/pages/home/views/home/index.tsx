// import Hero from "@/pages/home/components/hero/Hero";
// import CountryCard from "@/pages/home/components/card/Card";
import { lazy, Suspense } from "react";

const LazyHero = lazy(() => import("@/pages/home/components/hero/Hero"));
const LazyCountryCard = lazy(() => import("@/pages/home/components/card/Card"));

const Homeview = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyHero />
      <LazyCountryCard />
    </Suspense>
  );
};

export default Homeview;
