import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const { user } = useAuth();

  // Helper function to get user-specific localStorage key
  const getLibraryKey = () => {
    return user ? `buchshelf_library_${user.email}` : "buchshelf_library_guest";
  };

  const getFavoritesKey = () => {
    return user
      ? `buchshelf_favorites_${user.email}`
      : "buchshelf_favorites_guest";
  };

  const getGoalsKey = () => {
    return user ? `buchshelf_goals_${user.email}` : "buchshelf_goals_guest";
  };

  // Initialize library from localStorage
  const [library, setLibrary] = useState(() => {
    const storedLibrary = localStorage.getItem(getLibraryKey());
    if (storedLibrary) {
      try {
        return JSON.parse(storedLibrary);
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load library from localStorage:", error);
        return {
          "want-to-read": [],
          "currently-reading": [],
          finished: [],
        };
      }
    }
    return {
      "want-to-read": [],
      "currently-reading": [],
      finished: [],
    };
  });

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem(getFavoritesKey());
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load favorites from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Initialize per-year reading goals
  const [goalsByYear, setGoalsByYear] = useState(() => {
    const storedGoals = localStorage.getItem(getGoalsKey());
    if (storedGoals) {
      try {
        return JSON.parse(storedGoals);
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load goals from localStorage:", error);
        return {};
      }
    }
    return {};
  });

  // Load user-specific data when user changes
  useEffect(() => {
    const storedLibrary = localStorage.getItem(getLibraryKey());
    if (storedLibrary) {
      try {
        setLibrary(JSON.parse(storedLibrary));
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load library from localStorage:", error);
        setLibrary({
          "want-to-read": [],
          "currently-reading": [],
          finished: [],
        });
      }
    } else {
      setLibrary({
        "want-to-read": [],
        "currently-reading": [],
        finished: [],
      });
    }

    const storedFavorites = localStorage.getItem(getFavoritesKey());
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load favorites from localStorage:", error);
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }

    const storedGoals = localStorage.getItem(getGoalsKey());
    if (storedGoals) {
      try {
        setGoalsByYear(JSON.parse(storedGoals));
      } catch (error) {
        if (import.meta.env.DEV) console.error("Failed to load goals from localStorage:", error);
        setGoalsByYear({});
      }
    } else {
      setGoalsByYear({});
    }
  }, [user]);

  // Save library to localStorage whenever it changes
  const updateLibrary = (newLibrary) => {
    setLibrary(newLibrary);
    localStorage.setItem(getLibraryKey(), JSON.stringify(newLibrary));
  };

  // Save favorites to localStorage whenever it changes
  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem(getFavoritesKey(), JSON.stringify(newFavorites));
  };

  const updateGoals = (newGoals) => {
    setGoalsByYear(newGoals);
    localStorage.setItem(getGoalsKey(), JSON.stringify(newGoals));
  };

  // Add book to a specific reading status
  const addToLibrary = (book, status) => {
    const updatedLibrary = { ...library };

    // Remove book from all lists first
    Object.keys(updatedLibrary).forEach((key) => {
      updatedLibrary[key] = updatedLibrary[key].filter((b) => b.id !== book.id);
    });

    // Add to the specified status list
    let toStore = { ...book };
    if (status === "finished") {
      toStore = { ...toStore, statusAt: new Date().toISOString() };
    } else {
      // ensure statusAt doesn't persist when moving out of finished
      const { statusAt, ...rest } = toStore;
      toStore = rest;
    }
    updatedLibrary[status] = [...updatedLibrary[status], toStore];
    updateLibrary(updatedLibrary);
  };

  // Remove book from library entirely
  const removeFromLibrary = (bookId) => {
    const updatedLibrary = { ...library };
    Object.keys(updatedLibrary).forEach((key) => {
      updatedLibrary[key] = updatedLibrary[key].filter((b) => b.id !== bookId);
    });
    updateLibrary(updatedLibrary);
  };

  // Toggle favorite status
  const toggleFavorite = (book) => {
    const isFav = favorites.some((b) => b.id === book.id);
    if (isFav) {
      updateFavorites(favorites.filter((b) => b.id !== book.id));
    } else {
      updateFavorites([...favorites, book]);
    }
  };

  // Get current status of a book
  const getBookStatus = (bookId) => {
    for (const [status, books] of Object.entries(library)) {
      if (books.some((b) => b.id === bookId)) {
        return status;
      }
    }
    return null;
  };

  // Check if book is favorited
  const isFavorite = (bookId) => {
    return favorites.some((b) => b.id === bookId);
  };

  // Goals helpers
  const getCurrentYear = () => new Date().getFullYear();

  const getGoal = (year = getCurrentYear()) => {
    return goalsByYear[year] || null;
  };

  // Set goal for current year only
  const setGoal = (target) => {
    const year = getCurrentYear();
    const startDate = `${year}-01-01T00:00:00.000Z`;
    const next = { ...goalsByYear, [year]: { target, startDate } };
    updateGoals(next);
    return next[year];
  };

  const getAvailableYears = () => {
    return Object.keys(goalsByYear)
      .map((y) => parseInt(y, 10))
      .sort((a, b) => b - a);
  };

  const getGoalProgress = (year = getCurrentYear()) => {
    const goal = getGoal(year);
    const target = goal?.target ?? 0;
    const finished = library.finished || [];
    const count = finished.filter((b) => {
      if (!b.statusAt) return false; // exclude missing timestamps
      const d = new Date(b.statusAt);
      return d.getFullYear() === year;
    }).length;
    const percent =
      target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;

    let paceText = "";
    if (target > 0) {
      const remaining = target - count;
      if (remaining === 0) {
        paceText = "Goal completed! 🎉";
      } else if (remaining > 0) {
        paceText = `${remaining} book${remaining === 1 ? "" : "s"} to go`;
      } else {
        paceText = `Goal exceeded by ${Math.abs(remaining)} book${
          Math.abs(remaining) === 1 ? "" : "s"
        }!`;
      }
    }
    return { year, target, count, percent, paceText };
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        favorites,
        addToLibrary,
        removeFromLibrary,
        toggleFavorite,
        getBookStatus,
        isFavorite,
        // goals
        goalsByYear,
        getGoal,
        setGoal,
        getGoalProgress,
        getAvailableYears,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
