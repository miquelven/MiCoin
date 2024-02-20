import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { CryptoContext } from "../../../context/CryptoContext";
import debounce from "lodash.debounce";

const Input = ({ handleSearch }) => {
  const [inputText, setInputText] = useState("");
  const { searchData, setCoinSelected, setSearchData } =
    useContext(CryptoContext);

  let handleText = (e) => {
    const value = e.target.value;
    setInputText(value);
    handleSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputText);
  };

  const selectedCoin = (coin) => {
    setCoinSelected(coin);
    setSearchData();
    setInputText("");
  };

  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={handleText}
          name="search"
          className="w-full rounded bg-zinc-900 placeholder:text-zinc-600 pl-2 required outline-0 border-2 border-transparent focus:border-blue-400"
          placeholder="search"
        />
        <button type="submit" className="absolute right-2 cursor-pointer">
          <Search className="w-7" />
        </button>
      </form>

      {inputText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-zinc-800 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {searchData ? (
            searchData.map((data) => {
              return (
                <li
                  key={data.id}
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  onClick={() => selectedCoin(data.id)}
                >
                  <img src={data.thumb} alt={data.name} />
                  <span>{data.name}</span>
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
  );
};

export default function InputArea() {
  const { getSearch } = useContext(CryptoContext);

  const DebouncedSearch = debounce(function (value) {
    getSearch(value);
  }, 2000);

  return (
    <div className="relative flex ">
      <Input handleSearch={DebouncedSearch} />
    </div>
  );
}
