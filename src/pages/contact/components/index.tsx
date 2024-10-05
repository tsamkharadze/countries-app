import styles from "./contact.module.css";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = document.getElementById("firstname") as HTMLInputElement;
    const lastName = document.getElementById("surname") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;

    const userFeedback = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    };

    console.log("User Feedback:", userFeedback);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>სახელი</label>
        <input id="firstname" type="text" name="firstName" />
        <label>გვარი</label>
        <input id="surname" />
        <label>Email</label>
        <input id="email" />
        <label>შეტყობინება</label>
        <textarea id="message"></textarea>
        <button type="submit"> SUBMIT</button>
      </form>
    </>
  );
};

export default Contact;
