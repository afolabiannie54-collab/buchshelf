import styles from "../BookRow/BookRow.module.css";
import emptyStyles from "./EmptyBookRow.module.css";

export default function EmptyBookRow({ title, message }) {
  return (
    <div className={styles.BookRow}>
      <h2>{title}</h2>
      <div className={emptyStyles.emptyGrid}>
        <p>{message}</p>
      </div>
    </div>
  );
}
