const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const CACHE_PREFIX = "buchshelf_cache_";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getFromCache(key) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return parsed.value;
  } catch (e) {
    return null;
  }
}

function setCache(key, value) {
  try {
    const item = {
      value,
      expiry: Date.now() + CACHE_DURATION,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  } catch (e) {
    // LocalStorage might be full
    console.warn("Failed to cache API response", e);
  }
}

export async function searchBooks(query, maxResults = 20, signal = null) {
  try {
    // Google Books API allows maxResults in the range [1..40]
    const safeMax = Math.max(1, Math.min(Number(maxResults) || 20, 40));

    // Guard against empty queries to avoid API errors
    if (!query || String(query).trim().length === 0) {
      console.warn("Empty search query");
      return [];
    }

    const cacheKey = `search_${query}_${safeMax}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      if (import.meta.env.DEV) {
        console.log(`Checking cache for: ${query} (HIT)`);
      }
      return cached;
    } else if (import.meta.env.DEV) {
      console.log(`Checking cache for: ${query} (MISS)`);
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
    let response = await fetch(url, { signal });
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
          response = await fetch(fallbackUrl, { signal });
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
    const items = data.items || [];
    setCache(cacheKey, items);
    return items;
  } catch (error) {
    if (error.name === 'AbortError') {
      if (import.meta.env.DEV) console.log("Fetch aborted:", query);
      return [];
    }
    if (import.meta.env.DEV) {
      console.error("Error fetching books:", error);
    }
    return [];
  }
}

export async function searchByGenre(genre, maxResults = 20, signal = null) {
  return searchBooks(`subject:${genre}`, maxResults, signal);
}

export async function searchByAuthor(author, maxResults = 20, signal = null) {
  // Try multiple query formats since inauthor: can be strict
  // First try: Use just the author name (simpler, more forgiving)
  const results = await searchBooks(author, maxResults, signal);

  if (results.length === 0) {
    if (import.meta.env.DEV) {
      console.log(
        "No results for simple author search, trying inauthor: syntax"
      );
    }
    // If that fails, try the inauthor syntax
    return await searchBooks(`inauthor:"${author}"`, maxResults, signal);
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

export async function getFeaturedBooks(signal = null) {
  // Award-winning fiction is noisy; anchor to primary subject
  return searchBooks("subject:Fiction award winning", 20, signal);
}

export async function getTrendingBooks(signal = null) {
  // Trending is broad; bias toward general fiction subject
  return searchBooks("subject:Fiction bestseller", 20, signal);
}

// Additional curated helpers
export async function getNewReleaseBooks(signal = null) {
  // Use Fiction subject; 'new release' term remains for relevance
  return searchBooks("subject:Fiction new release", 20, signal);
}

export async function getPopularFantasyBooks(signal = null) {
  return searchBooks("subject:Fantasy", 20, signal);
}

export async function getTopNonFictionBooks(signal = null) {
  return searchBooks("subject:Nonfiction", 20, signal);
}

export async function getCozyMysteryBooks(signal = null) {
  return searchBooks("subject:Mystery cozy", 20, signal);
}

// More curated categories
export async function getRomanceBestsellers(signal = null) {
  return searchBooks("subject:Romance", 20, signal);
}

export async function getClassicSciFiBooks(signal = null) {
  return searchBooks("subject:Science Fiction classic", 20, signal);
}

export async function getYoungAdultHits(signal = null) {
  return searchBooks("subject:Young Adult", 20, signal);
}

export async function getHistoricalFictionBooks(signal = null) {
  return searchBooks("subject:Historical Fiction", 20, signal);
}

export async function getPsychologySelfHelpBooks(signal = null) {
  return searchBooks("subject:Psychology", 20, signal);
}

export async function getBiographyMemoirBooks(signal = null) {
  return searchBooks("subject:Biography & Autobiography", 20, signal);
}

export async function getCrimeThrillerBooks(signal = null) {
  return searchBooks("subject:Thrillers", 20, signal);
}
