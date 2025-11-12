import { Link } from "react-router-dom"; // For navigation between pages (without page reload)
import { motion } from "framer-motion";// For smooth animation effects
import { useState, useEffect } from "react";

export default function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = savedFavorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      savedFavorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };
  const posterUrl = 
    movie.poster_path && movie.poster_path !== ""
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image"; // fallback image This ensures your UI never breaks — even when API data is incomplete.

  return (
    <motion.div //special div from framer motion
      className="movie-card"
      whileHover={{ scale: 1.05 }}//Slightly enlarges the card when hovered.
      transition={{ duration: 0.3 }}//Smooth animation timing (0.3 seconds).
    >
    <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </div>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none",color:"inherit"}}>{/*This ensures clicking the card takes you to /movie/{id}.*/}
        <img
          src={posterUrl} //the image URL we built earlier.
          alt={movie.title || "No Title Available"} //accessible text if image fails.
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",//ensures proper image cropping.
            borderRadius: "10px",//rounded corners
          }}
          onError={(e) => {
            // ✅ Fallback in case even the image URL fails
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
          }}
        />
        <h3 style={{ textAlign: "center", marginTop: "10px" }}>
          {movie.title || "Untitled Movie"}
        </h3>
      </Link> {/*closes the link*/}
    </motion.div> //closes animation container
  );
}
