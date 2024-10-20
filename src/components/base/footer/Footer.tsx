import styles from "@/components/base/footer/Footer.module.css";
import { useParams } from "react-router-dom";

const Footer: React.FC = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";

  return (
    <footer className={styles.footer}>
      <p>
        {currentLang === "ka"
          ? "© 2024 CountryScope. ყველა უფლება დაცულია"
          : "© 2024 CountryScope. All Rights Reserved."}
      </p>
    </footer>
  );
};
export default Footer;
