import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { useReducer } from "react";
import AddCountryForm from "./add-country-form/add-country";
import countriesInitialState from "./reducer/state";
import { countriesReducer } from "./reducer/reducer";
import { useParams } from "react-router-dom";

// Define Country type
interface Country {
  imageSrc: string;
  nameKa: string;
  nameEn: string;
  population: number; // Ensure this is a number
  capitalKa: string;
  capitalEn: string; // Ensure this is included
  id: string;
  like: number;
  deleted: boolean; // Ensure this is present and not optional
  initialIndex?: number; // Optional if it is not always present
}

const CountryCard: React.FC = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();

  const [countriesList, dispatch] = useReducer(
    countriesReducer,
    countriesInitialState,
  );

  const handleLikeUp = (id: string) => () => {
    dispatch({ type: "like", payload: { id } });
  };

  const handleSortByLikes = (sortType: "asc" | "desc") => () => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateCountry = (countryFields: {
    nameKa: string;
    capitalKa: string;
    population: number; // Ensure this is a number
    imageSrc: string;
    nameEn: string; // Added for complete structure
    capitalEn: string; // Added for complete structure
  }) => {
    console.log(countryFields);
    dispatch({ type: "create", payload: { countryFields } });
  };

  const handleDeleteCountry = (id: string) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const handleRestoreCountry = (id: string) => {
    dispatch({ type: "restore", payload: { id } });
  };

  console.log(countriesList);

  return (
    <div>
      <div className={styles.manageCards}>
        <div className={styles.sortButton}>
          <button onClick={handleSortByLikes("asc")}>⬆️</button>
          <button onClick={handleSortByLikes("desc")}>⬇️</button>
        </div>
        <AddCountryForm onCreateCountry={handleCreateCountry} />
      </div>

      <div className={styles.cardContainer}>
        {countriesList.map((country: Country) => (
          <Card key={country.id} id={country.id} deleted={country.deleted}>
            <CardImage
              src={country.imageSrc}
              alt={country.nameKa || country.nameEn}
            />
            <div className={styles.cardText}>
              <CardHeader
                onLike={handleLikeUp(country.id)}
                likeCount={country.like}
                name={lang === "ka" ? country.nameKa : country.nameEn}
              />
              <CardContent
                population={country.population}
                capital={lang === "ka" ? country.capitalKa : country.capitalEn}
              />
              <CardFooter
                onDeleteCountry={() => handleDeleteCountry(country.id)}
                onRestoreCountry={() => handleRestoreCountry(country.id)}
                isDeleted={country.deleted} // Ensure this is always a boolean
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
