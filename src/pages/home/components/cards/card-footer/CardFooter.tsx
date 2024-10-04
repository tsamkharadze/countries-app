import styles from "./CardFooter.module.css";

const CardFooter: React.FC<{ moreInfo: string }> = ({ moreInfo }) => {
  return <p className={styles.moreInfo}>{moreInfo}</p>;
};

export default CardFooter;
