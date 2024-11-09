import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleCountryData } from "@/api/countries";

interface Country {
  id: string;
  nameKa: string;
  nameEn: string;
  capitalKa: string;
  capitalEn: string;
  population: number;
  imageSrc: string;
  like: number;
  deleted?: boolean;
  isEditting?: boolean;
  initialIndex?: number;
}

const CountryDetailView: React.FC = () => {
  const { id, lang } = useParams();

  const {
    data: country,
    error: detailViewError,
    isPending: pending,
  } = useQuery<Country>({
    queryKey: ["countries-detail-view", id],
    queryFn: () => getSingleCountryData(id as string),
  });

  if (detailViewError) {
    return <div>Country not found</div>;
  }

  if (pending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lang === "ka" ? country?.nameKa : country?.nameEn}</h1>
      <p>{country.population}</p>
      <p>
        {lang === "ka"
          ? `დედაქალაქი: ${country.capitalKa}`
          : `Capital: ${country.capitalEn}`}
      </p>
    </div>
  );
};

export default CountryDetailView;
