import styles from "./CardContent.module.css";

const CardContent: React.FC<{ population: number; capital: string }> = ({
  population,
  capital,
}) => {
  return (
    <div className={styles.cardContent}>
      <p>Population: {population}</p>
      <p>Capital: {capital}</p>
    </div>
  );
};

export default CardContent;
