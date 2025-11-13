import { useState, useEffect } from "react";
import axios from "axios";//Used to fetch data from The Movie Database (TMDB) API
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

//https://www.themoviedb.org/
const API_KEY = "f678de62c9771141700fffbc1100e253"; 

export default function Home() {
  const [movies, setMovies] = useState([]);//stores the list of movies results from the Api
  const [query, setQuery] = useState("Avengers"); // default search
  const [loading, setLoading] = useState(false); //tells the UI when data is being fetched [loading]
  // Fetch movies whenever query changes
  //inline fetch
  useEffect(() => { //runs after the component first renders
    fetchMovies();//it calls the function to load some initial movies
  }, []); //runs only once on page load

  const fetchMovies = async () => {
    try {
      setLoading(true); //starts a loading spinner
      const response = await axios.get( //sends a GET request and waits for a response
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}` //dynamically includes the movies id
      );
      setMovies(response.data.results); //that data saved here
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();//stops page reload //the form would normally refresh the page --stops that
    fetchMovies();// call API with new query --to fetch new data
  };

  return (
    <div className="home-container">
      <h1>🎬 CineScope</h1>

      <form className="search-bar" onSubmit={handleSearch}>{/*submitting the form triggers which fetches new movies*/}
        {/*This makes your search bar dynamic — React automatically re-renders the page with new results.*/}
        <input
          type="text"
          name="search"
          value={query} //shows watever is stored in the query state
          placeholder="Search for a movie..."
          onChange={(e) => setQuery(e.target.value)}//onchange --updates the query state 
        />
        <button type="submit">Search</button>
      </form>

      {/*This part is called conditional rendering — showing different things depending on state.*/}
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
