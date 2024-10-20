import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./add-country-form.module.css";
import { useParams } from "react-router-dom";

type AddCountryFormProps = {
  onCreateCountry: (countryFields: {
    name: string;
    capital: string;
    population: string;
  }) => void;
};

const translations = {
  ka: {
    name: "ქვეყნის სახელი",
    capital: "დედაქალაქი",
    population: "მოსახლეობა",
  },
  en: { name: "Name", capital: "Capital", population: "Population" },
};

const AddCountryForm: React.FC<AddCountryFormProps> = ({ onCreateCountry }) => {
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");

  const [capitalFieldErrorMsg, setCapitalFieldErrorMsg] = useState("");
  const [countryNameErrorMsg, setCountryNameErrorMsg] = useState("");
  const [populationFieldErrorMsg, setPopulationFieldErrorMsg] = useState("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // (() => countryName.length > 15 ? setFieldErrorMsg('sss') : setFieldErrorMsg(''))();

    if (name.length > 15) {
      setCountryNameErrorMsg("Max 15 Letter!");
    } else {
      setCountryNameErrorMsg("");
    }
    setName(value);
  };
  const handleChangeCapital = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (capital.length > 15) {
      setCapitalFieldErrorMsg("Max 15 Letter!");
    } else {
      setCapitalFieldErrorMsg("");
    }
    setCapital(value);
  };
  const handleChangepopulation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (population.length > 15) {
      setPopulationFieldErrorMsg("Max 10 Number!");
    } else {
      setPopulationFieldErrorMsg("");
    }

    setPopulation(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateCountry({ name, capital, population });
  };

  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";

  return (
    <div>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label>{translations[currentLang].name}</label>
        <input value={name} onChange={handleChangeName} name="name" />
        <span className={styles.errorMsg}>{countryNameErrorMsg}</span>
        <label>{translations[currentLang].capital}</label>
        <input value={capital} onChange={handleChangeCapital} name="capital" />
        <span className={styles.errorMsg}>{capitalFieldErrorMsg}</span>

        <label>{translations[currentLang].population}</label>
        <input
          value={population}
          onChange={handleChangepopulation}
          name="population"
        />
        <span className={styles.errorMsg}>{populationFieldErrorMsg}</span>

        <button type="submit">
          {currentLang === "ka" ? "დამატება" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddCountryForm;
