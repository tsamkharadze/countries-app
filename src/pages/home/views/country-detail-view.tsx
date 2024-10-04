import { useParams } from "react-router-dom";
import countriesList from "../static/dummy-data";
const CountryDetailView: React.FC = () => {
  const { id } = useParams();
  const country = countriesList.find((country) => country.id == id);

  const countryError = !country;
  if (countryError) {
    return <div>Country not found </div>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>{country.population}</p>
      <p>Capital: {country.capital}</p>
    </div>
  );
};

export default CountryDetailView;
