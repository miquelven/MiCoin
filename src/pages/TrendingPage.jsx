import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export default function TrendingPage() {
  useTitle("Trending");

  return (
    <main>
      <TrendingCoin />
      <Outlet />
    </main>
  );
}
