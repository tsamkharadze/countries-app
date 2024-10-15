import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { FormEvent, useReducer } from "react";
// import countriesData from "../../static/dummy-data";
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

      // setCountriesList(updatedCountriesList);
    };
  };

  const handleSortByLikes = (sortType: "asc" | "desc") => () => {
    dispatch({ type: "sort", payload: { sortType } });

    // setCountriesList(sortedCountriesList);
  };

  const handleCreateCountry = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const countryFields: any = {};

    const formData = new FormData(e.currentTarget);
    for (const [key, value] of formData) {
      countryFields[key] = value;
    }

    dispatch({ type: "create", payload: { countryFields } });

    // setCountriesList(changedCountriesList);
    // console.log(countryFields);
  };

  const handleDeleteCountry = (id: string) => {
    dispatch({ type: "delete", payload: { id } });

    // setCountriesList(filteredCountryList);
  };

  const handleRestoreCountry = (id: string) => {
    dispatch({ type: "restore", payload: { id } });
  };

  // imageSrc: string;
  // name: string;
  // capital: string;
  // population: number;
  // id: string;
  // like: number;

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
