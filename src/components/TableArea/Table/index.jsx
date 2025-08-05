import { memo, useRef } from "react";
import { ArrowRightSquare, Star, RefreshCw } from "lucide-react";
import Pagination from "./Pagination";
import { Link, Outlet } from "react-router-dom";
import useGetCryptoCurrency from "../../../hooks/useGetCryptoCurrency";
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
      className="outline-none border-0 bg-transparent cursor-pointer p-1.5 rounded-full hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
      onClick={(e) => handleClick(e)}
      aria-label={favoriteCryptoData.favoriteCrypto && favoriteCryptoData.favoriteCrypto.includes(data.id) ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`w-5 h-5 text-primary-500 dark:text-primary-400 transition-colors duration-200 ${
          favoriteCryptoData.favoriteCrypto &&
          favoriteCryptoData.favoriteCrypto.includes(data.id)
            ? "fill-primary-500 dark:fill-primary-400"
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
      className="relative flex items-center gap-3 mr-6 max-[490px]:mr-0"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Page"
        className="text-dark-300 dark:text-light-400 font-medium"
      >
        Items per page:
      </label>
      <div className="relative">
        <input
          type="number"
          name="Page"
          min={1}
          max={250}
          ref={inputPage}
          placeholder="10"
          className="w-20 h-10 px-3 rounded-lg bg-white dark:bg-dark-400 placeholder:text-dark-400 dark:placeholder:text-light-500 border border-light-400 dark:border-dark-500 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors duration-200"
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-md hover:bg-light-300 dark:hover:bg-dark-300 transition-colors duration-200"
        >
          <ArrowRightSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </button>
      </div>
    </form>
  );
};

const Table = () => {
  const cryptoStoreData = cryptoStore();

  const { data: cryptoData, isPending: cryptoDataLoading, isError } = useGetCryptoCurrency(
    cryptoStoreData.cryptoParams
  );

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="w-full flex-col"
      >
        {isError ? (
          <div className="w-full min-h-[60vh] flex flex-col justify-center items-center p-8 text-center bg-white dark:bg-dark-300 rounded-xl">
            <div className="text-red-500 text-xl font-bold mb-4">Erro ao carregar dados</div>
            <p className="text-dark-300 dark:text-light-400 mb-8 max-w-md">Ocorreu um problema ao buscar as criptomoedas. Tente novamente mais tarde.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full font-medium transition-all duration-300 shadow-button hover:shadow-button-hover flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
          </div>
        ) : !cryptoDataLoading && cryptoData ? (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-light-400 dark:scrollbar-thumb-dark-500 scrollbar-track-transparent">
            <table className="table-auto w-full">
              <thead className="sticky top-0 capitalize text-sm bg-light-300 dark:bg-dark-400 text-dark-200 dark:text-light-200 font-medium z-10">
                <tr>
                  <th className="py-4 px-4 text-left max-[460px]:text-xs">Ativo</th>
                  <th className="py-4 px-4 text-left max-[460px]:text-xs">Nome</th>
                  <th className="py-4 px-4 text-right max-[460px]:text-xs max-[380px]:hidden">
                    Preço
                  </th>
                  <th className="py-4 px-4 text-right max-[460px]:hidden">1H</th>
                  <th className="py-4 px-4 text-right max-sm:hidden">24H</th>
                  <th className="py-4 px-4 text-right max-md:hidden">7D</th>
                  <th className="py-4 px-4 text-right max-lg:hidden">Variação Cap. Mercado</th>
                  <th className="py-4 px-4 text-right max-lg:hidden">Volume Total</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto) => (
                  <tr
                    key={crypto.id}
                    className="text-dark-100 dark:text-light-100 text-sm border-b border-light-300 dark:border-dark-500 last:border-b-0 hover:bg-light-200 dark:hover:bg-dark-400 transition-colors"
                  >
                    <td className="py-4 px-4 flex items-center uppercase max-[460px]:text-xs">
                      <SaveBtn data={crypto} />

                      <img
                        className="w-6 h-6 mr-2 object-contain"
                        src={crypto.image}
                        alt={crypto.name}
                        loading="lazy"
                      />
                      <span>
                        <Link
                          to={`/crypto/${crypto.id}`}
                          className="cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                        >
                          {crypto.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-left max-[460px]:text-xs">
                      <Link
                        to={`/crypto/${crypto.id}`}
                        className="cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {crypto.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right max-[460px]:text-xs max-[380px]:hidden font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: cryptoStoreData.cryptoParams.currency,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8
                      }).format(crypto.current_price)}
                    </td>
                    <td
                      className={
                        crypto.price_change_percentage_1h_in_currency > 0
                          ? "text-green-600 dark:text-green-400 font-medium py-4 px-4 text-right max-[460px]:hidden"
                          : "text-red-600 dark:text-red-400 font-medium py-4 px-4 text-right max-[460px]:hidden"
                      }
                    >
                      {Number(
                        crypto.price_change_percentage_1h_in_currency
                      ).toFixed(2)}%
                    </td>
                    <td
                      className={
                        crypto.price_change_percentage_24h_in_currency > 0
                          ? "text-green-600 dark:text-green-400 font-medium py-4 px-4 text-right max-sm:hidden"
                          : "text-red-600 dark:text-red-400 font-medium py-4 px-4 text-right max-sm:hidden"
                      }
                    >
                      {Number(
                        crypto.price_change_percentage_24h_in_currency
                      ).toFixed(2)}%
                    </td>
                    <td
                      className={
                        crypto.price_change_percentage_7d_in_currency > 0
                          ? "text-green-600 dark:text-green-400 font-medium py-4 px-4 text-right max-md:hidden"
                          : "text-red-600 dark:text-red-400 font-medium py-4 px-4 text-right max-md:hidden"
                      }
                    >
                      {Number(
                        crypto.price_change_percentage_7d_in_currency
                      ).toFixed(2)}%
                    </td>
                    <td className="py-4 px-4 text-right max-lg:hidden">
                      {crypto.market_cap_change_percentage_24h}%
                    </td>
                    <td className="py-4 px-4 text-right max-lg:hidden font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: cryptoStoreData.cryptoParams.currency,
                        notation: "compact",
                        compactDisplay: "short"
                      }).format(crypto.total_volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full min-h-[60vh] flex flex-col justify-center items-center gap-4 bg-white dark:bg-dark-300 rounded-xl">
            <div
              className="w-10 h-10 border-4 border-primary-600 dark:border-primary-400 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="text-dark-300 dark:text-light-400">
              Carregando dados...
            </span>
          </div>
        )}
      </div>
      {cryptoData && (
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-8 px-4">
          <PageFor />
          <Pagination />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default memo(Table);
