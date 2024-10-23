import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./add-country-form.module.css";
// import { useParams } from "react-router-dom";

type AddCountryFormProps = {
  onCreateCountry: (countryFields: {
    nameKa: string;
    nameEn: string;
    capitalKa: string;
    capitalEn: string;
    population: string;
    image: string;
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
  const [population, setPopulation] = useState("");

  const [capitalFieldErrorMsg, setCapitalFieldErrorMsg] = useState("");
  const [countryNameErrorMsg, setCountryNameErrorMsg] = useState("");
  const [populationFieldErrorMsg, setPopulationFieldErrorMsg] = useState("");
  const [inputLang, setInputLang] = useState("ka");

  const handleChangeNameKa = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameKa(value);

    // (() => countryName.length > 15 ? setFieldErrorMsg('sss') : setFieldErrorMsg(''))();

    if (value.length > 15) {
      setCountryNameErrorMsg("Max 15 Letter!");
    } else {
      setCountryNameErrorMsg("");
    }
  };

  const handleChangeNameEn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameEn(value);

    // (() => countryName.length > 15 ? setFieldErrorMsg('sss') : setFieldErrorMsg(''))();

    if (value.length > 15) {
      setCountryNameErrorMsg("Max 15 Letter!");
    } else {
      setCountryNameErrorMsg("");
    }
  };

  const handleChangeCapitalKa = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCapitalKa(value);

    if (value.length > 15) {
      setCapitalFieldErrorMsg("Max 15 Letter!");
    } else {
      setCapitalFieldErrorMsg("");
    }
  };
  const handleChangeCapitalEn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCapitalEn(value);

    if (value.length > 15) {
      setCapitalFieldErrorMsg("Max 15 Letter!");
    } else {
      setCapitalFieldErrorMsg("");
    }
  };
  const handleChangepopulation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPopulation(value);

    if (value.length > 10) {
      setPopulationFieldErrorMsg("Max 10 Number!");
    } else {
      setPopulationFieldErrorMsg("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateCountry({
      nameKa,
      nameEn,
      capitalKa,
      capitalEn,
      population,
      image,
    });
  };

  const handleToggleLanguage = (lang: "ka" | "en") => {
    setInputLang(lang);
  };

  const [image, setImage] = useState<string>("");

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  // const { lang } = useParams<{ lang: "ka" | "en" }>();
  // const currentLang = lang || inputLang;
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
          value={population}
          onChange={handleChangepopulation}
          name="population"
        />
        <span className={styles.errorMsg}>{populationFieldErrorMsg}</span>

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
