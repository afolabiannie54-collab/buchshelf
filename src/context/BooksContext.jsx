import { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BooksContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}
