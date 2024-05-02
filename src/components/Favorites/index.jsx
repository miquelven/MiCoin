import { memo, useContext, useEffect, useLayoutEffect } from "react";
import { StorageContext } from "../../context/StorageContext";

import stepFavorite1 from "../../assets/images/stepImg1.png";
import stepFavorite2 from "../../assets/images/stepImg2.png";
import stepFavorite3 from "../../assets/images/stepImg3.png";

import FavoriteComponent from "./FavoriteComponent";
import { MoveUpLeft } from "lucide-react";
function Favorites() {
  const { savedCoins, setSavedCoins, setCoins, getCoinsData, coins } =
    useContext(StorageContext);

  useLayoutEffect(() => {
    const isCoin = JSON.parse(localStorage.getItem("coins")) || [];

    if (isCoin.length > 0) {
      setCoins(isCoin);
    } else {
      localStorage.setItem("coins", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (coins) {
      if (coins.length > 0) {
        getCoinsData(coins);
      } else {
        setSavedCoins([]);
      }
    } else {
      localStorage.setItem("coins", JSON.stringify([]));
    }
  }, [coins]);

  return (
    <section
      className=" w-full h-full items-center flex flex-col  sm:mb-24 relative"
      id="favorites"
    >
      <div>
        <h2
          data-aos="zoom-in"
          data-aos-delay="1000"
          className="text-4xl text-center my-10 font-semibold max-sm:text-2xl"
        >
          Your Favorite assets
        </h2>

        <h3
          data-aos="zoom-in"
          data-aos-delay="1200"
          className="font-semibold text-zinc-600 dark:text-zinc-400 mb-10 text-sm sm:text-base "
        >
          Discover your favorite assets! Here, you can quickly access the assets
          that matter most to you. Stay updated on your favorites and make
          informed decisions to reach your financial goals. Personalize your
          experience and always have your favorite assets at your fingertips.
        </h3>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="1400"
        className="w-full overflow-hidden min-h-[60vh]  mt-9 border-2 border-zinc-300 rounded-2xl shadow-md shadow-zinc-300 dark:shadow-transparent "
      >
        {savedCoins.length > 0 ? (
          <table
            data-aos="zoom-in"
            data-aos-delay="400"
            className="table-auto w-full"
          >
            <thead className="capitalize text-sm text-zinc-900 dark:text-gray-100 font-medium border-b-2 border-zinc-300 dark:border-zinc-700">
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
            <span className="ml-4 font-medium text-zinc-700 dark:text-zinc-300 text-3xl max-sm:text-xl">
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
            <span className="ml-4 font-medium text-zinc-700 dark:text-zinc-300">
              Searching...
            </span>
          </div>
        )}
      </div>
      <div className="mb-10 mt-40">
        <h4 className="relative text-4xl font-semibold max-sm:text-2xl mb-14 text-center">
          Step by step guide to favorite an asset
        </h4>
        <ul className="flex flex-col gap-20 sm:gap-32">
          <li className="relative w-full h-full">
            <p className="mb-5">
              <span className="font-semibold text-lg sm:text-xl">1- </span>
              <span className="text-base sm:text-lg">
                First, you should click on the star icon next to the asset you
                want to favorite.
              </span>
            </p>
            <img
              src={stepFavorite1}
              alt=""
              width={"100%"}
              className="invert-0 dark:invert"
            />
            <MoveUpLeft className="absolute top-[55%] left-[4%] sm:top-[30%]  sm:left-[3%] w-[7%] h-[40%] text-red-600 font-bold" />
          </li>

          <li className="w-full h-full relative">
            <p className="mb-5">
              <span className="font-semibold text-lg sm:text-xl">2- </span>
              <span className="text-base sm:text-lg">
                Second, navigate to the 'Favorites' tab where you can see your
                favorited asset.
              </span>
            </p>
            <img
              src={stepFavorite2}
              alt=""
              width={"100%"}
              className="invert-0 dark:invert"
            />
            <MoveUpLeft className="absolute top-[80%] sm:top-[70%] left-[20%] w-[7%] h-[40%] text-red-600 font-bold" />
          </li>
          <li className="w-full h-full relative">
            <p className="mb-5">
              <span className="font-semibold text-lg sm:text-xl">3- </span>
              <span className="text-base sm:text-lg">
                Third, you can now view your favorite assets.
              </span>
            </p>
            <img
              src={stepFavorite3}
              alt=""
              width={"100%"}
              className="invert-0 dark:invert"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default memo(Favorites);
