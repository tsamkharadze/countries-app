import { useParams } from "react-router-dom";
import styles from "./CardFooter.module.css";

type CardFooterProps = {
  onDeleteCountry: () => void;
};

const CardFooter: React.FC<CardFooterProps> = ({ onDeleteCountry }) => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";

  return (
    <div>
      <p className={styles.moreInfo}>
        {currentLang === "ka" ? "მეტი" : "MORE"}
      </p>

      <button
        onClick={(e) => {
          e.preventDefault();
          onDeleteCountry();
        }}
      >
        {currentLang === "ka" ? "ქვეყნის წაშლა" : "Delete Country"}
      </button>
    </div>
  );
};

export default CardFooter;
