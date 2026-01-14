# BuchShelf Project Documentation

## Overview

This document summarizes the behavior of the Google Books API used in BuchShelf, the engineering mitigations implemented to improve reliability and quality, and the rationale behind key trade‑offs. It is intended as a defense and reference for variability you may observe across pages and reloads.

## API Behavior and Constraints

- Fuzzy search: The Google Books `q` search is non‑deterministic. Results vary by time, region, and index freshness.
- Sparse metadata: Many volumes lack `authors`, `description`, `pageCount`, or `categories`, which reduces usable results when applying strict quality filters.
- Free tier limits: Rate limits, transient failures, or referrer restrictions can occasionally produce partial or empty payloads.
- Broad queries: Generic terms (e.g., “bestseller”) are noisy; small ranking changes can visibly alter outcomes.

## Mitigations Implemented

**Service Layer Controls**

- Clamp `maxResults` to 40 and guard against empty queries: [src/services/googleBooksAPI.js](src/services/googleBooksAPI.js)
- Stable params to reduce noise: `printType=books`, `orderBy=relevance`, `langRestrict=en` in `searchBooks()`.
- Conditional API key usage and dev‑only logging (no sensitive URLs): [src/services/googleBooksAPI.js](src/services/googleBooksAPI.js)
- Graceful fallback: If a key‑restricted request fails, retry once without the key to avoid hard failures while developing.

**Search and Genre Pages**

- Debounced search (500ms) with strict normalization: [src/hooks/useGoogleBooks.js](src/hooks/useGoogleBooks.js)
- Genre‑only fetch when no text is entered (strictly normalized): [src/pages/browse/Browse.jsx](src/pages/browse/Browse.jsx)
- Client‑side genre filtering against `book.genre` and `book.allCategories`: [src/pages/browse/Browse.jsx](src/pages/browse/Browse.jsx)
- Rendering resilience: Hide empty `BookRow` when no results; show meaningful empty states and curated rows to keep the page engaging: [src/pages/browse/Browse.jsx](src/pages/browse/Browse.jsx)

**Author Page**

- Robust routing and decoding of author names: [src/pages/author/Author.jsx](src/pages/author/Author.jsx)
- Author search tries simple name first, then `inauthor:"name"`: [src/services/googleBooksAPI.js](src/services/googleBooksAPI.js)
- Strict normalization; if no rated books exist, show normalized results so legitimate works still appear: [src/pages/author/Author.jsx](src/pages/author/Author.jsx)

**UI/UX Quality**

- Book description truncation with Read More/Less toggle to handle extremely long blurbs: [src/components/BookDetailModal/BookDetailModal.jsx](src/components/BookDetailModal/BookDetailModal.jsx)
- Skeleton loaders for all rows to communicate loading status: [src/components/SkeletonCard/SkeletonCard.jsx](src/components/SkeletonCard/SkeletonCard.jsx)
- Increased curated rows on Home to avoid sparsity while keeping strict filtering and existing components: [src/pages/home/Home.jsx](src/pages/home/Home.jsx)

**Security**

- API key handled via env var; appended only if present; sensitive URLs are not logged: [src/services/googleBooksAPI.js](src/services/googleBooksAPI.js)
- Referrer restrictions set on the key to limit usage to local development origins.
- Guidance to rotate keys when exposed; no keys hard‑coded in source.

## Trade‑Offs and Rationale

- Favor quality over quantity: Strict filters remove low‑quality items (missing authors, too‑short descriptions, etc.), which can yield fewer books but improves overall user experience.
- Accept variability: A free, public API has non‑deterministic search and sparse metadata; variability is expected. We mitigate it but do not attempt to override it.
- Keep the UI robust: Empty rows do not render; users see clear empty states and curated content instead of blank sections.

## Verification Guide

- Home: Rows load with skeletons and then populate; any category with 0 strict matches is hidden rather than shown empty: [src/pages/home/Home.jsx](src/pages/home/Home.jsx)
- Browse: Search (3+ chars) fetches; genre‑only mode fetches first selected genre; empty results show a clear message without an empty row: [src/pages/browse/Browse.jsx](src/pages/browse/Browse.jsx)
- Author: Navigate via modal author link; page displays strictly normalized works, falling back to un‑rated normalized results when ratings are missing: [src/pages/author/Author.jsx](src/pages/author/Author.jsx)

## Future Improvements (Optional)

- Subject‑anchored curated queries (e.g., `subject:Romance`) for more deterministic results.
- Short‑TTL per‑row caching to smooth out reload variability without changing strictness.
- Deterministic client‑side sorting for certain rows (e.g., by `publishedDate` or `ratingsCount`).
- Backend proxy (keep key server‑side) if moving beyond a school project.

---

This project prioritizes core functionality and a clean user experience under realistic API constraints. The site’s main processes are working; the API is “good enough” with documented guardrails and strict filters to ensure reasonable content quality.
