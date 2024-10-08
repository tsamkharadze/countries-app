import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { useState } from "react";

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
  >([
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
      name: "Japan",
      population: 125800000,
      capital: "Tokyo",
      id: "1",
      like: 0,
    },
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
      name: "Germany",
      population: 83100000,
      capital: "Berlin",
      id: "2",
      like: 0,
    },
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg",
      name: "Canada",
      population: 38000000,
      capital: "Ottawa",
      id: "3",
      like: 0,
    },
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      name: "Australia",
      population: 25690000,
      capital: "Canberra",
      id: "4",
      like: 0,
    },
  ]);

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
