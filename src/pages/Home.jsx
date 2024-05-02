import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Banner from "../components/Banner";
import TableArea from "../components/TableArea";
import FeaturesArea from "../components/FeaturesArea";

function Home() {
  useEffect(() => {
    const isCoin = localStorage.getItem("coin") || [];
    if (isCoin.length > 0) return;

    localStorage.setItem("coin", JSON.stringify([]));
  }, []);

  return (
    <>
      <Banner />
      <TableArea />
      <FeaturesArea />
      <Outlet />
    </>
  );
}

export default Home;
