import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { useState } from "react";
import countriesData from "../../static/dummy-data";

const CountryCard: React.FC = () => {
  const [countriesList, setCountriesList] = useState<
    {
      imageSrc: string;
      name: string;
      capital: string;
      population: number;
      id: string;
      like: number;
    }[]
  >(countriesData);

  const handleLikeUp = (id: string) => {
    return () => {
      const updatedCountriesList = countriesList.map((country) => {
        if (country.id === id) {
          return { ...country, like: country.like + 1 };
        }
        return country;
      });

      setCountriesList(updatedCountriesList);
    };
  };

  const handleSortByLikes = () => {
    const sortedCountriesList = [...countriesList].sort(
      (a, b) => b.like - a.like
    );
    setCountriesList(sortedCountriesList);
  };

  return (
    <div>
      <button onClick={handleSortByLikes} className={styles.sortButton}>
        Sort by Likes
      </button>
      <div className={styles.cardContainer}>
        {countriesList.map((country) => (
          <Card key={country.id}>
            <CardImage src={country.imageSrc} alt={country.name} />
            <div className={styles.cardText}>
              <CardHeader
                onLike={handleLikeUp(country.id)}
                likeCount={country.like}
                {...country}
              />
              <CardContent {...country} />
              <CardFooter id={country.id} moreInfo="MORE INFO" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
