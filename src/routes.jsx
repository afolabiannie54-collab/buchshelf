import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/home/Home";
import { useScrollToTop } from "./hooks/useScrollToTop";

// Lazy load pages for code splitting
const LibraryPage = lazy(() => import("./pages/library/Library"));
const LoginPage = lazy(() => import("./pages/login/Login"));
const SignupPage = lazy(() => import("./pages/signup/Signup"));
const BrowsePage = lazy(() => import("./pages/browse/Browse"));
const AuthorPage = lazy(() => import("./pages/author/Author"));
const ContactPage = lazy(() => import("./pages/contact/Contact"));
const AboutPage = lazy(() => import("./pages/about/About"));
const FAQPage = lazy(() => import("./pages/faq/FAQ"));

// Loading fallback component
const PageLoader = () => <div style={{ minHeight: "100vh" }} />;

export default function RootRoutes() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/genres"
        element={
          <Suspense fallback={<PageLoader />}>
            <BrowsePage />
          </Suspense>
        }
      />
      <Route
        path="/library"
        element={
          <Suspense fallback={<PageLoader />}>
            <LibraryPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<PageLoader />}>
            <SignupPage />
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense fallback={<PageLoader />}>
            <BrowsePage />
          </Suspense>
        }
      />
      <Route
        path="/author/:authorName"
        element={
          <Suspense fallback={<PageLoader />}>
            <AuthorPage />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="/faq"
        element={
          <Suspense fallback={<PageLoader />}>
            <FAQPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
