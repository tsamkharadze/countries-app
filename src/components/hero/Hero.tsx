import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles["hero-text"]}>
        <p className={styles["hero-headline"]}>
          Your Ultimate Guide to Countries and Their Stories
        </p>
        <p className={styles["hero-subheadline"]}>
          Whether you're a traveler, student, or just curious, explore
          everything you need to know about the nations of the world.
        </p>
      </div>
    </div>
  );
};

export default Hero;
