import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import countriesList from "../../static/dummy-data";
import Card from "./card/card";

const CountryCard: React.FC = () => {
  // const country = {
  //   name: "Japan",
  //   population: 125800000,
  //   capital: "Tokyo",
  // };

  return (
    <div className={styles.cardContainer}>
      <Card id={countriesList[0].id}>
        <CardImage
          src={countriesList[0].imageSrc}
          alt={countriesList[0].name}
        />
        <div className={styles.cardText}>
          <CardHeader {...countriesList[0]} />
          <CardContent {...countriesList[0]} />
          <CardFooter moreInfo="MORE INFO" />
        </div>
      </Card>
      <Card id={countriesList[1].id}>
        <CardImage
          src={countriesList[1].imageSrc}
          alt={countriesList[1].name}
        />
        <div className={styles.cardText}>
          <CardHeader {...countriesList[1]} />
          <CardContent {...countriesList[1]} />
          <CardFooter moreInfo="MORE INFO" />
        </div>
      </Card>
      <Card id={countriesList[2].id}>
        <CardImage
          src={countriesList[2].imageSrc}
          alt={countriesList[2].name}
        />
        <div className={styles.cardText}>
          <CardHeader {...countriesList[2]} />
          <CardContent {...countriesList[2]} />
          <CardFooter moreInfo="MORE INFO" />
        </div>
      </Card>
      <Card id={countriesList[3].id}>
        <CardImage
          src={countriesList[3].imageSrc}
          alt={countriesList[3].name}
        />
        <div className={styles.cardText}>
          <CardHeader {...countriesList[3]} />
          <CardContent {...countriesList[3]} />
          <CardFooter moreInfo="MORE INFO" />
        </div>
      </Card>
    </div>
  );
};

export default CountryCard;
