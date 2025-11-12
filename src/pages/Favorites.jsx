import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1>❤️ Your Favorite Movies</h1>
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No favorite movies yet 😢</p>
      )}
    </div>
  );
}
