# BuchShelf Defense Guide

Use this as a quick reference during your project defense.

## Project Framing

- Problem: Finding quality books quickly and keeping a neat personal shelf.
- Scope: Book discovery + personal library (favorites, statuses, goals), not full-blown recommendations (yet).
- Positioning: "Netflix for books" feel — curated rows + fast search.

## Architecture Talking Points

- React + Vite; React Router; CSS Modules for isolation.
- Context-driven state: Auth, Library, Books.
- Service layer around Google Books API with guardrails: clamped params, stable query options, and safe dev logging.
- Strict normalization and filtering to improve result quality.

## Security & Privacy

- API key via env (`VITE_GOOGLE_BOOKS_API_KEY`); never hard-coded.
- Referrer restrictions on the key; rotate if exposed (see SECURITY_API_KEY_EXPOSED.md).
- User data (library, favorites, goals) stored locally in `localStorage`; no external backend.

## Demo Flow

1. Home: Curated rows load with skeletons; click a book to open the modal.
2. Browse: Type 3+ chars; observe debounce; apply genre filters.
3. Author: Navigate to author page; show normalized + rating-aware sorting.
4. Library: Add to statuses; toggle favorites; show per-user persistence.
5. Goals: Set a yearly goal; show progress and pace text.

## Anticipated Questions

- Why Google Books API? Free, broad catalog; fits a school project; known constraints documented.
- How do you handle unreliable results? Strict filters, curated subject queries, debounced fetch, hidden empty rows.
- Why contexts over Redux? Simpler footprint; fits app scale.
- How is performance handled? Debounce, limit results, skeletons, and minimal re-renders via context boundaries.
- What if metadata is missing? Normalize; fallback to less strict filters; rating-aware sort when available.
- Is my data safe? Stored locally; no server; key restrictions; zero PII shared.

## Trade-offs

- Fewer results vs higher quality display: intentional for UX.
- Client-side key for dev: acceptable for a school project; would move server-side later.

## Roadmap

- Server proxy for secure key usage.
- Short-TTL caching and deterministic sorting.
- Recommendation features (collaborative signals, reading history).
- Author bios and richer metadata.

For API behavior and detailed mitigations, see PROJECT_DOCUMENTATION.md.

---

## Feature Gaps & Why

- Personalized recommendations: Requires backend data, user signals, and ranking models; out of scope for a school project. Current alternative is curated discovery rows.
- User reviews/comments: Needs a database, authentication, and moderation to prevent abuse; not included to keep scope focused and safe.
- Social features (friends, feeds, sharing): Adds privacy and complexity; deferred to keep the app simple and reliable.
- Reading progress tracking (pages/time): Chosen simpler statuses (want-to-read/currently-reading/finished). Detailed tracking would require more UI and possibly a backend.
- Dark mode/theme toggle: Not implemented; design kept consistent with the warm palette. Can be added by extending `:root` variables and a toggle.
- Advanced filters/sorting (year, length, ratings, pagination): Basic genre filters exist. More controls would add UI complexity; left for future iterations.
- Offline/PWA and mobile app: Out of scope. PWA is feasible later.
- Cloud sync/auth backend: Local-only storage via `localStorage` to avoid backend cost/complexity.
- Import/export library: Useful but not essential; can add a JSON export/import tool later.
- Manual book entries (custom books): Avoided to keep data consistent with Google Books. Could be added with a simple form.
- Notifications/reminders: Would require service workers or a backend scheduler; not essential for MVP.

## Plain Answers (Non-Technical)

- What is it? A website to discover books and organize your reading in a simple, cozy way.
- Why no recommendations? That needs a lot of data and a server. For this project, we focused on curated discovery that works well now.
- Where are the reviews? Adding public reviews requires moderation and a database. We avoided that to keep it safe and simple.
- Can it remember my books? Yes. Your shelf, favorites, and goals are saved on your device.
- Why not dark mode? We prioritized core features first. It’s easy to add later.
- Is my information shared? No. It’s saved only on your device for this project.
- What’s next if we had more time? Better filters, dark mode, secure backend, and smarter discovery.

## Technical Q&A (Concise)

- Variability in results? Google Books is non-deterministic; we mitigate with strict filters, subject-based queries, and debounce.
- Missing metadata? We normalize and filter; fall back to a less strict mode when needed.
- Why clamp `maxResults`? API allows up to 40; we fetch more to filter down to quality results without overloading the UI.
- State management choice? React Contexts are adequate for this app size; avoids Redux complexity.
- Key security? Env-based, referrer-restricted; rotate if exposed. For production, use a server proxy.

## Prioritized Future Upgrades

1. Theme toggle (dark mode) using CSS variables and a simple context.
2. Export/import library (JSON) to move shelves between devices.
3. Advanced filters (year, page count, ratings) and sorting.
4. Server proxy for API key security and caching.
5. Basic recommendations (subject/author-based + user favorites).

## Constraints (Stated Simply)

- Public API results change; we accept that and make the experience stable.
- No backend means local-only storage; simpler and safer for a school project.
- Feature choices favor a smooth, reliable demo over complexity.
