import styles from "./Toast.module.css";

export default function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.message}>{message}</span>
    </div>
  );
}
