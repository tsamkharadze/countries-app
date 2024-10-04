import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  return (
    <Link to={`/countries/${id}`}>
      <div className={styles.card}>{children}</div>
    </Link>
  );
};

export default Card;
