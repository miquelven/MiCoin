import { Search } from "lucide-react";
import { useState } from "react";
import useGetSearch from "../../../../hooks/useGetSearchItens";
import { useDebounce } from "@uidotdev/usehooks";
import cryptoStore from "../../../../stores/cryptoStore";

export default function InputArea() {
  const [inputText, setInputText] = useState("");

  const cryptoStoreData = cryptoStore();

  const [showResults, setShowResults] = useState(false);

  window.addEventListener("click", () => setShowResults(false));

  const handleText = (e) => {
    setShowResults(true);
    setInputText(e.target.value);
  };

  const selectedCoin = (coin) => {
    cryptoStoreData.cryptoParams.coinSelected = coin;
    cryptoStoreData.cryptoParams.pageSelected = 1;

    cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    setInputText("");
  };

  const [inputSearch] = useDebounce([inputText], 2000);
  const { data: searchData, isPending: searchDataLoading } =
    useGetSearch(inputSearch);

  return (
    <div className="relative">
      <form className="relative w-full max-w-md max-sm:max-w-xs">
        <div className="relative">
          <input
            type="text"
            onChange={handleText}
            name="search"
            className="w-full h-10 pl-4 pr-12 rounded-lg bg-white dark:bg-dark-400 placeholder:text-dark-400 dark:placeholder:text-light-500 border border-light-400 dark:border-dark-500 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors duration-200"
            placeholder="Search cryptocurrency..."
            value={inputText ? inputSearch : ""}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-md hover:bg-light-300 dark:hover:bg-dark-300 transition-colors duration-200"
          >
            <Search className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </button>
        </div>

        {inputText.length > 0 && showResults === true && (
          <ul className="absolute top-12 left-0 right-0 max-h-80 overflow-y-auto rounded-lg shadow-card bg-white dark:bg-dark-400 backdrop-blur-md scrollbar-thin scrollbar-thumb-light-400 scrollbar-track-light-200 dark:scrollbar-thumb-dark-300 dark:scrollbar-track-dark-500 z-50">
            {!searchDataLoading && searchData ? (
              searchData.length > 0 ? (
                searchData.map((data) => (
                  <li
                    key={data.id}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-light-200 dark:hover:bg-dark-300 transition-colors duration-200 border-b border-light-300 dark:border-dark-500 last:border-0"
                    onClick={() => selectedCoin(data.id)}
                  >
                    <img 
                      src={data.thumb} 
                      alt={data.name} 
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-dark-100 dark:text-light-100">{data.name}</span>
                      <span className="text-xs text-dark-400 dark:text-light-500 uppercase">{data.symbol}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-center text-dark-300 dark:text-light-400">
                  No results found
                </li>
              )
            ) : (
              <div className="w-full py-8 flex flex-col justify-center items-center gap-2">
                <div
                  className="w-6 h-6 border-3 border-primary-600 dark:border-primary-400 rounded-full border-b-transparent animate-spin"
                  role="status"
                ></div>
                <span className="text-dark-300 dark:text-light-400">Searching...</span>
              </div>
            )}
          </ul>
        )}
      </form>
    </div>
  );
}
