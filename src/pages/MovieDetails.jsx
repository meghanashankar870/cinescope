// src/pages/MovieDetails.jsx

import { useParams } from "react-router-dom"; //From React Router, used to get the movie ID from the URL. Example → /movie/12345 gives you { id: 12345 }.
import { useEffect, useState } from "react";  //useEffect-React hook — lets you run side effects (like fetching data) when the component loads.and useState-React hook — lets you store data (like movie info and loading state) inside the component.
import axios from "axios";//A library for making HTTP requests — easier and cleaner than fetch().

const API_KEY = "f678de62c9771141700fffbc1100e253"; // same as used in Home.jsx

export default function MovieDetails() {//Component Declaration
  const { id } = useParams(); // get movie ID from URL
  const [movie, setMovie] = useState(null);//holds the movie data which is fetched
  const [loading, setLoading] = useState(true);//to show loading message

  useEffect(() => { //Runs automatically when the component first loads.
    const fetchMovie = async () => { //Async function that fetches data from TMDB’s movie API.
      try {
        const response = await axios.get( //sends the request and waits for a response.
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}` //URL dynamically includes the movie’s ID
        );
        setMovie(response.data); //contains all details about the movie
      } catch (error) { //If the API call fails (e.g., bad ID or no internet), it’s caught in the catch block
        console.error("Error fetching movie details:", error);
      }finally { //Runs after both success or failure.
        setLoading(false); //Turns off the loading spinner by setting loading to false.
      }
    };

    fetchMovie();
  }, [id]);
  
  if (loading) return <p className="message">Loading...</p>;
  //If the data hasn’t arrived yet, show a “Loading…” message instead of a blank page.

  if (!movie) {
   return <p className="message">Movie details not available 😢</p>;
  }

  return (
    <div className="movie-details"> {/*wraps all content for styling*/}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h2>{movie.title}</h2> {/*displays the movies title and description*/}
        <p>{movie.overview}</p>
        <p>
        ⭐ Rating: {movie.vote_average} | 🎬 Released: {movie.release_date}
        </p>
         <a
          //external link where it takes the user to the official TMDB page in a new tab
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          //Protects your app from exposing referrer data or being manipulated by the opened tab.
          rel="noreferrer" //prevents the referrer information when opening the link
          //we can also use -->rel="noopener noreferrer =>where its the standard security pattern for all external links in react apps"
          className="movie-link"
        >
          View on TMDB
        </a>
      </div>
    </div>
  );
}
    
  

