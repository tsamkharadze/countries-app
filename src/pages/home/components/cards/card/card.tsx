import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card: React.FC<
  React.PropsWithChildren<{ id: string; className?: string }>
> = ({ children, id, className }) => {
  return (
    <Link to={`/countries/${id}`}>
      <div className={`${styles.card} ${className}`}>{children}</div>
    </Link>
  );
};

export default Card;
