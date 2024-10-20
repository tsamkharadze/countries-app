import { useParams } from "react-router-dom";
import styles from "./Hero.module.css";

const translations = {
  ka: {
    title: "თქვენი გზამკვლევი ქვეყნების შესახებ",
    subtitle:
      "არ აქვს მნიშვნელობა თუ ვინ ხარ, სტუდენტი მოგზაური თუ ენთუზიასტი. აქ დაგხვდება ყველაფერი შენთვის საინტერესო ქვეყნის შესახებ ",
  },
  en: {
    title: "Your Ultimate Guide to Countries and Their Stories",
    subtitle:
      "Whether you're a traveler, student, or just curious, explore everything you need to know about the nations of the world.",
  },
};

const Hero: React.FC = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";

  return (
    <div className={styles.hero}>
      <div className={styles["hero-text"]}>
        <p className={styles["hero-headline"]}>
          {translations[currentLang].title}
        </p>
        <p className={styles["hero-subheadline"]}>
          {translations[currentLang].subtitle}
        </p>
      </div>
    </div>
  );
};

export default Hero;
