# Movix — Movie Discovery App

A responsive React movie discovery application powered by The Movie Database (TMDB).

## Features

- Weekly trending movie discovery
- Search movies by title
- Movie posters, release year and ratings
- Movie detail view with overview and genres
- Responsive layout for desktop and mobile
- Loading and API error states

## Tech stack

- React 18
- JavaScript
- CSS
- TMDB API

## Run locally

Requirements: Node.js 18+ and npm.

```bash
git clone https://github.com/ashishjha2910/Movix-Netflix-Clone.git
cd Movix-Netflix-Clone
npm install
```

Create a TMDB API key from https://www.themoviedb.org/settings/api.

Create `.env.local` in the project root:

```env
REACT_APP_TMDB_API_KEY=your_actual_api_key
```

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

The `.env.local` file is ignored by Git. Never commit API credentials.

## Project structure

```text
src/
  components/
    MovieCard.js
  services/
    tmdb.js
  App.js
  App.css
  index.js
```

## Attribution

Movie metadata and images are provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
