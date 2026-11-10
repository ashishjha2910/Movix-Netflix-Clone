import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import { getMovie, getTrending, imageUrl, searchMovies } from "./services/tmdb";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [mode, setMode] = useState("trending");

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError("");
    setMode("trending");
    try {
      const data = await getTrending();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  async function handleSearch(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return loadTrending();

    setLoading(true);
    setError("");
    setMode("search");
    try {
      const data = await searchMovies(value);
      setMovies(data.results || []);
      if (!data.results?.length) setError("No movies found. Try another title.");
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function openMovie(movie) {
    setSelected(movie);
    setDetailLoading(true);
    try {
      const details = await getMovie(movie.id);
      setSelected(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Movix home">MOVIX<span>.</span></a>
        <nav><button onClick={loadTrending} type="button">Discover</button></nav>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            aria-label="Search movies"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">YOUR MOVIE DESTINATION</span>
            <h1>Find your next<br /><span>favourite film.</span></h1>
            <p>Explore trending movies, discover new stories and find something worth watching.</p>
            <button className="primary-button" onClick={loadTrending} type="button">
              Explore trending
            </button>
          </div>
          <div className="hero-decoration" aria-hidden="true">M</div>
        </section>

        <section className="catalog">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{mode === "search" ? "SEARCH RESULTS" : "UPDATED WEEKLY"}</span>
              <h2>{mode === "search" ? "Movie results" : "Trending this week"}</h2>
            </div>
            <span className="result-count">{movies.length} titles</span>
          </div>

          {loading && <div className="message">Loading movies...</div>}
          {!loading && error && <div className="message error">{error}</div>}
          {!loading && !error && movies.length > 0 && (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSelect={openMovie} />
              ))}
            </div>
          )}
        </section>
      </main>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)} role="presentation">
          <section className="movie-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Movie details">
            <button className="close-button" onClick={() => setSelected(null)} type="button" aria-label="Close">×</button>
            {selected.backdrop_path && (
              <img className="modal-backdrop-image" src={imageUrl(selected.backdrop_path, "w1280")} alt="" />
            )}
            <div className="modal-content">
              <span className="eyebrow">MOVIX DISCOVERY</span>
              <h2>{selected.title}</h2>
              <p className="modal-meta">
                {selected.release_date?.slice(0, 4) || "Year unavailable"} ·
                {" "}★ {Number(selected.vote_average || 0).toFixed(1)}
              </p>
              {detailLoading ? <p>Loading details...</p> : <p>{selected.overview || "No overview available."}</p>}
              {selected.genres?.length > 0 && (
                <div className="genre-list">{selected.genres.map((g) => <span key={g.id}>{g.name}</span>)}</div>
              )}
            </div>
          </section>
        </div>
      )}

      <footer>Built with React and TMDB · Movix</footer>
    </div>
  );
}

export default App;
