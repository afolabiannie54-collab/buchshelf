import { COVER_COLORS } from "./constants";

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

function generateColorFromTitle(title) {
  if (!title) return COVER_COLORS[0];
  const hash = title
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COVER_COLORS[hash % COVER_COLORS.length];
}

export function normalizeBooks(apiBooks) {
  return apiBooks.map(normalizeBook).filter((book) => book !== null);
}
