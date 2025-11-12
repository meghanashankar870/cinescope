// Link is a special React Router component that lets you navigate between pages without reloading the browser.
import { Link } from "react-router-dom";
import {useState} from "react";

export default function Navbar() { //inline defualt navbar means define the function and export it at the same time no need to name it again when we export
  const [hoveredLink, setHoveredLink] = useState(null);

  const linkStyle = {
    color: "#38bdf8",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "color 0.3s ease, transform 0.2s ease",
  };

  const hoverStyle = {
    color: "#e2e8f0", // light blue highlight
    transform: "scale(1.1)", // slightly enlarges the text
  };

    return (
    <nav
      style={{
        backgroundColor: "#1e293b",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",//controls how items are spaced horizontally inside a flex container //space-between->First item left, last item right, equal space in between means distributes items evenly
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#38bdf8", margin: 0 }}>🎬 CineScope</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={hoveredLink === "home" ? { ...linkStyle, ...hoverStyle } : linkStyle}
          onMouseEnter={() => setHoveredLink("home")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          🏠 Home
        </Link>

        <Link
          to="/favorites"
          style={hoveredLink === "favorites" ? { ...linkStyle, ...hoverStyle } : linkStyle}
          onMouseEnter={() => setHoveredLink("favorites")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
}