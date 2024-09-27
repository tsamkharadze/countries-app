import Hero from "@/components/hero/Hero";
import CountryCard from "@/components/card/Card";
import Layout from "@/components/layout";

function App() {
  return (
    <>
      <div>
        <Layout>
          <Hero />
          <CountryCard />
        </Layout>
      </div>
    </>
  );
}

export default App;
