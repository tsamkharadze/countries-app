import { useParams } from "react-router-dom";
import countriesInitialState from "../components/cards/reducer/state";

const CountryDetailView: React.FC = () => {
  const { id, lang } = useParams(); // Destructure lang from useParams
  const country = countriesInitialState.find((country) => country.id === id);

  const countryError = !country;
  if (countryError) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <h1>{lang === "ka" ? country.nameKa : country.nameEn}</h1>
      <p>{country.population}</p>
      <p>
        {lang === "ka"
          ? `დედაქალაქი: ${country.capitalKa}` // Corrected to capitalKa
          : `Capital: ${country.capitalEn}`} // Corrected to capitalEn
      </p>
    </div>
  );
};

export default CountryDetailView;
