import { Link } from "react-router-dom";
import styles from "./card.module.css";

type CardProps = {
  id: string;
  className?: string;
  deleted?: boolean;
};

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  id,
  className,
  deleted = false,
}) => {
  return (
    <Link to={`/countries/${id}`}>
      <div
        className={`${styles.card} ${className} ${
          deleted ? styles.deletedCard : ""
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Card;
