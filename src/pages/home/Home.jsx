// src/pages/HomePage/Home.jsx
import styles from "./Home.module.css";
import BookIllustration from "../../components/BookIllustration/BookIllustration";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookRow from "../../components/BookRow/BookRow";
import BookDetailModal from "../../components/BookDetailModal/BookDetailModal";
import GenreStack from "../../components/GenreCard/GenreStack";
import { useAuth } from "../../context/AuthContext";
import { useBooks } from "../../context/BooksContext";
import { useLibrary } from "../../context/LibraryContext";
import { topGenres } from "../../data/topGenres";
import {
  getFeaturedBooks,
  getTrendingBooks,
  getNewReleaseBooks,
  getPopularFantasyBooks,
  getTopNonFictionBooks,
  getCozyMysteryBooks,
  getRomanceBestsellers,
  getClassicSciFiBooks,
  getYoungAdultHits,
  getHistoricalFictionBooks,
  getPsychologySelfHelpBooks,
  getBiographyMemoirBooks,
  getCrimeThrillerBooks,
} from "../../services/googleBooksAPI";
import { normalizeAndEnrichBooks } from "../../utils/bookFilter";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  const { selectedBook, setSelectedBook } = useBooks();
  const { addToLibrary, toggleFavorite, getBookStatus, isFavorite } =
    useLibrary();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newReleaseBooks, setNewReleaseBooks] = useState([]);
  const [popularFantasyBooks, setPopularFantasyBooks] = useState([]);
  const [topNonFictionBooks, setTopNonFictionBooks] = useState([]);
  const [cozyMysteryBooks, setCozyMysteryBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [classicSciFiBooks, setClassicSciFiBooks] = useState([]);
  const [youngAdultBooks, setYoungAdultBooks] = useState([]);
  const [historicalFictionBooks, setHistoricalFictionBooks] = useState([]);
  const [psychologySelfHelpBooks, setPsychologySelfHelpBooks] = useState([]);
  const [biographyMemoirBooks, setBiographyMemoirBooks] = useState([]);
  const [crimeThrillerBooks, setCrimeThrillerBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      setIsLoading(true);
      try {
        const [
          featured,
          trending,
          newReleases,
          popularFantasy,
          topNonFiction,
          cozyMystery,
          romance,
          classicSciFi,
          youngAdult,
          historicalFiction,
          psychologySelfHelp,
          biographyMemoir,
          crimeThriller,
        ] = await Promise.all([
          getFeaturedBooks(),
          getTrendingBooks(),
          getNewReleaseBooks(),
          getPopularFantasyBooks(),
          getTopNonFictionBooks(),
          getCozyMysteryBooks(),
          getRomanceBestsellers(),
          getClassicSciFiBooks(),
          getYoungAdultHits(),
          getHistoricalFictionBooks(),
          getPsychologySelfHelpBooks(),
          getBiographyMemoirBooks(),
          getCrimeThrillerBooks(),
        ]);

        setFeaturedBooks(normalizeAndEnrichBooks(featured));
        setTrendingBooks(normalizeAndEnrichBooks(trending));
        setNewReleaseBooks(normalizeAndEnrichBooks(newReleases));
        setPopularFantasyBooks(normalizeAndEnrichBooks(popularFantasy));
        setTopNonFictionBooks(normalizeAndEnrichBooks(topNonFiction));
        setCozyMysteryBooks(normalizeAndEnrichBooks(cozyMystery));
        setRomanceBooks(normalizeAndEnrichBooks(romance));
        setClassicSciFiBooks(normalizeAndEnrichBooks(classicSciFi));
        setYoungAdultBooks(normalizeAndEnrichBooks(youngAdult));
        setHistoricalFictionBooks(normalizeAndEnrichBooks(historicalFiction));
        setPsychologySelfHelpBooks(normalizeAndEnrichBooks(psychologySelfHelp));
        setBiographyMemoirBooks(normalizeAndEnrichBooks(biographyMemoir));
        setCrimeThrillerBooks(normalizeAndEnrichBooks(crimeThriller));
      } catch (error) {
        if (import.meta.env.DEV) console.error("Error loading books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  // Create skeleton arrays for loading
  const skeletonArray = Array(8).fill(null);

  return (
    <div>
      <Hero isLoggedIn={isLoggedIn} user={user} />
      <FeaturedBooks
        books={isLoading ? skeletonArray : featuredBooks}
        onBookClick={setSelectedBook}
        isLoading={isLoading}
      />
      {isLoggedIn ? null : <GenreStack genres={topGenres} />}

      {/* Curated rows visible to everyone */}
      <div className={styles.rows}>
        {(isLoading || newReleaseBooks.length > 0) && (
          <BookRow
            title="New Releases"
            books={isLoading ? skeletonArray : newReleaseBooks}
            onBookClick={setSelectedBook}
            isLoading={isLoading}
          />
        )}
        {(isLoading || popularFantasyBooks.length > 0) && (
          <BookRow
            title="Popular Fantasy"
            books={isLoading ? skeletonArray : popularFantasyBooks}
            onBookClick={setSelectedBook}
            isLoading={isLoading}
          />
        )}
        {(isLoading || romanceBooks.length > 0) && (
          <BookRow
            title="Romance Bestsellers"
            books={isLoading ? skeletonArray : romanceBooks}
            onBookClick={setSelectedBook}
            isLoading={isLoading}
          />
        )}
        {(isLoading || classicSciFiBooks.length > 0) && (
          <BookRow
            title="Classic Sci-Fi"
            books={isLoading ? skeletonArray : classicSciFiBooks}
            onBookClick={setSelectedBook}
            isLoading={isLoading}
          />
        )}
        {(isLoading || youngAdultBooks.length > 0) && (
          <BookRow
            title="Young Adult Hits"
            books={isLoading ? skeletonArray : youngAdultBooks}
            onBookClick={setSelectedBook}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* About teaser, visible only when logged out */}
      {!isLoggedIn && (
        <section className={styles.aboutTeaser} aria-label="About BuchShelf">
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>Where every book has a story</h2>
            <p className={styles.aboutText}>
              Some books change you. BuchShelf exists to remember them.
            </p>
            <Link
              to="/about"
              className={`${styles.btn} ${styles.secondarybtn}`}
            >
              Read Ours
            </Link>
          </div>
        </section>
      )}

      {isLoggedIn && (
        <div className={styles.rows}>
          {(isLoading || trendingBooks.length > 0) && (
            <BookRow
              title="Trending Now"
              books={isLoading ? skeletonArray : trendingBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || featuredBooks.length > 0) && (
            <BookRow
              title="Award Winning Fiction"
              books={isLoading ? skeletonArray : featuredBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || topNonFictionBooks.length > 0) && (
            <BookRow
              title="Top Non-Fiction"
              books={isLoading ? skeletonArray : topNonFictionBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || cozyMysteryBooks.length > 0) && (
            <BookRow
              title="Cozy Mysteries"
              books={isLoading ? skeletonArray : cozyMysteryBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || historicalFictionBooks.length > 0) && (
            <BookRow
              title="Historical Fiction"
              books={isLoading ? skeletonArray : historicalFictionBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || psychologySelfHelpBooks.length > 0) && (
            <BookRow
              title="Psychology & Self-Help"
              books={isLoading ? skeletonArray : psychologySelfHelpBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || biographyMemoirBooks.length > 0) && (
            <BookRow
              title="Biographies & Memoirs"
              books={isLoading ? skeletonArray : biographyMemoirBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
          {(isLoading || crimeThrillerBooks.length > 0) && (
            <BookRow
              title="Crime & Thrillers"
              books={isLoading ? skeletonArray : crimeThrillerBooks}
              onBookClick={setSelectedBook}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
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


function Hero({ isLoggedIn, user }) {
  return (
    <section className={styles.hero}>
     
      <BookIllustration />
      
     
      <h1 className={styles.herotext}>
        {isLoggedIn
          ? `Hello, ${user?.username || "Reader"}! The books missed you.`
          : "All Your Books, One Cozy Shelf."}
      </h1>
      <p className={styles.herosubtext}>
        {isLoggedIn
          ? "The shelves have something new for you, dive back in!"
          : "A warm, quiet space to track your books and discover new ones."}
      </p>
      
     
      {!isLoggedIn ? (
        <div className={styles.herobtns}>
          <Link to="/login" className={`${styles.primarybtn} ${styles.btn}`}>
            Get Started
          </Link>
          <Link to="/signup" className={`${styles.secondarybtn} ${styles.btn}`}>
            Create Your Shelf
          </Link>
        </div>
      ) : (
        <div className={styles.herohints}>
          <span className={styles.hint}>Track your reading</span>
          {/* <span className={styles.hint}>Discover new favorites</span> */}
          <span className={styles.hint}>Build your collection</span>
        </div>
      )}
    </section>
  );
}

function FeaturedBooks({ books, onBookClick, isLoading }) {
  return (
    <section className={styles.FeaturedBooks}>
      <BookRow
        title="Featured Books"
        books={books}
        onBookClick={onBookClick}
        isLoading={isLoading}
      />
    </section>
  );
}

function Cta() {
  return (
    <section className={styles.cta}>
      <div className={styles.cardshuffle}></div>
      <div>
        <h2>Join BuchShelf Today!</h2>
        <p>Create your free account and start your reading journey.</p>
        <Link to="/signup" className={`${styles.btn} ${styles.secondarybtn}`}>
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}
