import { Outlet } from "react-router-dom";
import Favorites from "../components/Favorites";
import useTitle from "../hooks/useTitle";

export default function FavoritesPage() {
  useTitle("Favorites");

  return (
    <main>
      <Favorites />
      <Outlet />
    </main>
  );
}
