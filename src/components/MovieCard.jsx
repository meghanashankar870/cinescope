import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MovieCard({ movie }) {
    const posterUrl = 
        movie.poster_path && movie.poster_path !== ""
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image"; // fallback image

  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none",color:"inherit"}}>{/*This ensures clicking the card takes you to /movie/{id}.*/}
        <img
          src={posterUrl}
          alt={movie.title || "No Title Available"}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          onError={(e) => {
            // ✅ Fallback in case even the image URL fails
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
          }}
        />
        <h3 style={{ textAlign: "center", marginTop: "10px" }}>
          {movie.title || "Untitled Movie"}
        </h3>
      </Link>
    </motion.div>
  );
}
