import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonCover}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonAuthor}></div>
    </div>
  );
}
