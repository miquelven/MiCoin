import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CryptoModal from "./components/CryptoModal";
import FavoritesPage from "./pages/FavoritesPage";
import TrendingPage from "./pages/TrendingPage";
import { MonitoredProvider } from "./context/MonitoredContext";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import NewsLatterArea from "./components/NewsLatterArea";
import ToTopButton from "./components/ToTopButton";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Aos from "aos";
import Container from "./components/Container";

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

// Configuração otimizada do QueryClient para reduzir chamadas à API
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10, // 10 minutos
      retry: 1, // Reduz o número de tentativas em caso de falha
      retryDelay: 3000, // 3 segundos entre tentativas
      cacheTime: 1000 * 60 * 60, // 1 hora
    },
  },
});

Aos.init();

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
      <MonitoredProvider>
        <div className=" bg-zinc-100 dark:bg-zinc-950 text-slate-900 dark:text-zinc-200">
          <Header />
          <Container>
            <div className="mt-24 flex flex-col relative">
              <RouterProvider router={router} />
            </div>
            <NewsLatterArea />
          </Container>
          <ToTopButton />
          <Footer />
        </div>
        <Outlet />
      </MonitoredProvider>
    </QueryClientProvider>
  </>
);
