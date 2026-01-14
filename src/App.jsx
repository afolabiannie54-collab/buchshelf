import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import RootRoutes from "./routes";
import NavBar from "./components/navbar/NavBar.jsx";
import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";
import { BooksProvider } from "./context/BooksContext";
import CursorSparkles from "./components/CursorSparkles/CursorSparkles.jsx";
import Footer from "./components/Footer/Footer.jsx";
import BackToTop from "./components/BackToTop/BackToTop.jsx";

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <BooksProvider>
          <BrowserRouter>
            <CursorSparkles />
            <NavBar />
            <RootRoutes />
            <Footer />
            <BackToTop />
          </BrowserRouter>
        </BooksProvider>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;
