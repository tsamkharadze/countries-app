// import { Link } from "react-router-dom";
import styles from "./CardFooter.module.css";

type CardFooterProps = {
  moreInfo: string;
  onDeleteCountry: () => void;
};

const CardFooter: React.FC<CardFooterProps> = ({
  moreInfo,
  onDeleteCountry,
}) => {
  return (
    <div>
      <p className={styles.moreInfo}>{moreInfo}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDeleteCountry();
        }}
      >
        Delete Country
      </button>
    </div>
  );
};

export default CardFooter;
