<<<<<<< HEAD
# DevHire

A modern, high-performance job discovery and application tracking frontend built with React. DevHire demonstrates professional-grade UI/UX design, complex state management without external libraries, and robust client-side architecture.

## Features

* **Job Search & Advanced Filtering:** Search by keyword, location, and filter by job type, work mode, and experience.
* **Automatic Application Tracking:** One-click apply instantly persists to a Kanban-style tracking board.
* **Application Status Management:** Drag-and-drop or select statuses (Applied, Interview, Offer, etc.) with real-time analytics updates.
* **Saved Jobs:** Bookmark jobs for later review.
* **Dashboard Analytics:** High-level overview of application progress.
* **Dark/Light Mode:** Seamless theme switching synced to system preferences.
* **Responsive & Accessible:** Fully responsive across mobile, tablet, and desktop, honoring `prefers-reduced-motion` for accessibility.
* **Modern Animations:** Subtle, performant scroll-reveal animations using Intersection Observer.

## Tech Stack

* **Core:** React 18, JavaScript
* **Build Tool:** Vite
* **Routing:** React Router DOM (v6)
* **Styling:** CSS Modules (Vanilla CSS, no frameworks)
* **Icons:** Lucide React
* **Data Persistence:** LocalStorage API

*(Note: This project does not use Redux, Tailwind, or complex animation libraries like Framer Motion to demonstrate raw React/CSS proficiency).*

## Key Frontend Engineering Concepts

### Component Architecture & Styling
The application is built using atomic design principles (UI components like `Button`, `Input`, `Badge` in `src/components/ui`). Styling uses CSS Modules, ensuring zero CSS collision. A global `index.css` manages design tokens (variables for colors, spacing, radius) enabling instant dark mode support.

### State Management & Persistence
Instead of reaching for Redux or Zustand, the app uses a custom `useLocalStorage` hook to safely parse and serialize state to the browser. The `useApplications` hook wraps this, providing a domain-specific API (`addCustomApplication`, `updateApplicationStatus`) ensuring unidirectional data flow and a single source of truth.

### IntersectionObserver Animations
Scroll animations are powered by a custom `useInView` hook utilizing the native `IntersectionObserver` API. Elements gracefully fade in using the `<Reveal>` wrapper only when they enter the viewport. It strictly checks `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable animations for users who require it.

### Debounced Search
To prevent heavy filtering computations on every keystroke, a custom `useDebounce` hook delays state updates by 300ms, ensuring a smooth typing experience on the Jobs page.

## Project Structure

```text
src/
├── components/       # Reusable UI elements (Button, Input, JobCard, Reveal)
├── context/          # React Context providers (ToastContext)
├── data/             # Mock database (mockJobs.js)
├── hooks/            # Custom hooks (useApplications, useDebounce, useInView, useLocalStorage)
├── pages/            # Route-level components (Home, Jobs, Applications, Dashboard)
├── App.jsx           # Main routing definition
└── index.css         # Global design tokens and resets
```

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/devhire.git

# Navigate into the directory
cd devhire

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Build & Deployment

```bash
# Create a production-ready bundle
npm run build
```
This project is configured for seamless deployment on Vercel. A `vercel.json` is included to handle SPA (Single Page Application) routing rewrites.

## Environment Variables

This project runs completely locally, but an `.env.example` file is provided to demonstrate where backend API endpoints and authentication keys (like Auth0) would be configured in a production environment.

## Screenshots

*(Add screenshots here)*
* `![Homepage Hero](./public/assets/home.png)`
* `![Application Tracker](./public/assets/tracker.png)`
* `![Job Search](./public/assets/search.png)`

## Future Improvements

* **Backend Integration:** Replace `mockJobs.js` with a real REST or GraphQL API (e.g., Node/Express + PostgreSQL).
* **Authentication:** Implement real user login using OAuth/JWT instead of the current mock UI flow.
* **Real Job Provider API:** Integrate with a third-party job board API (like Reed or Adzuna) to fetch live job listings.
* **Drag and Drop:** Upgrade the Kanban board to use a library like `dnd-kit` for full physical drag-and-drop interactions.
=======
# devhire
>>>>>>> 9eb71c2db39a919310ca56f9d6fc6e67029d3f0a
