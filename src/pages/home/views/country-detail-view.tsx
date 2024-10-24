import { useParams } from "react-router-dom";
// import countriesList from "../static/dummy-data";
import countriesInitialState from "../components/cards/reducer/state";
const CountryDetailView: React.FC = () => {
  const { id } = useParams();
  const country = countriesInitialState.find((country) => country.id == id);

  const { lang } = useParams();

  const countryError = !country;
  if (countryError) {
    return <div>Country not found </div>;
  }

  return (
    <div>
      <h1>{lang === "ka" ? country.nameKa : country.nameEn}</h1>
      <p>{country.population}</p>
      <p>
        {lang === "ka"
          ? `დედაქალაქი: ${country.capitalKA}`
          : `Capital: ${country.capital}`}
      </p>
    </div>
  );
};

export default CountryDetailView;
