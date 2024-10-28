import { useState } from "react";
import styles from "./contact.module.css";
import { useParams } from "react-router-dom";

const Contact = () => {
  const [feedback, setFeedback] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(feedback);
  };

  const translate = {
    ka: {
      name: "სახელი",
      surname: "გვარი",
      email: "ელ-ფოსტა",
      message: "შეტყობინება",
      submit: "გაგზავნა",
    },
    en: {
      name: "Name",
      surname: "Surname",
      email: "Email",
      message: "Message",
      submit: "Submit",
    },
  };

  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>{translate[currentLang].name}</label>
        <input
          name="firstName"
          value={feedback.firstName}
          onChange={handleChange}
        />
        <label>{translate[currentLang].surname}</label>
        <input
          name="lastName"
          value={feedback.lastName}
          onChange={handleChange}
        />
        <label>{translate[currentLang].email}</label>
        <input name="email" value={feedback.email} onChange={handleChange} />
        <label>{translate[currentLang].message}</label>
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">{translate[currentLang].submit}</button>
      </form>
    </>
  );
};

export default Contact;
