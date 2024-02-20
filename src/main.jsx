import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { CryptoProvider } from "./context/CryptoContext";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CryptoModal from './components/CryptoModal'
import Crypto from "./pages/Crypto";
import { StorageProvider } from "./context/StorageContext";
import FavoritesPage from "./pages/FavoritesPage";
import TrendingPage from './pages/TrendingPage'
import { MonitoredProvider } from "./context/MonitoredContext";
import Container from "./components/Container";
import Header from './components/Header'
import { TrendingProvider } from "./context/TrendingContext";

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
      },],
    },
    {
      path: "/favorites",
  element: <FavoritesPage />,
  children: [
    {
      path: '/favorites/:coinId',
      element: <CryptoModal />
    }
  ]
    },
    {
      path: '/trending',
      element: <TrendingPage />,
      children: [
        {
          path: '/trending/:coinId',
          element: <CryptoModal />
        }
      ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
