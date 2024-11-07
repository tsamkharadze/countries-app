import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCountriesData } from "@/api/countries";

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
  // const [country, setCountry] = useState<Country>();
  // const countryId = country.find((country) => country.id === id);

  const { data: country, error: detailViewError } = useQuery({
    queryKey: ["countries-detail.view"],
    queryFn: async () => {
      const data = await getCountriesData();

      const detailCountry = data.find((country: Country) => country.id === id);
      return detailCountry;
      console.log(data);
    },
  });
  console.log(country);

  if (detailViewError) {
    return <div>Country not found</div>;
  }

  if (!country) {
    return <div>Loading...</div>;
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
