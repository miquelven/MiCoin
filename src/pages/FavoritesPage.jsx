import { Outlet } from "react-router-dom";
import Favorites from "../components/Favorites";

export default function FavoritesPage() {
  return (
    <>
      <Favorites />
      <Outlet />
    </>
  );
}
