import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { CryptoProvider } from "./context/CryptoContext";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CryptoModal from "./components/CryptoModal";
import { StorageProvider } from "./context/StorageContext";
import FavoritesPage from "./pages/FavoritesPage";
import TrendingPage from "./pages/TrendingPage";
import { MonitoredProvider } from "./context/MonitoredContext";
import Container from "./components/Container";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ToTopButton from "./components/ToTopButton";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

    children: [
      {
        path: "/crypto/:coinId",
        element: <CryptoModal />,
      },
    ],
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
    children: [
      {
        path: "/favorites/crypto/:coinId",
        element: <CryptoModal />,
      },
    ],
  },
  {
    path: "/trending",
    element: <TrendingPage />,
    children: [
      {
        path: "/trending/crypto/:coinId",
        element: <CryptoModal />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const contextClass = {
  error: "bg-red-600",
  dark: "bg-white-600 font-gray-300",
  success: "bg-green-600",
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      transition="Zoom"
      limit={1}
      stacked
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      autoClose={500}
      hideProgressBar={true}
      closeOnClick
      draggable
    />
    <QueryClientProvider client={client}>
      <CryptoProvider>
        <StorageProvider>
          <MonitoredProvider>
            <div className=" bg-zinc-100 dark:bg-zinc-950 text-slate-900 dark:text-zinc-200">
              <Header />
              <Container>
                <main className="mt-24 min-h-[calc(100vh-66px)] flex flex-col relative">
                  <RouterProvider router={router} />
                </main>
              </Container>
              <ToTopButton />
              <Footer />
            </div>
            <Outlet />
          </MonitoredProvider>
        </StorageProvider>
      </CryptoProvider>
    </QueryClientProvider>
  </>
);
