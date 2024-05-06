import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Banner from "../components/Banner";
import TableArea from "../components/TableArea";
import FeaturesArea from "../components/FeaturesArea";
import NewsLatterArea from "../components/NewsLatterArea";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Home");

  useEffect(() => {
    const isCoin = localStorage.getItem("coin") || [];
    if (isCoin.length > 0) return;

    localStorage.setItem("coin", JSON.stringify([]));
  }, []);

  return (
    <main>
      <Banner />
      <TableArea />
      <FeaturesArea />
      <NewsLatterArea />
      <Outlet />
    </main>
  );
}

export default Home;
