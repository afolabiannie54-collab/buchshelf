# BuchShelf — Book Discovery & Personal Library

“Netflix for books” vibe: curated discovery rows, fast search, author pages, and a personal library with favorites and reading goals — all powered by the Google Books API.

## Overview

BuchShelf helps users discover books and organize their reading. It focuses on clean UX, reliable results under real API constraints, and a cozy experience with skeleton loaders and detail modals.

Key capabilities:

- Curated discovery rows on Home (Trending, Featured, Genres)
- Search with debounce and genre filters on Browse
- Author pages with robust handling and rating-aware sorting
- Personal library: want-to-read, currently-reading, finished
- Favorites, reading goals per year, and a detailed book modal

See the deeper API behavior, mitigations, and trade-offs in [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

## Tech Stack

- React 19 + Vite 7
- React Router 7
- CSS Modules
- AOS, react-icons

## Architecture

- Contexts: [AuthContext](src/context/AuthContext.jsx), [LibraryContext](src/context/LibraryContext.jsx), [BooksContext](src/context/BooksContext.jsx)
- Services: [googleBooksAPI](src/services/googleBooksAPI.js) — search helpers and curated queries
- Hooks: [useDebounce](src/hooks/useDebounce.js), [useGoogleBooks](src/hooks/useGoogleBooks.js)
- Utils: [bookFilter](src/utils/bookFilter.js) — normalization, strict filtering, rating sort
- Pages: Home, Browse, Author, Library, Login/Signup, About, etc.
- Components: `BookRow`, `BookCard`, `BookDetailModal`, `SearchBar`, `SkeletonCard`, `GenreStack`, and more

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

Create a `.env` file at the project root (or copy [.env.example](.env.example)):

```
VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
```

Security guidance is in [SECURITY_API_KEY_EXPOSED.md](SECURITY_API_KEY_EXPOSED.md).

3. Run the app

```bash
npm run dev
```

4. Build & preview

```bash
npm run build
npm run preview
```

## How It Works

- The service layer clamps `maxResults`, enforces stable params, and retries without a key in dev if referrer blocks occur.
- `useGoogleBooks` fetches up to 40 items, then normalizes and filters to remove low-quality results (e.g., academic papers, short docs, missing authors).
- Pages render skeletons first. Empty rows are hidden; clear empty states are shown instead.
- Library and favorites are stored per-user in `localStorage` via `LibraryContext`.

## Demo Script (Defense)

1. Home: show curated rows and skeletons while loading.
2. Browse: type 3+ chars; observe debounced search; toggle genres.
3. Author: navigate from a book modal’s author; show rating-aware sorting.
4. Library: add to "want-to-read", move to "finished"; toggle favorite.
5. Goals: set a yearly goal and check progress text.

Questions & rationale: see [DEFENSE_GUIDE.md](DEFENSE_GUIDE.md) and [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

## Limitations & Roadmap

- Public API variability: results can change; mitigated via strict filters and curated queries.
- No backend: API key is client-side for dev; for production, use a server proxy.
- Future: short-TTL caching, deterministic sorting, recommendation signals, and server-side key management.
