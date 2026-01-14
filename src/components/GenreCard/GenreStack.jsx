// src/components/GenreCard/GenreStack.jsx
import { useState } from "react";
import styles from "./GenreStack.module.css";
import { GenreCardStackCard } from "../../components/GenreCard/GenreCard";
import { Link } from "react-router-dom";

export default function GenreStack({ genres }) {
  const [positions, setPositions] = useState([0, 1, 2]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  return (
    <section className={styles.genreStack}>
      <div className={styles.container}>
        <div className={styles.stackWrapper}>
          {genres.slice(0, 3).map((genre, i) => (
            <GenreCardStackCard
              key={genre.id}
              genre={genre}
              position={positions[i]}
              onClick={handleShuffle}
            />
          ))}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Explore The Top Genres</h2>
          <p className={styles.description}>
            Discover thousands of books across your favorite genres. From
            thrilling mysteries to heartwarming romances, find exactly what
            you're looking for
          </p>

          <Link to="/search" className={styles.viewBtn}>
            View all genres
          </Link>
        </div>
      </div>
    </section>
  );
}
