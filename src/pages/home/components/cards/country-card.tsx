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

const CountryCard: React.FC = () => {
  const [countriesList, dispatch] = useReducer(
    countriesReducer,
    countriesInitialState
  );

  const handleLikeUp = (id: string) => {
    return () => {
      dispatch({ type: "like", payload: { id } });
    };
  };

  const handleSortByLikes = (sortType: "asc" | "desc") => () => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateCountry = (countryFields: {
    name: string;
    capital: string;
    population: string;
  }) => {
    dispatch({ type: "create", payload: { countryFields } });
  };

  const handleDeleteCountry = (id: string) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const handleRestoreCountry = (id: string) => {
    dispatch({ type: "restore", payload: { id } });
  };

  return (
    <div>
      <div className={styles.manageCards}>
        <div className={styles.sortButton}>
          <button onClick={handleSortByLikes("asc")}>ascending</button>

          <button onClick={handleSortByLikes("desc")}>descending</button>
        </div>
        <AddCountryForm onCreateCountry={handleCreateCountry} />
      </div>

      <div className={styles.cardContainer}>
        {countriesList.map((country) => (
          <Card key={country.id} id={country.id} deleted={country.deleted}>
            <CardImage src={country.imageSrc} alt={country.name} />
            <div className={styles.cardText}>
              <CardHeader
                onLike={handleLikeUp(country.id)}
                likeCount={country.like}
                {...country}
              />
              <CardContent {...country} />
              <CardFooter
                moreInfo="MORE INFO"
                onDeleteCountry={() => handleDeleteCountry(country.id)}
                onRestoreCountry={() => handleRestoreCountry(country.id)}
                isDeleted={country.deleted}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
