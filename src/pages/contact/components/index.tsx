import { useState } from "react";
import styles from "./contact.module.css";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>სახელი</label>
        <input
          name="firstName"
          value={feedback.firstName}
          onChange={handleChange}
        />
        <label>გვარი</label>
        <input
          name="lastName"
          value={feedback.lastName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input name="email" value={feedback.email} onChange={handleChange} />
        <label>შეტყობინება</label>
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
};

export default Contact;
