//Here the browserrouter is a wrapper componet that enables routing in your react app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import "./styles/Home.css";

function App() {
  return (
    <Router>
      <Navbar />{/*render the navbar component here*/}
      <Routes>{/*routes is like a container that holds multiple route defitions */}
        <Route path="/" element={<Home />} />
        {/*listens to your browser's url changes and loads the right component without refreshing */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;