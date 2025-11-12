// src/pages/MovieDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "f678de62c9771141700fffbc1100e253"; // same as used in Home.jsx

export default function MovieDetails() {
  const { id } = useParams(); // get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  
  if (loading) return <p className="message">Loading...</p>;

  if (!movie) {
   return <p className="message">Movie details not available 😢</p>;
  }

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
        ⭐ Rating: {movie.vote_average} | 🎬 Released: {movie.release_date}
        </p>
         <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noreferrer"
          className="movie-link"
        >
          View on TMDB
        </a>
      </div>
    </div>
  );
}
    
  

