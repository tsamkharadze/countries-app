// import styles from "./CardImage.module.css";
import styles from "@/components/card/card-image/CardImage.module.css";

const CardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.cardImage} />;
};

export default CardImage;
