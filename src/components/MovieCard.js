import React from "react";
import { imageUrl } from "../services/tmdb";

export default function MovieCard({ movie, onSelect }) {
  return (
    <button className="movie-card" onClick={() => onSelect(movie)} type="button">
      {movie.poster_path ? (
        <img src={imageUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" />
      ) : (
        <div className="poster-placeholder">MOVIX</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span>★ {Number(movie.vote_average || 0).toFixed(1)}</span>
        <small>{movie.release_date?.slice(0, 4) || "Release date unavailable"}</small>
      </div>
    </button>
  );
}
