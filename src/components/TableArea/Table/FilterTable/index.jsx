import { useEffect, useRef, useState } from "react";
import InputArea from "../InputArea";
import { ArrowRightSquare, RefreshCcw, Triangle } from "lucide-react";
import cryptoStore from "../../../../stores/cryptoStore";

export default function FilterTable() {
  const cryptoStoreData = cryptoStore();

  const [sortByValue, setSortByValue] = useState("market_cap_desc");

  useEffect(() => {
    if (cryptoStoreData.cryptoParams.sortBy !== "market_cap_desc")
      setSortByValue(cryptoStoreData.cryptoParams.sortBy);
  }, []);

  const inputCurrency = useRef(null);

  const selectedSort = (e) => {
    e.preventDefault();
    cryptoStoreData.cryptoParams.sortBy = e.target.value;
    cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    setSortByValue(cryptoStoreData.cryptoParams.sortBy);
  };

  const handleCurrency = (e) => {
    e.preventDefault();
    cryptoStoreData.cryptoParams.currency = inputCurrency.current.value;
    cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    inputCurrency.current.value = "";
  };

  const handleResetData = () => {
    cryptoStoreData.cryptoParams.perPage = "usd";
    cryptoStoreData.cryptoParams.perPage = 10;
    cryptoStoreData.cryptoParams.sortBy = "market_cap_desc";
    cryptoStoreData.cryptoParams.coinSelected = "";
    cryptoStoreData.cryptoParams.pageSelected = 1;
    cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    setSortByValue(cryptoStoreData.cryptoParams.sortBy);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="w-full flex flex-wrap items-center justify-between gap-6 relative z-10 max-lg:justify-center max-lg:gap-8"
    >
      <InputArea />
      <div className="flex items-center gap-6 max-lg:gap-4 max-sm:flex-col max-sm:w-full max-sm:gap-6">
        <form
          className="relative flex items-center gap-3 max-sm:w-full max-sm:justify-center"
          onSubmit={handleCurrency}
        >
          <label className="flex items-center gap-2 text-dark-300 dark:text-light-400 font-medium">
            Currency:
            <div className="relative">
              <input
                type="text"
                ref={inputCurrency}
                placeholder={`${cryptoStoreData.cryptoParams.currency}`}
                className="w-20 h-10 px-3 rounded-lg bg-white dark:bg-dark-400 placeholder:text-dark-400 dark:placeholder:text-light-500 border border-light-400 dark:border-dark-500 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors duration-200"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-md hover:bg-light-300 dark:hover:bg-dark-300 transition-colors duration-200"
              >
                <ArrowRightSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </button>
            </div>
          </label>
        </form>
        
        <div className="relative max-sm:w-full max-sm:flex max-sm:justify-center">
          <label className="flex items-center gap-2 text-dark-300 dark:text-light-400 font-medium">
            <span>Sort by:</span>
            <div className="relative">
              <select
                name="sortby"
                className="appearance-none w-44 h-10 px-3 pr-10 rounded-lg bg-white dark:bg-dark-400 border border-light-400 dark:border-dark-500 focus:border-primary-500 dark:focus:border-primary-400 outline-none capitalize transition-colors duration-200"
                onChange={selectedSort}
                value={sortByValue}
              >
                <option value="market_cap_desc">Market cap desc</option>
                <option value="market_cap_asc">Market cap asc</option>
                <option value="volume_desc">Volume desc</option>
                <option value="volume_asc">Volume asc</option>
                <option value="id_desc">ID desc</option>
                <option value="id_asc">ID asc</option>
                <option value="gecko_desc">Gecko desc</option>
                <option value="gecko_asc">Gecko asc</option>
              </select>
              <Triangle className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400 rotate-180" />
            </div>
          </label>
        </div>
        
        <button
          onClick={handleResetData}
          className="p-2 rounded-full bg-light-300 dark:bg-dark-400 hover:bg-light-400 dark:hover:bg-dark-500 transition-colors duration-200 max-sm:self-center"
          aria-label="Reset filters"
        >
          <RefreshCcw className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </button>
      </div>
    </div>
  );
}
