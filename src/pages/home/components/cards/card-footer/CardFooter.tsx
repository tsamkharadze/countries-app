import { useParams } from "react-router-dom";
import styles from "./CardFooter.module.css";

type CardFooterProps = {
  onDeleteCountry: () => void;
  onEditCountry: () => void;
};

const CardFooter: React.FC<CardFooterProps> = ({
  onDeleteCountry,
  onEditCountry,
}) => {
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
      <button
        onClick={(e) => {
          e.preventDefault();
          onEditCountry();
        }}
      >
        {currentLang === "ka" ? "რედაქტირება" : "Edit"}
      </button>
    </div>
  );
};

export default CardFooter;
