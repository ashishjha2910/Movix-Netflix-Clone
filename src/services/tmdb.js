const API_BASE = "https://api.themoviedb.org/3";

async function request(endpoint, params = {}) {
  const key = process.env.REACT_APP_TMDB_API_KEY;

  if (!key || key === "your_tmdb_api_key_here") {
    throw new Error("Add your TMDB API key to .env.local to load movie data.");
  }

  const query = new URLSearchParams({ ...params, api_key: key });
  const response = await fetch(`${API_BASE}${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}). Check your API key and try again.`);
  }

  return response.json();
}

export const getTrending = () => request("/trending/movie/week");
export const searchMovies = (query) => request("/search/movie", { query });
export const getMovie = (id) => request(`/movie/${id}`);
export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
