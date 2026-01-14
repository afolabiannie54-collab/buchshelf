import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Author.module.css";
import BookRow from "../../components/BookRow/BookRow";
import BookDetailModal from "../../components/BookDetailModal/BookDetailModal";
import { useBooks } from "../../context/BooksContext";
import { useAuth } from "../../context/AuthContext";
import { useLibrary } from "../../context/LibraryContext";
import { searchByAuthor } from "../../services/googleBooksAPI";
import {
  normalizeAndEnrichBooks,
  normalizeBooks,
  getHighestRatedBooks,
} from "../../utils/bookFilter";

export default function AuthorPage() {
  const { authorName } = useParams();
  const { selectedBook, setSelectedBook } = useBooks();
  const { isLoggedIn } = useAuth();
  const { addToLibrary, toggleFavorite, getBookStatus, isFavorite } =
    useLibrary();
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Decode the author name from URL
  const decodedAuthorName = decodeURIComponent(authorName);

  useEffect(() => {
    async function loadAuthorBooks() {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchByAuthor(decodedAuthorName, 60);

        if (!results || results.length === 0) {
          setError("No books found");
          setAuthorBooks([]);
          return;
        }

        // First try to filter strictly
        let normalized = normalizeAndEnrichBooks(results);

        // If strict filtering removes everything, fall back to less strict filtering
        if (normalized.length === 0) {
          if (import.meta.env.DEV) {
            console.warn(
              "Strict filtering removed all books, using less strict filtering"
            );
          }
          normalized = normalizeBooks(results);
        }

        // Prefer highest rated; if none have ratings, fallback to full normalized list
        const sortedByRating = getHighestRatedBooks(normalized, 40);
        setAuthorBooks(
          sortedByRating.length > 0 ? sortedByRating : normalized.slice(0, 40)
        );
      } catch (err) {
        if (import.meta.env.DEV) console.error("Error loading author books:", err);
        setError(err.message);
        setAuthorBooks([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthorBooks();
  }, [decodedAuthorName]);

  // If error or no books found
  if (error || (!isLoading && authorBooks.length === 0)) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h1>Author Not Found</h1>
          <p>We couldn't find any books by {decodedAuthorName}</p>
        </div>
      </div>
    );
  }

  // Create skeleton array for loading
  const skeletonArray = Array(20).fill(null);

  return (
    <div className={styles.container}>
      {/* Author Header */}
      <div className={styles.header}>
        <h1>{decodedAuthorName}</h1>
        <p className={styles.subtitle}>
          {isLoading
            ? "Loading..."
            : `${authorBooks.length} book${
                authorBooks.length !== 1 ? "s" : ""
              }`}
        </p>
      </div>

      {/* Author Bio Section (future enhancement) */}
      <div className={styles.bioSection}>
        <p className={styles.bio}>
          Explore all works by {decodedAuthorName}. Discover their most popular
          titles and see your favorites.
        </p>
      </div>

      {/* Books by Author */}
      <div className={styles.booksSection}>
        <BookRow
          title="All Books"
          books={isLoading ? skeletonArray : authorBooks}
          onBookClick={setSelectedBook}
          isLoading={isLoading}
        />
      </div>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToLibrary={addToLibrary}
        onToggleFavorite={toggleFavorite}
        currentStatus={selectedBook ? getBookStatus(selectedBook.id) : null}
        isFavorite={selectedBook ? isFavorite(selectedBook.id) : false}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
