// src/components/GenreCard/GenreCard.jsx
import styles from "./GenreCard.module.css";

export function GenreCardSimple({ genre, onClick }) {
  return (
    <div
      className={styles.simpleCard}
      onClick={onClick}
      style={{ backgroundColor: genre.color }}
    >
      {typeof genre.icon === "string" ? (
        <span className={styles.icon}>{genre.icon}</span>
      ) : genre.icon ? (
        (() => {
          const IconComp = genre.icon;
          return <IconComp className={styles.icon} />;
        })()
      ) : null}
      <h3 className={styles.name}>{genre.name}</h3>
    </div>
  );
}

export function GenreCardStackCard({ genre, position, onClick }) {
  return (
    <div
      className={`${styles.stackCard} ${styles[`pos${position}`]}`}
      onClick={onClick}
      style={{ backgroundColor: genre.color }}
    >
      {typeof genre.icon === "string" ? (
        <span className={styles.icon}>{genre.icon}</span>
      ) : genre.icon ? (
        (() => {
          const IconComp = genre.icon;
          return <IconComp className={styles.icon} />;
        })()
      ) : null}
      <h3 className={styles.name}>{genre.name}</h3>
    </div>
  );
}
