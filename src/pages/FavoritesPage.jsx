import { Outlet } from "react-router-dom";
import Favorites from "../components/Favorites";
import { useEffect } from "react";

export default function FavoritesPage() {
  useEffect(() => {
    document.title = "MiCoin - Favorites";
  }, []);

  return (
    <>
      <Favorites />
      <Outlet />
    </>
  );
}
