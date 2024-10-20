import Footer from "@/components/base/footer/Footer";
import Header from "@/components/base/header/Header";
import { PageContainer } from "@/components/base/page-container/page-container";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

type Language = "ka" | "en";

const DefaultLayout: React.FC = () => {
  const { lang } = useParams<{ lang: Language }>();
  const [currentLang, setLang] = useState<Language>(lang || "ka");
  const navigate = useNavigate();

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    navigate(`/${newLang}/home`); // Redirect to the home page of the new language
  };

  return (
    <>
      <Header lang={currentLang} onLanguageChange={handleLanguageChange} />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
};

export default DefaultLayout;
