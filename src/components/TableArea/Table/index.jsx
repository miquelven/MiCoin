import { memo, useRef } from "react";
import { ArrowRightSquare, Star } from "lucide-react";
import Pagination from "./Pagination";
import { Link, Outlet } from "react-router-dom";
import useTest from "../../../hooks/useGetCryptoCurrency";
import cryptoStore from "../../../stores/cryptoStore";
import favoriteCryptoStore from "../../../stores/favoriteCryptoStore";

const SaveBtn = ({ data }) => {
  const favoriteCryptoData = favoriteCryptoStore();

  const handleClick = (e) => {
    e.preventDefault();

    if (favoriteCryptoData.favoriteCrypto) {
      if (favoriteCryptoData.favoriteCrypto.includes(data.id)) {
        favoriteCryptoData.removeFavoriteCrypto(data.id);
      } else {
        favoriteCryptoData.addFavoriteCrypto(data.id);
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
          favoriteCryptoData.favoriteCrypto &&
          favoriteCryptoData.favoriteCrypto.includes(data.id)
            ? "fill-blue-400 dark:fill-blue-900"
            : ""
        }`}
      />
    </button>
  );
};

const PageFor = () => {
  const inputPage = useRef(null);

  const cryptoStoreData = cryptoStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPage.current.value < 1 || inputPage.current.value > 250) return;
    cryptoStoreData.cryptoParams.perPage = inputPage.current.value;
    cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
  };

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
  const cryptoStoreData = cryptoStore();

  const { data: cryptoData, isPending: cryptoDataLoading } = useTest(
    cryptoStoreData.cryptoParams
  );

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="flex  min-h-[656px] w-full flex-col mt-10 border-2  border-zinc-300 dark:border-zinc-700 rounded-2xl overflow-hidden  "
      >
        {!cryptoDataLoading && cryptoData ? (
          <table className="table-auto">
            <thead className="capitalize text-base bg-zinc-300/90 dark:bg-transparent text-zinc-800 dark:text-gray-100 font-medium border-b-2 dark:border-b border-zinc-300 dark:border-zinc-700">
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
                  className="text-center text-zinc-950 dark:text-zinc-200 text-base border-b-2 dark:border-b border-zinc-300 last:border-b-0 dark:last:border-transparent hover:bg-zinc-200/70 dark:border-zinc-700 dark:hover:bg-zinc-800/30 "
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
                      currency: cryptoStoreData.cryptoParams.currency,
                    }).format(crypto.current_price)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-medium py-4 max-sm:px-2 max-[460px]:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-medium py-4 max-sm:px-2 max-[460px]:hidden"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_24h_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-medium py-4 max-md:px-2 max-sm:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-medium py-4 max-md:px-2 max-sm:hidden"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_7d_in_currency > 0
                        ? "dark:text-green-400 dark:font-normal text-green-600 font-medium py-4 max-md:hidden"
                        : "dark:text-red-400 dark:font-normal text-red-600 font-medium py-4 max-md:hidden"
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
        <div className="w-full h-[2.5rem] capitalize flex flex-col mt-14 md:flex-row justify-center items-center md:mt-7">
          <PageFor />
          <Pagination />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default memo(Table);
