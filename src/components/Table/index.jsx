import { memo, useContext, useEffect, useRef } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import { StorageContext } from "../../context/StorageContext";
import { ArrowRightSquare, Star } from "lucide-react";
import Pagination from "./Pagination";
import { Link, Outlet } from "react-router-dom";

const SaveBtn = ({ data }) => {
  const { saveCoin, coins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    saveCoin(data.id);
    if (coins) {
      if (coins.includes(data.id)) {
        removeCoin(data.id);
      } else {
        saveCoin(data.id);
      }
    }
  };

  return (
    <button
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      <Star
        className={`w-7 h-7 mx-1.5 text-blue-400 dark:text-blue-900 ${
          localStorage.getItem("coins").includes(data.id)
            ? "fill-blue-400 dark:fill-blue-900"
            : ""
        }`}
      />
    </button>
  );
};

const PageFor = () => {
  const inputPage = useRef(null);

  const { setPerPage, getCryptoData, per_page } = useContext(CryptoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPage.current.value < 1 || inputPage.current.value > 250) return;
    setPerPage(inputPage.current.value);
    inputPage.current.value = inputPage.current.value;
  };

  useEffect(() => {
    getCryptoData();
  }, [per_page]);

  return (
    <form
      className="relative flex items-center mr-12 max-[490px]:mr-0 "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Page"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        page:
      </label>
      <input
        type="number"
        name="Page"
        min={1}
        max={250}
        ref={inputPage}
        placeholder="10"
        className="w-16 rounded bg-zinc-300 placeholder:text-zinc-400 focus:border-zinc-400 dark:bg-zinc-800 dark:placeholder:text-zinc-400 pl-2 required outline-0 border border-transparent dark:focus:border-blue-400 leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer ">
        <ArrowRightSquare className="w-full h-auto text-blue-400 hover:text-blue-500 dark:text-blue-600 dark:hover:text-blue-500" />
      </button>
    </form>
  );
};

const Table = () => {
  let { cryptoData, currency, per_page } = useContext(CryptoContext);

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="flex  min-h-[656px] w-full flex-col mt-10 border-2 border-zinc-400 dark:border-gray-100 rounded-2xl overflow-hidden shadow-lg shadow-zinc-300 dark:shadow-transparent "
      >
        {cryptoData ? (
          <table className="table-auto">
            <thead className="capitalize text-base bg-zinc-300/90 dark:bg-transparent text-zinc-800 dark:text-gray-100 font-medium border-b-2 dark:border-b border-zinc-400 dark:border-gray-100">
              <tr>
                <th className="py-1 max-[460px]:text-sm">asset</th>
                <th className="py-1 max-[460px]:text-sm">name</th>
                <th className="py-1 max-[460px]:text-sm max-[380px]:hidden">
                  price
                </th>
                <th className="py-1 max-[460px]:hidden ">1H</th>
                <th className="py-1 max-sm:hidden">24H</th>
                <th className="py-1 max-md:hidden">7D</th>
                <th className="py-1 max-lg:hidden">market cap change</th>
                <th className="py-1 max-lg:hidden">total volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="text-center text-zinc-950 dark:text-zinc-200 text-base border-b-2 dark:border-b border-zinc-400 last:border-b-0 dark:last:border-transparent hover:bg-zinc-200/70 dark:border-gray-100 dark:hover:bg-zinc-800/30 "
                >
                  <td className="py-4 pl-3  flex items-center uppercase max-[460px]:text-sm">
                    <SaveBtn data={crypto} />

                    <img
                      className="w-[1.2rem] h-[1.2] mx-1.5"
                      src={crypto.image}
                      alt={crypto.name}
                    />
                    <span>
                      <Link
                        to={`/crypto/${crypto.id}`}
                        className="cursor-pointer"
                      >
                        {crypto.symbol}
                      </Link>
                    </span>
                  </td>
                  <td className="py-4 max-[460px]:text-sm">
                    <Link
                      to={`/crypto/${crypto.id}`}
                      className="cursor-pointer"
                    >
                      {crypto.name}
                    </Link>
                  </td>
                  <td className="py-4 max-[460px]:text-sm max-[380px]:hidden">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(crypto.current_price)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-bold py-4 max-sm:px-2 max-[460px]:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-bold py-4 max-sm:px-2 max-[460px]:hidden"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_24h_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-bold py-4 max-md:px-2 max-sm:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-bold py-4 max-md:px-2 max-sm:hidden"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_7d_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-bold py-4 max-md:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-bold py-4 max-md:hidden"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                  </td>
                  <td className="py-4 max-lg:hidden">
                    {crypto.market_cap_change_percentage_24h}%
                  </td>
                  <td className="py-4 max-lg:hidden">{crypto.total_volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full absolute inset-0 bg-zinc-300 dark:bg-transparent  min-h-[60vh] flex justify-center items-center ">
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
      {cryptoData && (
        <div className="w-full h-[2.5rem] capitalize flex justify-center items-center mt-7">
          <PageFor />
          <Pagination />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default memo(Table);
