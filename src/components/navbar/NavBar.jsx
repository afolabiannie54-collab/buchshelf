import logo from "../../assets/buchshelflogo.png";
import styles from "./NavBar.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isSolidBgPage =
    location.pathname === "/about" || location.pathname === "/faq";

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${
        hasScrolled || isSolidBgPage ? styles.scrolled : ""
      }`}
    >
      <div>
        <Link to="/">
          <img src={logo} alt="Buchshelf Logo" />
        </Link>
      </div>

      <div className={`${styles.links} ${isOpen ? styles.active : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/genres"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => setIsOpen(false)}
        >
          Genres
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => setIsOpen(false)}
        >
          My Library
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => setIsOpen(false)}
        >
          About
        </NavLink>
      </div>

      <div className={styles.icons}>
        <NavLink
          to={isLoggedIn ? "/library" : "/login"}
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.activeIcon : ""}`
          }
        >
          <CgProfile size={28} />
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.activeIcon : ""}`
          }
        >
          <FiSearch size={24} />
        </NavLink>
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu size={28} />
        </button>
      </div>
    </nav>
  );
}
