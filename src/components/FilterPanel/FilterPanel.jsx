import styles from "./FilterPanel.module.css";
import { topGenres } from "../../data/topGenres";

export default function FilterPanel({
  selectedGenres = [],
  onGenreChange,
  onClear,
}) {
  const toggleGenre = (genre) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    onGenreChange(updated);
  };

  return (
    <aside className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <h3>Filters</h3>
        {selectedGenres.length > 0 && (
          <button className={styles.clearBtn} onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      <div className={styles.filterSection}>
        <h4>Genres</h4>
        <div className={styles.genreList}>
          {topGenres.map((genre) => (
            <label key={genre.id} className={styles.genreItem}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.name)}
                onChange={() => toggleGenre(genre.name)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
