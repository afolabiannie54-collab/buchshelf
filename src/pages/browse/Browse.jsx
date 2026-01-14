import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Browse.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import BookRow from "../../components/BookRow/BookRow";
import BookDetailModal from "../../components/BookDetailModal/BookDetailModal";
import { topGenres } from "../../data/topGenres";
import { useBooks } from "../../context/BooksContext";
import { useAuth } from "../../context/AuthContext";
import { useLibrary } from "../../context/LibraryContext";
import { useGoogleBooks } from "../../hooks/useGoogleBooks";
import { useDebounce } from "../../hooks/useDebounce";
import { searchByGenre } from "../../services/googleBooksAPI";
import { normalizeAndEnrichBooks } from "../../utils/bookFilter";
import {
  getFeaturedBooks,
  getTrendingBooks,
} from "../../services/googleBooksAPI";

export default function BrowsePage() {
  const location = useLocation();
  const { selectedBook, setSelectedBook } = useBooks();
  const { isLoggedIn } = useAuth();
  const { addToLibrary, toggleFavorite, getBookStatus, isFavorite } =
    useLibrary();

  // Determine initial genre from route
  const isGenrePage = location.pathname === "/genres";
  const initialGenre = new URLSearchParams(location.search).get("genre") || "";

  const [searchInput, setSearchInput] = useState("");
  const [selectedGenres, setSelectedGenres] = useState(
    initialGenre ? [initialGenre] : []
  );
  const [genreResults, setGenreResults] = useState([]);
  const [isGenreLoading, setIsGenreLoading] = useState(false);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [isCuratedLoading, setIsCuratedLoading] = useState(true);

  // Debounce search input
  const debouncedSearch = useDebounce(searchInput, 500);

  // Fetch books from Google Books API (hook already uses enhanced filtering)
  const { books: searchResults, isLoading: isSearching } = useGoogleBooks(
    debouncedSearch,
    debouncedSearch.length > 2
  );

  // Fetch by genre when no active text search but genres are selected
  useEffect(() => {
    const shouldFetchByGenre =
      debouncedSearch.length < 3 && selectedGenres.length > 0;

    if (!shouldFetchByGenre) {
      setGenreResults([]);
      setIsGenreLoading(false);
      return;
    }

    let isCancelled = false;
    async function loadGenre() {
      setIsGenreLoading(true);
      try {
        // Use the first selected genre for a simple, predictable experience
        const primary = selectedGenres[0];
        const items = await searchByGenre(primary, 40);
        const normalized = normalizeAndEnrichBooks(items);
        if (!isCancelled) setGenreResults(normalized);
      } catch (e) {
        if (!isCancelled) setGenreResults([]);
      } finally {
        if (!isCancelled) setIsGenreLoading(false);
      }
    }

    loadGenre();
    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, selectedGenres]);

  // Curated rows: fetch once to keep page engaging
  useEffect(() => {
    let isCancelled = false;
    async function loadCurated() {
      setIsCuratedLoading(true);
      try {
        const [featured, trending] = await Promise.all([
          getFeaturedBooks(),
          getTrendingBooks(),
        ]);
        const normalizedFeatured = normalizeAndEnrichBooks(featured);
        const normalizedTrending = normalizeAndEnrichBooks(trending);
        if (!isCancelled) {
          setFeaturedBooks(normalizedFeatured);
          setTrendingBooks(normalizedTrending);
        }
      } finally {
        if (!isCancelled) setIsCuratedLoading(false);
      }
    }
    loadCurated();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Filter books by genre if genres are selected
  const filteredBooks = useMemo(() => {
    if (selectedGenres.length === 0) {
      return searchResults;
    }
    return searchResults.filter((book) =>
      selectedGenres.some(
        (genre) =>
          book.genre?.toLowerCase().includes(genre.toLowerCase()) ||
          book.allCategories.some((cat) =>
            cat.toLowerCase().includes(genre.toLowerCase())
          )
      )
    );
  }, [searchResults, selectedGenres]);

  const toggleGenreFilter = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSearchInput("");
  };

  const pageTitle = isGenrePage ? "Filter by Genre" : "Search Books";

  const inTextSearchMode = debouncedSearch.length > 2;
  const inGenreMode = !inTextSearchMode && selectedGenres.length > 0;
  const activeBooks = inTextSearchMode ? filteredBooks : genreResults;
  const isActiveLoading = inTextSearchMode ? isSearching : isGenreLoading;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>{pageTitle}</h1>
        <p className={styles.subtitle}>
          {inTextSearchMode && !isSearching
            ? `${filteredBooks.length} book${
                filteredBooks.length !== 1 ? "s" : ""
              } found`
            : inTextSearchMode && isSearching
            ? "Searching..."
            : inGenreMode && isGenreLoading
            ? "Loading genre..."
            : inGenreMode
            ? `${activeBooks.length} book${
                activeBooks.length !== 1 ? "s" : ""
              } found`
            : "Start typing to search"}
        </p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <SearchBar onSearch={setSearchInput} value={searchInput} />
      </div>

      {/* Filter Panel - Top */}
      <div className={styles.filterPanel}>
        <div className={styles.filterHeader}>
          <h3>Filter by Genre</h3>
          {(selectedGenres.length > 0 || searchInput) && (
            <button
              className={styles.clearFiltersBtn}
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          )}
        </div>

        <div className={styles.genreFilters}>
          {topGenres.map((genre) => (
            <label key={genre.id} className={styles.genreCheckbox}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.name)}
                onChange={() => toggleGenreFilter(genre.name)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className={styles.booksSection}>
        {inTextSearchMode || inGenreMode ? (
          <>
            {/* Search Results Row - Shows skeleton while loading */}
            {(isActiveLoading || activeBooks.length > 0) && (
              <BookRow
                title={inTextSearchMode ? "Search Results" : "Results"}
                books={isActiveLoading ? Array(8).fill(null) : activeBooks}
                onBookClick={setSelectedBook}
                isLoading={isActiveLoading}
              />
            )}
            {!isActiveLoading && activeBooks.length === 0 && (
              <div className={styles.emptyState}>
                <h2>No books found</h2>
                <p>
                  {inTextSearchMode
                    ? selectedGenres.length > 0
                      ? "Try adjusting your search or filters."
                      : "Try a different search term."
                    : "Try a different genre."}
                </p>
                {(searchInput || selectedGenres.length > 0) && (
                  <button className={styles.resetBtn} onClick={clearAllFilters}>
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2>Start Searching</h2>
            <p>Enter at least 3 characters to search for books</p>
          </div>
        )}
      </div>

      {/* Curated Rows to keep the page engaging */}
      <div className={styles.booksSection}>
        <BookRow
          title="Trending Now"
          books={isCuratedLoading ? Array(8).fill(null) : trendingBooks}
          onBookClick={setSelectedBook}
          isLoading={isCuratedLoading}
        />
        <BookRow
          title="Award Winning Fiction"
          books={isCuratedLoading ? Array(8).fill(null) : featuredBooks}
          onBookClick={setSelectedBook}
          isLoading={isCuratedLoading}
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
