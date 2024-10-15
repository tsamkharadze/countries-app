// import { Link } from "react-router-dom";
import styles from "./CardFooter.module.css";

type CardFooterProps = {
  moreInfo: string;
  onDeleteCountry: () => void;
  onRestoreCountry: () => void;
  isDeleted: boolean;
};

const CardFooter: React.FC<CardFooterProps> = ({
  moreInfo,
  onDeleteCountry,
  onRestoreCountry,
  isDeleted,
}) => {
  return (
    <div>
      <p className={styles.moreInfo}>{moreInfo}</p>
      {!isDeleted ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDeleteCountry();
          }}
        >
          Delete Country
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRestoreCountry();
          }}
        >
          Restore Country
        </button>
      )}
    </div>
  );
};

export default CardFooter;
