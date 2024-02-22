import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { CryptoProvider } from "./context/CryptoContext";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CryptoModal from "./components/CryptoModal";
import Crypto from "./pages/Crypto";
import { StorageProvider } from "./context/StorageContext";
import FavoritesPage from "./pages/FavoritesPage";
import TrendingPage from "./pages/TrendingPage";
import { MonitoredProvider } from "./context/MonitoredContext";
import Container from "./components/Container";
import Header from "./components/Header";
import { TrendingProvider } from "./context/TrendingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";

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
  {
    path: "/favorites",
    element: <FavoritesPage />,
    children: [
      {
        path: "/favorites/:coinId",
        element: <CryptoModal />,
      },
    ],
  },
  {
    path: "/trending",
    element: <TrendingPage />,
    children: [
      {
        path: "/trending/:coinId",
        element: <CryptoModal />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const contextClass = {
  error: "bg-red-600",
  dark: "bg-white-600 font-gray-300",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      transition="Zoom"
      limit={2}
      stacked
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick
      draggable
    />
    <CryptoProvider>
      <StorageProvider>
        <MonitoredProvider>
          <TrendingProvider>
            <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-zinc-200">
              <Header />
              <Container>
                <main className="mt-20 flex flex-col gap-32">
                  <RouterProvider router={router} />
                </main>
              </Container>
              {/* <Footer /> */}
            </div>
            <Outlet />
          </TrendingProvider>
        </MonitoredProvider>
      </StorageProvider>
    </CryptoProvider>
  </React.StrictMode>
);
