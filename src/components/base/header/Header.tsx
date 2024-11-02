import styles from "@/components/base/header/Header.module.css";
import logo from "@/components/base/header/globe-2-svgrepo-com.svg";
import LanguageSwitcher from "@/layout/default/language-switcher/languageSwitcher";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

type Language = "ka" | "en";

type HeaderProps = {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
};

const translations = {
  ka: {
    home: "მთავარი",
    explore: "გაეცანი",
    continents: "კონტინენტები",
    contact: "კონტაქტი",
    otp: "OTP",
    about: "ჩვენს შესახებ",
  },
  en: {
    home: "Home",
    explore: "Explore Countries",
    continents: "Continents",
    contact: "Contact",
    otp: "OTP",
    about: "About Us",
  },
};

const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange }) => {
  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;
    return isActive ? styles["active-nav"] : styles["nav"];
  };

  return (
    <div className={styles.header}>
      <div>
        <Link className={styles.logo} to={`/${lang}/home`}>
          <img src={logo} alt="logo" className={styles["logo-img"]} />
          <p>CountryScope</p>
        </Link>
      </div>
      <div className={styles.nav}>
        <NavLink className={handleActiveNav} to={`/${lang}/home`}>
          <p>{translations[lang].home}</p>
        </NavLink>
        <NavLink className={handleActiveNav} to={`/${lang}/explore`}>
          <p>{translations[lang].explore}</p>
        </NavLink>
        <NavLink className={handleActiveNav} to={`/${lang}/continents`}>
          <p>{translations[lang].continents}</p>
        </NavLink>
        <NavLink className={handleActiveNav} to={`/${lang}/contact`}>
          <p>{translations[lang].contact}</p>
        </NavLink>
        <NavLink className={handleActiveNav} to={`/${lang}/OTP`}>
          <p>{translations[lang].otp}</p>
        </NavLink>
        <NavLink className={handleActiveNav} to={`/${lang}/about`}>
          <p>{translations[lang].about}</p>
        </NavLink>
        <LanguageSwitcher
          currentLang={lang}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </div>
  );
};

export default Header;
