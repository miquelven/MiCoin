import { useEffect } from "react";
import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";

export default function TrendingPage() {
  useEffect(() => {
    document.title = "MiCoin - Trending";
  }, []);

  return (
    <>
      <TrendingCoin />
      <Outlet />
    </>
  );
}
