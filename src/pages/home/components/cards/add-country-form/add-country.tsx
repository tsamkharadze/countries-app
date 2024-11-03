import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./add-country-form.module.css";

type AddCountryFormProps = {
  onCreateCountry: (countryFields: {
    id: string;
    nameKa: string;
    nameEn: string;
    capitalKa: string;
    capitalEn: string;
    population: number; // Ensure this is a number
    imageSrc: string;
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
  const [nameKa, setNameKa] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [capitalKa, setCapitalKa] = useState("");
  const [capitalEn, setCapitalEn] = useState("");
  const [population, setPopulation] = useState<number>(0);
  const [inputLang, setInputLang] = useState("ka");
  const [imageSrc, setImageSrc] = useState<string>("");

  const [capitalFieldErrorMsg, setCapitalFieldErrorMsg] = useState("");
  const [countryNameErrorMsg, setCountryNameErrorMsg] = useState("");

  const handleChangeNameKa = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameKa(value);
    setCountryNameErrorMsg(value.length > 15 ? "Max 15 Letter!" : "");
  };

  const handleChangeNameEn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameEn(value);
    setCountryNameErrorMsg(value.length > 15 ? "Max 15 Letter!" : "");
  };

  const handleChangeCapitalKa = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCapitalKa(value);
    setCapitalFieldErrorMsg(value.length > 15 ? "Max 15 Letter!" : "");
  };

  const handleChangeCapitalEn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCapitalEn(value);
    setCapitalFieldErrorMsg(value.length > 15 ? "Max 15 Letter!" : "");
  };

  const handleChangepopulation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setPopulation(numValue); // Set population as a number
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateCountry({
      id: `country-${Date.now()}-${Math.random()}`, // Generate a unique ID
      nameKa,
      nameEn,
      capitalKa,
      capitalEn,
      population,
      imageSrc,
    });
  };

  const handleToggleLanguage = (lang: "ka" | "en") => {
    setInputLang(lang);
  };

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  return (
    <div className={styles.addCountryFieldsContainer}>
      <div className={styles.addCountryFieldsLangToogle}>
        <button onClick={() => handleToggleLanguage("ka")}>KA</button>
        <button onClick={() => handleToggleLanguage("en")}>EN</button>
      </div>

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        {inputLang === "ka" && (
          <>
            <label>{translations.ka.name}</label>
            <input value={nameKa} onChange={handleChangeNameKa} name="nameKa" />
            <span className={styles.errorMsg}>{countryNameErrorMsg}</span>
          </>
        )}

        {inputLang === "en" && (
          <>
            <label>{translations.en.name}</label>
            <input value={nameEn} onChange={handleChangeNameEn} name="nameEn" />
            <span className={styles.errorMsg}>{countryNameErrorMsg}</span>
          </>
        )}

        {inputLang === "ka" && (
          <>
            <label>დედაქალაქი</label>
            <input
              value={capitalKa}
              onChange={handleChangeCapitalKa}
              name="capital"
            />
            <span className={styles.errorMsg}>{capitalFieldErrorMsg}</span>
          </>
        )}

        {inputLang === "en" && (
          <>
            <label>Capital</label>
            <input
              value={capitalEn}
              onChange={handleChangeCapitalEn}
              name="capital"
            />
            <span className={styles.errorMsg}>{capitalFieldErrorMsg}</span>
          </>
        )}

        <label>{inputLang === "ka" ? "მოსახლეობა" : "Population"}</label>
        <input
          type="number" // Set input type to number
          value={population === 0 ? "" : population} // Show empty string if population is 0
          onChange={handleChangepopulation}
          name="population"
        />

        <input
          className={styles.imgUpload}
          type="file"
          accept=".jpg, .png"
          onChange={handleFileUpload}
        />

        <button type="submit">{inputLang === "ka" ? "დამატება" : "ADD"}</button>
      </form>
    </div>
  );
};

export default AddCountryForm;
