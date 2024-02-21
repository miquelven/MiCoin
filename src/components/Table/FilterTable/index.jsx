import { useContext, useRef } from "react";
import { CryptoContext } from "../../../context/CryptoContext";
import InputArea from "../InputArea";
import { ArrowRightSquare, RefreshCcw, Triangle } from "lucide-react";
export default function FilterTable() {
  const { setCurrency, setSortby, resetData } = useContext(CryptoContext);

  const inputCurrency = useRef(null);

  const selectedSort = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSortby(value);
  };

  const handleCurrency = (e) => {
    e.preventDefault();
    const value = inputCurrency.current.value;
    setCurrency(value);
    inputCurrency.current.value = "";
  };

  return (
    <div className="w-full h-14 border-2 dark:border border-zinc-400 dark:border-gray-100 rounded-xl flex items-center justify-between relative">
      <InputArea />
      <div className="flex mr-7">
        <form
          className="relative flex items-center mr-12"
          onSubmit={handleCurrency}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2 font-bold text-zinc-700 dark:text-zinc-300"
          >
            Currency:
          </label>
          <input
            type="text"
            ref={inputCurrency}
            placeholder="usd"
            className="w-16 rounded focus:border-zinc-300 bg-zinc-200 placeholder:text-zinc-400 dark:bg-zinc-800 dark:placeholder:text-zinc-400 pl-2 required outline-0 border border-transparent dark:focus:border-blue-400 leading-4"
          />
          <button type="submit" className="ml-1 cursor-pointer ">
            <ArrowRightSquare className="w-full h-auto text-blue-400 hover:text-blue-500 dark:text-blue-600 dark:hover:text-blue-500" />
          </button>
        </form>
        <label className="relative flex justify-center items-center text-zinc-700 dark:text-zinc-300">
          <span className="font-bold mr-2">Sort by:</span>
          <select
            name="sortby"
            className="rounded  bg-zinc-200 dark:bg-zinc-800 text-base pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-0"
            onClick={selectedSort}
          >
            <option value="market_cap_desc">Market cap desc</option>
            <option value="market_cap_asc">Market cap asc</option>
            <option value="volume_desc">Volume desc</option>
            <option value="volume_asc">Volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
          <Triangle className="w-[0.9rem] h-auto absolute right-0.5 top-1.5 pointer-events-none fill-blue-400 text-blue-400  dark:fill-blue-800 rotate-180 dark:text-blue-800" />
        </label>
        <button
          onClick={resetData}
          className="w-[2rem] ml-4 flex justify-center"
        >
          <RefreshCcw className="transition-all  text-zinc-500  hover:text-blue-600 dark:hover:text-blue-600 " />
        </button>
      </div>
    </div>
  );
}
