// src/components/Footer/Footer.jsx
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/buchshelflogo.png";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo and tagline */}
        <div className={styles.footerSection}>
          <img
            src={logo}
            alt="Buchshelf logo"
            className={styles.logo}
            width="64"
            height="32"
          />
          <p className={styles.tagline}>Your cozy corner for book tracking</p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul className={styles.linkList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
            <li>
              <Link to="/library">My Library</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className={styles.footerSection}>
          <h4>Account</h4>
          <ul className={styles.linkList}>
            <li>
              {isLoggedIn ? (
                <Link to="/library">Profile</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {isLoggedIn ? (
                <Link onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to="/signup">Sign Up</Link>
              )}
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Twitter" rel="noopener">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" rel="noopener">
              <FaInstagram />
            </a>
            <a href="#" aria-label="GitHub" rel="noopener">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 Buchshelf. Built with love for book lovers.</p>
      </div>
    </footer>
  );
}
