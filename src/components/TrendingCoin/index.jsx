import { useContext, useState } from "react";

import TrendingComponent from "./TrendingComponent";
import ToUp from "../ToUp";
import { TrendingContext } from "../../context/TrendingContext";

export default function TrendingCoin() {
  document.addEventListener("scroll", () => {
    window.scrollY >= 500 ? setShowArrow(true) : setShowArrow(false);
  });

  const { trendingData } = useContext(TrendingContext);
  const [showArrow, setShowArrow] = useState(false);

  return (
    <section
      className=" w-full h-full items-center flex flex-col  mb-24 relative"
      id="trending"
    >
      <h2 className="text-4xl font-bold max-[520px]:text-3xl">Trending</h2>
      <div className="w-full overflow-hidden min-h-[60vh] relative py-8 grid grid-cols-2  mt-9 border-2  dark:border-gray-100 border-zinc-400 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-transparent max-md:grid-cols-1 ">
        {trendingData ? (
          trendingData.map((trending) => (
            <TrendingComponent key={trending.item.id} data={trending.item} />
          ))
        ) : (
          <div className="w-full absolute inset-0 bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center ">
            <div
              className="w-8 h-8 border-4 border-blue-600 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="ml-4 font-bold text-zinc-700 dark:text-zinc-300">
              Searching...
            </span>
          </div>
        )}
      </div>
      {trendingData && <ToUp show={showArrow} />}
    </section>
  );
}
