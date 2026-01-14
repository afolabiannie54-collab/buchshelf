import styles from "./BookCard.module.css";

export default function BookCard({
  title,
  author,
  coverColor,
  cover,
  onClick,
}) {
  return (
    <div className={styles.bookcard} onClick={onClick}>
      <div className={styles.bookcover} style={{ backgroundColor: coverColor }}>
        {cover ? (
          <img
            src={cover}
            alt={title}
            className={styles.coverImage}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
}
