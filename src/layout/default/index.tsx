import Footer from "@/components/base/footer/Footer";
import Header from "@/components/base/header/Header";
import { PageContainer } from "@/components/base/page-container/page-container";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

type Language = "ka" | "en";

const DefaultLayout: React.FC = () => {
  const { lang } = useParams<{ lang: Language }>();
  const [currentLang, setLang] = useState<Language>(lang || "ka");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    const newPath = location.pathname.replace(`${currentLang}`, `${newLang}`);
    navigate(newPath);
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
