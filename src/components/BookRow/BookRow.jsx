import BookCard from "../BookCard/BookCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import styles from "./BookRow.module.css";

export default function BookRow({ title, books, onBookClick, isLoading }) {
  return (
    <section className={styles.BookRow}>
      <h2>{title}</h2>
      <div className={styles.bookgrid}>
        {books.map((book, index) =>
          isLoading ? (
            <SkeletonCard key={`skeleton-${index}`} />
          ) : (
            <BookCard
              key={`${title}-${book.id}-${index}`}
              title={book.title}
              author={book.author}
              coverColor={book.coverColor}
              cover={book.cover}
              onClick={() => onBookClick(book)}
            />
          )
        )}
      </div>
    </section>
  );
}
