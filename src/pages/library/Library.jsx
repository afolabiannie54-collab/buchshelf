import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLibrary } from "../../context/LibraryContext";
import { useBooks } from "../../context/BooksContext";
import BookDetailModal from "../../components/BookDetailModal/BookDetailModal";
import ManageAccountModal from "../../components/ManageAccountModal/ManageAccountModal";
import BookRow from "../../components/BookRow/BookRow";
import EmptyBookRow from "../../components/EmptyBookRow/EmptyBookRow";
import styles from "./Library.module.css";
import ReadingGoalCard from "../../components/ReadingGoalCard/ReadingGoalCard";
import EditGoalModal from "../../components/EditGoalModal/EditGoalModal";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, updateProfile, updatePassword } = useAuth();
  const {
    library,
    favorites,
    addToLibrary,
    removeFromLibrary,
    toggleFavorite,
    getBookStatus,
    isFavorite,
    // goals helpers
    getGoal,
    setGoal,
    getGoalProgress,
    getAvailableYears,
  } = useLibrary();
  const { selectedBook, setSelectedBook } = useBooks();

  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = getAvailableYears();
  const [viewYear, setViewYear] = useState(currentYear);

  if (!isLoggedIn) {
    return (
      <div className={styles.containeremp}>
        <div className={styles.emptyState}>
          <h1>Your Shelf is Empty</h1>
          <p>
            Sign in to save your favorite books and build your reading list.
          </p>
          <Link to="/login" className={styles.ctaBtn}>
            Sign In to Your Account
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const wantToReadBooks = library["want-to-read"] || [];
  const currentlyReadingBooks = library["currently-reading"] || [];
  const finishedBooks = library.finished || [];
  const favoritesBooks = favorites || [];

  return (
    <div className={styles.container}>
      {/* Profile Header */}

      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <h1>Hello, {user?.username}!</h1>
          <p>{user?.email}</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.manageBtn}
            onClick={() => setIsManageOpen(true)}
          >
            Manage
          </button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Reading Goal Card */}
      <div className={styles.profileActions}>
        <ReadingGoalCard
          year={viewYear}
          {...getGoalProgress(viewYear)}
          years={years}
          selectedYear={viewYear}
          onYearChange={(y) => setViewYear(y)}
          onEdit={() => setIsEditGoalOpen(true)}
        />
      </div>

      {/* Manage Account Modal */}
      {isManageOpen && (
        <ManageAccountModal
          onClose={() => setIsManageOpen(false)}
          user={user}
          onUpdateProfile={updateProfile}
          onUpdatePassword={updatePassword}
        />
      )}

      {/* Edit Goal Modal (current year only) */}
      {isEditGoalOpen && (
        <EditGoalModal
          isOpen={isEditGoalOpen}
          onClose={() => setIsEditGoalOpen(false)}
          currentYear={currentYear}
          initialTarget={getGoal(currentYear)?.target}
          onSave={(target) => {
            setGoal(target);
            setIsEditGoalOpen(false);
            setViewYear(currentYear);
          }}
        />
      )}

      {/* Want to Read Section */}
      {wantToReadBooks.length > 0 ? (
        <div className={styles.wtrsection}>
          <BookRow
            title={`Want to Read (${wantToReadBooks.length})`}
            books={wantToReadBooks}
            onBookClick={setSelectedBook}
          />
        </div>
      ) : (
        <div className={styles.wtrsection}>
          <EmptyBookRow
            title="Want to Read"
            message="No books yet. Browse and add books to get started!"
          />
        </div>
      )}

      {/* Currently Reading Section */}
      {currentlyReadingBooks.length > 0 ? (
        <div className={styles.crsection}>
          <BookRow
            title={`Currently Reading (${currentlyReadingBooks.length})`}
            books={currentlyReadingBooks}
            onBookClick={setSelectedBook}
          />
        </div>
      ) : (
        <div className={styles.crsection}>
          <EmptyBookRow
            title="Currently Reading"
            message="Start your next great read!"
          />
        </div>
      )}

      {/* Finished Section */}
      {finishedBooks.length > 0 ? (
        <div className={styles.fbsection}>
          <BookRow
            title={`Finished (${finishedBooks.length})`}
            books={finishedBooks}
            onBookClick={setSelectedBook}
          />
        </div>
      ) : (
        <div className={styles.fbsection}>
          <EmptyBookRow
            title="Finished"
            message="Books you've finished will appear here."
          />
        </div>
      )}

      {/* Favorites Section */}
      {favoritesBooks.length > 0 && (
        <div className={styles.favsection}>
          {" "}
          <BookRow
            title={`Your Favorites (${favoritesBooks.length})`}
            books={favoritesBooks}
            onBookClick={setSelectedBook}
          />
        </div>
      )}

      {/* Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToLibrary={addToLibrary}
        onToggleFavorite={toggleFavorite}
        currentStatus={selectedBook ? getBookStatus(selectedBook.id) : null}
        isFavorite={selectedBook ? isFavorite(selectedBook.id) : false}
        isLoggedIn={isLoggedIn}
        onRemoveFromLibrary={removeFromLibrary}
      />
    </div>
  );
}
