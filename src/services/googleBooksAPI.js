const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(query, maxResults = 20) {
  try {
    // Google Books API allows maxResults in the range [1..40]
    const safeMax = Math.max(1, Math.min(Number(maxResults) || 20, 40));

    // Guard against empty queries to avoid API errors
    if (!query || String(query).trim().length === 0) {
      console.warn("Empty search query");
      return [];
    }

    let url = `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&maxResults=${safeMax}&printType=books&orderBy=relevance&langRestrict=en`;
    if (API_KEY) {
      url += `&key=${API_KEY}`;
    }

    // Dev-only logging (no full URL)
    if (import.meta.env.DEV) {
      console.log("Searching for:", query, "maxResults:", safeMax);
    }
    let response = await fetch(url);
    let data = await response.json();
    if (!response.ok) {
      if (import.meta.env.DEV) {
        console.error(
          "API Error:",
          response.status,
          data?.error?.message || data?.error
        );
      }
      // Simple fallback: if a key was used and the request failed (e.g., referrer restriction), try without the key
      if (API_KEY) {
        try {
          const fallbackUrl = `${BASE_URL}?q=${encodeURIComponent(
            query
          )}&maxResults=${safeMax}`;
          if (import.meta.env.DEV) {
            console.warn("Retrying search without API key");
          }
          response = await fetch(fallbackUrl);
          data = await response.json();
          if (!response.ok) {
            if (import.meta.env.DEV) {
              console.error(
                "Fallback search failed:",
                response.status,
                data?.error?.message || data?.error
              );
            }
            return [];
          }
          return data.items || [];
        } catch (fallbackErr) {
          if (import.meta.env.DEV) {
            console.error("Fallback error:", fallbackErr);
          }
          return [];
        }
      }
      return [];
    }
    return data.items || [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error fetching books:", error);
    }
    return [];
  }
}

export async function searchByGenre(genre, maxResults = 20) {
  return searchBooks(`subject:${genre}`, maxResults);
}

export async function searchByAuthor(author, maxResults = 20) {
  // Try multiple query formats since inauthor: can be strict
  // First try: Use just the author name (simpler, more forgiving)
  const results = await searchBooks(author, maxResults);

  if (results.length === 0) {
    if (import.meta.env.DEV) {
      console.log(
        "No results for simple author search, trying inauthor: syntax"
      );
    }
    // If that fails, try the inauthor syntax
    return await searchBooks(`inauthor:"${author}"`, maxResults);
  }

  return results;
}

export async function getBookById(bookId) {
  try {
    let url = `${BASE_URL}/${bookId}`;
    if (API_KEY) {
      url += `?key=${API_KEY}`;
    }
    let response = await fetch(url);
    if (!response.ok && API_KEY) {
      try {
        if (import.meta.env.DEV) {
          console.warn("Retrying getBookById without API key");
        }
        response = await fetch(`${BASE_URL}/${bookId}`);
      } catch (fallbackErr) {
        if (import.meta.env.DEV) {
          console.error("Fallback error:", fallbackErr);
        }
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

export async function getFeaturedBooks() {
  // Award-winning fiction is noisy; anchor to primary subject
  return searchBooks("subject:Fiction award winning", 20);
}

export async function getTrendingBooks() {
  // Trending is broad; bias toward general fiction subject
  return searchBooks("subject:Fiction bestseller", 20);
}

// Additional curated helpers
export async function getNewReleaseBooks() {
  // Use Fiction subject; 'new release' term remains for relevance
  return searchBooks("subject:Fiction new release", 20);
}

export async function getPopularFantasyBooks() {
  return searchBooks("subject:Fantasy", 20);
}

export async function getTopNonFictionBooks() {
  return searchBooks("subject:Nonfiction", 20);
}

export async function getCozyMysteryBooks() {
  return searchBooks("subject:Mystery cozy", 20);
}

// More curated categories
export async function getRomanceBestsellers() {
  return searchBooks("subject:Romance", 20);
}

export async function getClassicSciFiBooks() {
  return searchBooks("subject:Science Fiction classic", 20);
}

export async function getYoungAdultHits() {
  return searchBooks("subject:Young Adult", 20);
}

export async function getHistoricalFictionBooks() {
  return searchBooks("subject:Historical Fiction", 20);
}

export async function getPsychologySelfHelpBooks() {
  return searchBooks("subject:Psychology", 20);
}

export async function getBiographyMemoirBooks() {
  return searchBooks("subject:Biography & Autobiography", 20);
}

export async function getCrimeThrillerBooks() {
  return searchBooks("subject:Thrillers", 20);
}
