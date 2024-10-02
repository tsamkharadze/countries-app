import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import japan from "./card-image/japan.svg.png";

const CountryCard: React.FC = () => {
  const country = {
    name: "Japan",
    population: 125800000,
    capital: "Tokyo",
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.countryCard}>
        <CardImage src={japan} alt="Japan Flag" />
        <div className={styles.cardText}>
          <CardHeader name={country.name} />
          <CardContent
            population={country.population}
            capital={country.capital}
          />
          <CardFooter moreInfo="MORE INFO" />
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
