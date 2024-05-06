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
    <div className="relative flex">
      <>
        <form className="w-96 relative flex items-center ml-7 max-sm:ml-0 max-sm:w-72 max-[380px]:w-60 z-50">
          <input
            type="text"
            onChange={handleText}
            name="search"
            className="w-full rounded bg-zinc-300 placeholder-text-zinc-200 dark:bg-zinc-900 dark:placeholder:text-zinc-600 pl-2 required outline-0 border-2 border-transparent focus:border-zinc-400 dark:focus:border-blue-400 "
            placeholder="Search"
            value={inputText ? inputSearch : ""}
          />
          <button type="submit" className="absolute right-2 cursor-pointer">
            <Search className="w-7 text-zinc-400" />
          </button>
        </form>

        {inputText.length > 0 && showResults == true ? (
          <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-zinc-200 dark:bg-zinc-800 backdrop-blur-md scrollbar-thin  dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-900 z-[90]">
            {!searchDataLoading && searchData ? (
              searchData.map((data) => {
                return (
                  <li
                    key={data.id}
                    className="flex transition-all duration-500 items-center pl-4 py-2 cursor-pointer hover:dark:bg-zinc-700"
                    onClick={() => selectedCoin(data.id)}
                  >
                    <img src={data.thumb} alt={data.name} />
                    <span className="ml-4 ">{data.name}</span>
                  </li>
                );
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center ">
                <div
                  className="w-8 h-8 border-4 border-blue-600 rounded-full border-b-transparent animate-spin"
                  role="status"
                ></div>
                <span className="ml-2">Searching...</span>
              </div>
            )}
          </ul>
        ) : null}
      </>
    </div>
  );
}
