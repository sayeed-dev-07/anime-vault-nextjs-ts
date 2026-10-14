# 🌸 AniSearch

> A responsive anime and manga discovery app. Browse catalog entries, top-ranked titles, and genres; search anime and manga; open detailed title pages; and save favorites locally.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

---

## ✨ Features

- **Discover & Browse:** Explore extensive catalogs of anime and manga by genre or top rankings.
- **Granular Search:** Find exactly what you're looking for with robust search functionality.
- **Detailed Entries:** View comprehensive details, synopses, and stats for specific titles.
- **Local Favorites:** Save your top picks directly to your browser using persistent local storage.
- **Smooth UX:** Enjoy fluid animations, smooth scrolling, and infinite loading responsive masonry grids.

---

## 🛠 Tech Stack

### Core Architecture
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript

### State Management & Data Fetching
- **Server State & Caching:** TanStack Query
- **Client State & Persistence:** Zustand (for locally saved favorites)

### Styling & Animation
- **CSS Framework:** Tailwind CSS 4
- **Animations:** GSAP, Motion
- **Scrolling:** Lenis (smooth scrolling)
- **Layouts:** React Masonry CSS (responsive grids)
- **Iconography:** Lucide React, React Icons

---

## 🚀 Getting Started

To run AniSearch locally, ensure you have Node.js installed, then execute the following commands:

```bash
# Clone the repository 
git clone https://github.com/sayeed-dev-07/anime-vault-nextjs-ts.git
cd anisearch

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development environment |
| `npm run build` | Compiles the application for production deployment |
| `npm run lint` | Runs static code analysis to ensure code quality |

---

## 📡 Data Architecture & Fetching

AniSearch utilizes **TanStack Query** to deliver a resilient, cached, and performant data-fetching layer:

- **Global Provider:** `QueryClientProvider` is initialized in `app/providers.tsx` to maintain a shared client-side cache.
- **Granular Query Keys:** Descriptive keys ensure that different content types, limits, and ranking variants are cached independently, preventing state collisions.
- **Cache Strategy:** The shared client uses a baseline 1-minute stale time. Specialized collection and paginated queries override this with their own tailored intervals.
- **Resilient Fetching:** An internal helper (`components/Fetch.tsx`) wraps standard fetch requests with automated timeouts, retries, and exponential backoff to handle rate limits and network drops.
- **State Rendering:** Dedicated loading skeletons and error boundaries are rendered directly within their respective UI components.

---

## 🔄 Pagination & Infinite Loading

The platform implements infinite scrolling using `useInfiniteQuery` across the browse, top-ranked, and genre pages:

1. **Initialization:** Navigation begins at page 1, calling `components/InfinityFetch.tsx` with specific query parameters (content type, ranking mode, or genre ID).
2. **Page Detection:** `getNextPageParam` evaluates the API's pagination payload to determine whether subsequent pages exist.
3. **Grid Rendering:** Consecutive API responses are flattened and rendered into a unified, responsive masonry layout.
4. **Viewport Sentinel:** A `react-intersection-observer` trigger placed at the bottom of the feed detects when the user reaches the end of the loaded content and fetches the next page automatically.
5. **Search Modification:** The dedicated search route (`components/SearchFetch.tsx`) shares the same TanStack Query pagination logic, but replaces the automated sentinel with an **Expand Gallery** action button for manual control.

---

## 📂 Project Structure

```text
├── app/                  # App Router: Routes, layouts, global styles, and providers
│   ├── (anime)/          # Anime domains: Listings, rankings, genres, details
│   ├── (manga)/          # Manga domains: Listings, rankings, genres, details
│   ├── favourite/        # Local user favorites collection
│   └── search/           # Global search interface
├── components/           # Modular UI components, cards, and query wrappers
│   ├── Providers/        # Client-side context providers (e.g., Lenis smooth scrolling)
│   ├── store/            # Zustand logic for favorite state persistence
│   └── ui/               # Reusable headless and styled UI primitives
├── lib/                  # Shared utility functions and fetch helpers
└── public/               # Static assets, icons, and placeholder data
```

---

## ⚖️ API Attribution & Legal

AniSearch consumes the open-source **Tenrai API** (`api.tenrai.org`) to fetch anime and manga metadata.

- **Disclaimer of Ownership:** This project does not own, operate, or claim any rights to the Tenrai API or the underlying catalog data it serves. All data belongs to its respective original copyright holders.
- **Original Architecture:** The frontend application codebase—encompassing architecture, interface design, animations, component structures, and state management logic—is the original work of this project's author.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).