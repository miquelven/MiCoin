import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { CryptoProvider } from "./context/CryptoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoProvider>
      <Home />
    </CryptoProvider>
  </React.StrictMode>
);
