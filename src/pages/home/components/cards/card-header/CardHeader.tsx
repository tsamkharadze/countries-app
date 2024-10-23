import styles from "./CardHeader.module.css";

const CardHeader: React.FC<{
  name: string;
  likeCount: number;
  onLike: () => void;
}> = ({ name, likeCount, onLike }) => {
  console.log(name);
  return (
    <h2 className={styles.cardHeader}>
      {name} - {likeCount}
      <span
        className={styles.like}
        onClick={(e) => {
          e.preventDefault();
          onLike();
        }}
      >
        👍{" "}
      </span>
    </h2>
  );
};

export default CardHeader;
