import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

const API_KEY = "f678de62c9771141700fffbc1100e253"; // replace this

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers"); // default search
  const [loading, setLoading] = useState(false);

  // Fetch movies whenever query changes
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="home-container">
      <h1>🎬 CineScope</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          placeholder="Search for a movie..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
