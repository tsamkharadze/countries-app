import { useParams } from "react-router-dom";
import styles from "./CardContent.module.css";

const CardContent: React.FC<{ population: number; capital: string }> = ({
  population,
  capital,
}) => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";
  return (
    <div className={styles.cardContent}>
      <p>
        {currentLang === "ka" ? "მოსახლეობა" : "Population"}: {population}
      </p>
      <p>
        {currentLang === "ka" ? "დედაქალაქი" : "Capital"}: {capital}
      </p>
    </div>
  );
};

export default CardContent;
