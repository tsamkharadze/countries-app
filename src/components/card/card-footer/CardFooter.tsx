// import styles from "./CardFooter.module.css";
import styles from "@/components/card/card-footer/CardFooter.module.css";

const CardFooter: React.FC<{ moreInfo: string }> = ({ moreInfo }) => {
  return <p className={styles.moreInfo}>{moreInfo}</p>;
};

export default CardFooter;
