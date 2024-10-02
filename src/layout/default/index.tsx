import Footer from "@/components/base/footer/Footer";
import Header from "@/components/base/header/Header";
import { PageContainer } from "@/components/base/page-container/page-container";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
};

export default DefaultLayout;
