import styles from "./CardHeader.module.css";

const CardHeader: React.FC<{ name: string }> = ({ name }) => {
  return <h2 className={styles.cardHeader}>{name}</h2>;
};

export default CardHeader;
