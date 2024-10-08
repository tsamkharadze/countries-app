import styles from "./CardHeader.module.css";

const CardHeader: React.FC<{
  name: string;
  likeCount: number;
  onLike: () => void;
}> = ({ name, likeCount, onLike }) => {
  return (
    <h2 className={styles.cardHeader}>
      {name} - {likeCount}{" "}
      <span className={styles.like} onClick={onLike}>
        Like
      </span>
    </h2>
  );
};

export default CardHeader;
