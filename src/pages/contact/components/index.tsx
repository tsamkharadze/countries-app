import styles from "./contact.module.css";
const Contact = () => {
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  // if (event.key === "Enter") {
  // console.log("Enter pressed");
  // }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const feedback = {
    //   name: "",
    //   surname: "",
    //   email: "",
    //   message: "",
    // };

    console.log("raghaca");
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>სახელი</label>
        <input type="text" name="firstName" />
        <label>გვარი</label>
        <input type="text" name="lastName" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>შეტყობინება</label>
        <textarea name="message"></textarea>
        <button type="submit"> SUBMIT</button>
      </form>
    </>
  );
};

export default Contact;
