import React, { FormEvent } from "react";
import styles from "./add-country-form.module.css";

type AddCountryFormProps = {
  onCreateCountry: (e: FormEvent<HTMLFormElement>) => void;
};

const AddCountryForm: React.FC<AddCountryFormProps> = ({ onCreateCountry }) => {
  return (
    <div>
      <form className={styles.inputForm} onSubmit={onCreateCountry}>
        <label>Country Name</label>
        <input name="name" />
        <label>Capital</label>
        <input name="capital" />
        <label>Population</label>
        <input name="population" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCountryForm;
