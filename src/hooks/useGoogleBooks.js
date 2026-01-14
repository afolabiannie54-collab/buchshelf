import { useState, useEffect } from "react";
import { searchBooks } from "../services/googleBooksAPI";
import { normalizeAndEnrichBooks } from "../utils/bookFilter";

export function useGoogleBooks(query, shouldFetch = true) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || !shouldFetch) return;

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchBooks(query, 40); // Get more results to filter
        const normalized = normalizeAndEnrichBooks(results); // Filter & enrich
        setBooks(normalized);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query, shouldFetch]);

  return { books, isLoading, error };
}
