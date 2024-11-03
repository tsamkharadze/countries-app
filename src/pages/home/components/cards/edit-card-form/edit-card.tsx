import { FormEvent, useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./edit-card.module.css";

interface Country {
  id: string;
  imageSrc: string;
  nameKa: string;
  nameEn: string;
  capitalKa: string;
  capitalEn: string;
  population: number;
  like: number;
  deleted: boolean;
}

interface CardEditProps {
  country: Country | undefined;
  onUpdate?: (updatedCountry: Country) => void; // Callback for updating the country in the parent component
}

const CardEdit: React.FC<CardEditProps> = ({ country, onUpdate }) => {
  const [inputLang, setInputLang] = useState<"ka" | "en">("ka");
  const [editNameKa, setEditNameKa] = useState<string>("");
  const [editNameEn, setEditNameEn] = useState<string>("");
  const [editCapitalKa, setEditCapitalKa] = useState<string>("");
  const [editCapitalEn, setEditCapitalEn] = useState<string>("");
  const [editPopulation, setEditPopulation] = useState<number>(0);
  const [editImageSrc, setEditImageSrc] = useState<string>("");

  const [capitalFieldErrorMsg, setCapitalFieldErrorMsg] = useState("");
  const [countryNameErrorMsg, setCountryNameErrorMsg] = useState("");

  const translations = {
    ka: {
      name: "ქვეყნის სახელი",
      capital: "დედაქალაქი",
      population: "მოსახლეობა",
    },
    en: { name: "Name", capital: "Capital", population: "Population" },
  };

  useEffect(() => {
    if (country) {
      setEditNameKa(country.nameKa);
      setEditNameEn(country.nameEn);
      setEditCapitalKa(country.capitalKa);
      setEditCapitalEn(country.capitalEn);
      setEditPopulation(country.population);
      setEditImageSrc(country.imageSrc);
    }
  }, [country]);
  console.log(country);

  const handleToggleLanguage = (lang: "ka" | "en") => {
    setInputLang(lang);
  };

  const handleEditNameKa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNameKa(e.target.value);
    setCountryNameErrorMsg("");
  };

  const handleEditNameEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNameEn(e.target.value);
  };

  const handleEditCapitalKa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCapitalKa(e.target.value);
    setCapitalFieldErrorMsg("");
  };

  const handleEditCapitalEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCapitalEn(e.target.value);
  };

  const handleEditPopulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPopulation(Number(e.target.value));
  };

  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCountry: Country = {
      id: country?.id as string,
      nameKa: editNameKa,
      nameEn: editNameEn,
      capitalKa: editCapitalKa,
      capitalEn: editCapitalEn,
      population: editPopulation,
      imageSrc: editImageSrc,
      like: country?.like || 0,
      deleted: country?.deleted || false,
    };

    // Using Axios to send a PUT request without try-catch
    axios
      .put(`http://localhost:3000/countries/${country?.id}`, updatedCountry)
      .then((response) => {
        console.log("Country updated successfully:", response.data);

        // Clear fields after successful update
        setEditNameKa("");
        setEditNameEn("");
        setEditCapitalKa("");
        setEditCapitalEn("");
        setEditPopulation(0);
        setEditImageSrc("");

        // Optionally notify parent component of the updated country
        if (onUpdate) {
          onUpdate(updatedCountry);
        }
      })
      .catch((error) => {
        console.error("Error updating country:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };

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
            <input
              value={editNameKa}
              onChange={handleEditNameKa}
              name="editNameKa"
            />
            <span className={styles.errorMsg}>{countryNameErrorMsg}</span>
          </>
        )}

        {inputLang === "en" && (
          <>
            <label>{translations.en.name}</label>
            <input
              value={editNameEn}
              onChange={handleEditNameEn}
              name="nameEn"
            />
            <span className={styles.errorMsg}>{countryNameErrorMsg}</span>
          </>
        )}

        {inputLang === "ka" && (
          <>
            <label>დედაქალაქი</label>
            <input
              value={editCapitalKa}
              onChange={handleEditCapitalKa}
              name="capital"
            />
            <span className={styles.errorMsg}>{capitalFieldErrorMsg}</span>
          </>
        )}

        {inputLang === "en" && (
          <>
            <label>Capital</label>
            <input
              value={editCapitalEn}
              onChange={handleEditCapitalEn}
              name="capital"
            />
            <span className={styles.errorMsg}>{capitalFieldErrorMsg}</span>
          </>
        )}

        <label>{inputLang === "ka" ? "მოსახლეობა" : "Population"}</label>
        <input
          type="number" // Set input type to number
          value={editPopulation === 0 ? "" : editPopulation} // Show empty string if population is 0
          onChange={handleEditPopulation}
          name="population"
        />

        <input
          className={styles.imgUpload}
          type="file"
          accept=".jpg, .png"
          onChange={handleEditFileUpload}
        />

        <button type="submit">{inputLang === "ka" ? "დამატება" : "ADD"}</button>
      </form>
    </div>
  );
};

export default CardEdit;
