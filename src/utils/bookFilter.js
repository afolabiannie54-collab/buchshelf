import { COVER_COLORS } from "./constants";

/**
 * Filters out non-book content like research papers, textbooks, and academic materials
 */
function isValidBook(book) {
  if (!book || !book.volumeInfo) return false;

  const title = book.volumeInfo.title?.toLowerCase() || "";
  const categories =
    book.volumeInfo.categories?.map((c) => c.toLowerCase()) || [];
  const description = book.volumeInfo.description?.toLowerCase() || "";
  const pageCount = book.volumeInfo.pageCount;

  // Exclude research papers and academic papers
  const paperExcludeTerms = [
    "research paper",
    "academic paper",
    "thesis",
    "dissertation",
    "journal article",
    "conference paper",
  ];
  if (
    paperExcludeTerms.some(
      (term) => title.includes(term) || description.includes(term)
    )
  ) {
    return false;
  }

  // Exclude pure textbooks (but allow books that happen to be educational)
  const textbookTerms = ["textbook", "workbook", "study guide"];
  if (textbookTerms.some((term) => title.includes(term))) {
    return false;
  }

  // Exclude very academic/reference categories
  const excludeCategories = [
    "reference",
    "textbooks",
    "test prep",
    "academic",
    "science textbooks",
  ];
  if (
    categories.some((cat) =>
      excludeCategories.some((exclude) => cat.includes(exclude))
    )
  ) {
    return false;
  }

  // Exclude very short documents (likely not real books)
  if (pageCount && pageCount < 50) {
    return false;
  }

  // Exclude books with no description (likely not real published books)
  if (!description || description.length < 20) {
    return false;
  }

  // Must have authors
  if (!book.volumeInfo.authors || book.volumeInfo.authors.length === 0) {
    return false;
  }

  return true;
}

/**
 * Normalize book from Google Books API and enrich with metadata
 */
export function normalizeBook(apiBook) {
  if (!apiBook || !apiBook.volumeInfo) return null;

  const { id, volumeInfo } = apiBook;

  return {
    id,
    title: volumeInfo.title || "Unknown Title",
    author: volumeInfo.authors?.[0] || "Unknown Author",
    allAuthors: volumeInfo.authors || [],
    cover: volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || null,
    coverColor: generateColorFromTitle(volumeInfo.title),
    rating: volumeInfo.averageRating || null,
    ratingsCount: volumeInfo.ratingsCount || 0,
    genre: volumeInfo.categories?.[0] || "General",
    allCategories: volumeInfo.categories || [],
    description: volumeInfo.description || "No description available.",
    pageCount: volumeInfo.pageCount || null,
    publishedDate: volumeInfo.publishedDate || null,
  };
}

/**
 * Normalize and filter books - excludes research papers, textbooks, etc.
 */
export function normalizeAndEnrichBooks(apiBooks) {
  return apiBooks
    .filter((book) => isValidBook(book))
    .map((book) => normalizeBook(book))
    .filter((book) => book !== null);
}

/**
 * Generate consistent color from title
 */
function generateColorFromTitle(title) {
  if (!title) return COVER_COLORS[0];
  const hash = title
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COVER_COLORS[hash % COVER_COLORS.length];
}

/**
 * Normalize books without filtering (for backward compatibility)
 */
export function normalizeBooks(apiBooks) {
  return apiBooks
    .map((book) => normalizeBook(book))
    .filter((book) => book !== null);
}
/**
 * Get highest rated books from a list
 */
export function getHighestRatedBooks(books, limit = 20) {
  return books
    .filter((book) => book.rating !== null)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}
