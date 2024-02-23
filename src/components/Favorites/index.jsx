import { memo, useContext } from "react";
import { StorageContext } from "../../context/StorageContext";

import FavoriteComponent from "./FavoriteComponent";
function Favorites() {
  const { savedCoins } = useContext(StorageContext);

  return (
    <section
      className=" w-full h-full items-center flex flex-col  mb-24 relative"
      id="favorites"
    >
      <h2
        data-aos="zoom-in"
        data-aos-delay="1000"
        className="text-4xl font-bold max-sm:text-2xl"
      >
        Favorites
      </h2>
      <div
        data-aos="zoom-in"
        data-aos-delay="1200"
        className="w-full overflow-hidden min-h-[60vh]  mt-9 border-2 border-zinc-600 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-transparent "
      >
        {savedCoins.length > 0 ? (
          <table
            data-aos="zoom-in"
            data-aos-delay="400"
            className="table-auto w-full"
          >
            <thead className="capitalize text-base text-zinc-900 dark:text-gray-100 font-medium border-b-2 border-gray-600 dark:border-gray-400">
              <tr className="max-[470px]:text-sm">
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1 max-[370px]:hidden">1H</th>
                <th className="py-1 max-[470px]:hidden">24H</th>
                <th className="py-1 max-[540px]:hidden">7D</th>
                <th className="py-1 max-md:hidden">market cap change</th>
                <th className="py-1 max-lg:hidden">total volume</th>
              </tr>
            </thead>
            <tbody>
              {savedCoins.map((crypto) => (
                <FavoriteComponent key={crypto} data={crypto} />
              ))}
            </tbody>
          </table>
        ) : savedCoins.length == 0 ? (
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="w-full bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center "
          >
            <span className="ml-4 font-bold text-zinc-700 dark:text-zinc-300 text-3xl max-sm:text-xl">
              There are no favorites
            </span>
          </div>
        ) : (
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="w-full bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center "
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
    </section>
  );
}

export default memo(Favorites);
