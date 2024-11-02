import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Country {
  id: string;
  nameKa: string;
  nameEn: string;
  population: number;
  capitalKa: string;
  capitalEn: string;
}
const CountryDetailView: React.FC = () => {
  const { id, lang } = useParams(); // Destructure lang from useParams
  const [country, setCountry] = useState<Country>();
  // const countryId = country.find((country) => country.id === id);

  useEffect(
    () => {
      axios.get("http://localhost:3000/countries").then((response) => {
        const countryId = response.data.find(
          (country: Country) => country.id === id,
        );
        setCountry(countryId);
      });
    },
    //eslint-disable-next-line
    [],
  );

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
          : `Capital: ${country.capitalEn}`}{" "}
      </p>
    </div>
  );
};

export default CountryDetailView;
