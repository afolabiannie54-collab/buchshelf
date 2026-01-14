import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  onSearch,
  value = "",
  placeholder = "Search by title or author...",
}) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <FiSearch className={styles.searchIcon} size={20} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.input}
        />
        {value && (
          <button
            onClick={handleClear}
            className={styles.clearBtn}
            aria-label="Clear search"
          >
            <MdClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
