import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { CryptoProvider } from "./context/CryptoContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CryptoModal from "./components/Main/CryptoModal";
import Crypto from "./pages/Crypto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoModal />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoProvider>
      <RouterProvider router={router} />
    </CryptoProvider>
  </React.StrictMode>
);
