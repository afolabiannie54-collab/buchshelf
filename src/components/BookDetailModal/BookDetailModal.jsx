import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import { FiX, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function BookDetailModal({
  book,
  isOpen,
  onClose,
  onAddToLibrary,
  onToggleFavorite,
  currentStatus,
  isFavorite,
  isLoggedIn,
  onRemoveFromLibrary,
}) {
  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const desc = book.description || "No description available.";
  const maxLen = 300;
  const isLong = desc.length > maxLen;
  const displayDesc =
    showFullDesc || !isLong ? desc : desc.slice(0, maxLen) + "…";

  const handleOverlayClick = (e) => {
    // Close only if clicking the overlay directly, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        {/* Modal Content */}
        <div className={styles.content}>
          {/* Left: Cover Section */}
          <div className={styles.coverSection}>
            <div
              className={styles.cover}
              style={{ backgroundColor: book.coverColor }}
            >
              {book.cover && (
                <img src={book.cover} alt={book.title} decoding="async" />
              )}
            </div>

            {/* Favorite Button */}
            <button
              className={styles.favoriteBtn}
              onClick={() => {
                if (!isLoggedIn) {
                  navigate("/login");
                  onClose();
                } else {
                  onToggleFavorite(book);
                }
              }}
              disabled={!isLoggedIn}
              title={!isLoggedIn ? "Sign in to favorite books" : ""}
            >
              {isFavorite ? (
                <>
                  <FaHeart size={18} color="#e74c3c" />
                  <span>Favorited</span>
                </>
              ) : (
                <>
                  <FiHeart size={18} />
                  <span>Add to Favorites</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Info Section */}
          <div className={styles.info}>
            <h1 className={styles.title}>{book.title}</h1>
            <button
              className={styles.authorLink}
              onClick={() => {
                navigate(`/author/${encodeURIComponent(book.author)}`);
                onClose();
              }}
            >
              by {book.author}
            </button>

            {book.rating && (
              <div className={styles.rating}>★ {book.rating.toFixed(1)}</div>
            )}

            {/* Meta Info */}
            <div className={styles.meta}>
              {book.genre && <span>{book.genre}</span>}
              {book.pageCount && <span>{book.pageCount} pages</span>}
            </div>

            {/* Description */}
            <p className={styles.description}>{displayDesc}</p>
            {isLong && (
              <button
                className={styles.readToggle}
                onClick={() => setShowFullDesc((v) => !v)}
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            )}

            {/* Add to Library Actions */}
            {isLoggedIn ? (
              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${
                    currentStatus === "want-to-read" ? styles.active : ""
                  }`}
                  onClick={() => onAddToLibrary(book, "want-to-read")}
                >
                  {currentStatus === "want-to-read"
                    ? "✓ Want to Read"
                    : "Want to Read"}
                </button>

                <button
                  className={`${styles.actionBtn} ${
                    currentStatus === "currently-reading" ? styles.active : ""
                  }`}
                  onClick={() => onAddToLibrary(book, "currently-reading")}
                >
                  {currentStatus === "currently-reading"
                    ? "✓ Currently Reading"
                    : "Currently Reading"}
                </button>

                <button
                  className={`${styles.actionBtn} ${
                    currentStatus === "finished" ? styles.active : ""
                  }`}
                  onClick={() => onAddToLibrary(book, "finished")}
                >
                  {currentStatus === "finished"
                    ? "✓ Finished"
                    : "Mark as Finished"}
                </button>

                {currentStatus && (
                  <>
                    <p className={styles.statusNote}>
                      This book is in your library!
                    </p>
                    {onRemoveFromLibrary && (
                      <button
                        className={styles.removeBtn}
                        onClick={() => {
                          onRemoveFromLibrary(book.id);
                          onClose();
                        }}
                      >
                        Remove from Library
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className={styles.loginPrompt}>
                <p>Sign in to add books to your library</p>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    onClose();
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
                <button
                  className={styles.signupBtn}
                  onClick={() => {
                    onClose();
                    navigate("/signup");
                  }}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
