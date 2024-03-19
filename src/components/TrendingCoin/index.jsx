import { useContext, useEffect, useState } from "react";

import TrendingComponent from "./TrendingComponent";
import ToUp from "../ToUp";
import { TrendingContext } from "../../context/TrendingContext";

export default function TrendingCoin() {
  document.addEventListener("scroll", () => {
    window.scrollY >= 500 ? setShowArrow(true) : setShowArrow(false);
  });

  const { trendingData, getTrendingData } = useContext(TrendingContext);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <section
      className=" w-full h-full items-center flex flex-col  mb-24 relative"
      id="trending"
    >
      <h3
        data-aos="zoom-in"
        data-aos-delay="1200"
        className="text-4xl my-10 font-semibold max-[520px]:text-3xl"
      >
        Trending
      </h3>
      <div
        data-aos="zoom-in"
        data-aos-delay="1500"
        className="w-full overflow-hidden min-h-[60vh] relative py-8 grid grid-cols-2  mt-9 border-2  dark:border-zinc-700 border-zinc-400 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-transparent max-md:grid-cols-1 "
      >
        {trendingData ? (
          trendingData.map((trending) => (
            <TrendingComponent key={trending.item.id} data={trending.item} />
          ))
        ) : (
          <div
            data-aos="zoom-in"
            data-aos-delay="1500"
            className="w-full absolute inset-0 bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center "
          >
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
