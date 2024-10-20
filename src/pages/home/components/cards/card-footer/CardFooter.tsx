import { useParams } from "react-router-dom";
import styles from "./CardFooter.module.css";

type CardFooterProps = {
  onDeleteCountry: () => void;
  onRestoreCountry: () => void;
  isDeleted: boolean;
};

const CardFooter: React.FC<CardFooterProps> = ({
  onDeleteCountry,
  onRestoreCountry,
  isDeleted,
}) => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";

  return (
    <div>
      <p className={styles.moreInfo}>
        {currentLang === "ka" ? "მეტი" : "MORE"}
      </p>
      {!isDeleted ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDeleteCountry();
          }}
        >
          {currentLang === "ka" ? "ქვეყნის წაშლა" : "Delete Country"}
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRestoreCountry();
          }}
        >
          {currentLang === "ka" ? "ქვეყნის აღდგენა" : " Restore Country"}
        </button>
      )}
    </div>
  );
};

export default CardFooter;
