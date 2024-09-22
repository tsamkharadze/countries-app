import "./card.css";
import japan from "./japan.svg.png";
interface Country {
  name: string;
  population: number;
  capital: string;
}

const country: Country = {
  name: "Japan",
  population: 125800000,
  capital: "Tokyo",
};

const CountryCard = () => {
  return (
    <div className="card-container">
      <div className="country-card">
        <div className="country-card-img">
          <img src={japan} alt="japan-flag" className="country-card-flag" />
        </div>
        <div className="country-card-text">
          <h2>{country.name}</h2>
          <p>Population: {country.population}</p>
          <p>Capital: {country.capital}</p>
        </div>
        <p className="more-info">MORE INFO</p>
      </div>
    </div>
  );
};

export default CountryCard;
