import React from "react";//This imports React so you can write JSX (like <App />).
//ReactDOM is responsible for connecting your React app to the actual browser DOM.react-dom/client is for React 18's new rendering method (createRoot).
import ReactDOM from "react-dom/client";
import App from "./App.jsx";//This imports your main application component.
import "./styles/Home.css";

//connecting react to html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/*showing warnings,detecting problems early,highlighting unsafe lifecycle methods*/}
    <App /> {/*main component*/}
  </React.StrictMode>
);
