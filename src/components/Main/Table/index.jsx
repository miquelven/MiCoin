import { useContext, useRef } from "react";
import { CryptoContext } from "../../../context/CryptoContext";
import { ArrowRightSquare, Star } from "lucide-react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const PageFor = () => {
  const inputPage = useRef(null);

  const { setPerPage } = useContext(CryptoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPage.current.value < 1 || inputPage.current.value > 250) return;
    setPerPage(inputPage.current.value);
    inputPage.current.value = inputPage.current.value;
  };

  return (
    <form className="relative flex items-center mr-12" onSubmit={handleSubmit}>
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
        className="w-16 rounded bg-zinc-800 placeholder:text-zinc-400 pl-2 required outline-0 border border-transparent focus:border-blue-400 leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer ">
        <ArrowRightSquare className="w-full h-auto text-blue-600 hover:text-blue-500" />
      </button>
    </form>
  );
};

export default function Table() {
  let { cryptoData, currency, per_page } = useContext(CryptoContext);

  return (
    <>
      <div className="flex w-full flex-col mt-10 border border-gray-100 rounded">
        {cryptoData ? (
          <table className="table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1">total volume</th>
                <th className="py-1">market cap change</th>
                <th className="py-1">1H</th>
                <th className="py-1">24H</th>
                <th className="py-1">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                >
                  <td className="py-4 flex items-center uppercase ">
                    <button className="outline-0 border-0 bg-none cursor-pointer">
                      <Star className="w-7 h-7 mx-1.5 " />
                    </button>

                    <img
                      className="w-[1.2rem] h-[1.2] mx-1.5"
                      src={crypto.image}
                      alt={crypto.name}
                    />
                    <span>
                      <Link to={`/${crypto.id}`} className="cursor-pointer">
                        {crypto.symbol}
                      </Link>
                    </span>
                  </td>
                  <td className="py-4">
                    <Link to={`/${crypto.id}`} className="cursor-pointer">
                      {crypto.name}
                    </Link>
                  </td>
                  <td className="py-4">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(crypto.current_price)}
                  </td>
                  <td className="py-4">{crypto.total_volume}</td>
                  <td className="py-4">
                    {crypto.market_cap_change_percentage_24h}%
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "text-green-400 py-4"
                        : "text-red-400 py-4"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_24h_in_currency > 0
                        ? "text-green-400 py-4"
                        : "text-red-400 py-4"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={
                      crypto.price_change_percentage_7d_in_currency > 0
                        ? "text-green-400 py-4"
                        : "text-red-400 py-4"
                    }
                  >
                    {Number(
                      crypto.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      {cryptoData && cryptoData.length >= per_page && (
        <div className="w-full h-[2.5rem] capitalize flex justify-center items-center mt-3">
          <PageFor />
          <Pagination />
        </div>
      )}
    </>
  );
}
