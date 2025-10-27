import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function Root(){
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--sx", e.clientX + "px");
      document.documentElement.style.setProperty("--sy", e.clientY + "px");
      document.body.classList.add("add-spotlight-move");
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
