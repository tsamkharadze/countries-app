import { Link } from "react-router-dom";
import styles from "./CardFooter.module.css";

const CardFooter: React.FC<{ moreInfo: string; id: string }> = ({
  moreInfo,
  id,
}) => {
  return (
    <Link to={`/countries/${id}`}>
      <p className={styles.moreInfo}>{moreInfo}</p>
    </Link>
  );
};

export default CardFooter;
