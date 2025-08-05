import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import favoriteCryptoStore from "../../../stores/favoriteCryptoStore";
import cryptoStore from "../../../stores/cryptoStore";

export default function FavoriteComponent({ data }) {
  const favoriteCryptoData = favoriteCryptoStore();
  const currency = cryptoStore((state) => state.cryptoParams.currency);

  const handleClick = (id) => {
    if (favoriteCryptoData.favoriteCrypto) {
      if (favoriteCryptoData.favoriteCrypto.includes(id)) {
        favoriteCryptoData.removeFavoriteCrypto(id);
      } else {
        favoriteCryptoData.addFavoriteCrypto(id);
      }
    }
  };

  const navigate = useNavigate();

  const getCoinDetail = (id) => {
    navigate(`/favorites/crypto/${id}`);
  };

  return (
    <tr
      key={data.id}
      className="border-b border-light-300 dark:border-dark-400 hover:bg-light-100/50 dark:hover:bg-dark-400/30 last:border-b-0 text-sm transition-colors duration-150"
    >
      <td className="py-4 px-4 flex items-center">
        <button
          className="outline-none border-0 bg-transparent cursor-pointer mr-2 transition-transform duration-200 hover:scale-110"
          onClick={() => handleClick(data.id)}
        >
          <Star
            className={`w-5 h-5 text-primary-500 ${
              favoriteCryptoData.favoriteCrypto &&
              favoriteCryptoData.favoriteCrypto.includes(data.id)
                ? "fill-primary-500"
                : ""
            }`}
          />
        </button>

        <img
          className="w-6 h-6 mr-2 rounded-full"
          src={data.image}
          alt={data.name}
        />
        <span>
          <div
            onClick={() => getCoinDetail(data.id)}
            className="cursor-pointer font-medium text-dark-100 dark:text-light-100 uppercase"
          >
            {data.symbol}
          </div>
        </span>
      </td>
      <td className="py-4 px-4 text-left">
        <Link 
          onClick={() => getCoinDetail(data.id)} 
          className="cursor-pointer text-dark-200 dark:text-light-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
        >
          {data.name}
        </Link>
      </td>
      <td className="py-4 px-4 text-right font-medium text-dark-200 dark:text-light-200">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: currency,
        }).format(data.current_price)}
      </td>
      <td
        className={
          data.price_change_percentage_1h_in_currency > 0
            ? "text-green-500 font-medium py-4 px-4 text-right max-[370px]:hidden"
            : "text-red-500 font-medium py-4 px-4 text-right max-[370px]:hidden"
        }
      >
        {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
      </td>
      <td
        className={
          data.price_change_percentage_24h_in_currency > 0
            ? "text-green-500 font-medium py-4 px-4 text-right max-[470px]:hidden"
            : "text-red-500 font-medium py-4 px-4 text-right max-[470px]:hidden"
        }
      >
        {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
      </td>
      <td
        className={
          data.price_change_percentage_7d_in_currency > 0
            ? "text-green-500 font-medium py-4 px-4 text-right max-[540px]:hidden"
            : "text-red-500 font-medium py-4 px-4 text-right max-[540px]:hidden"
        }
      >
        {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
      </td>
      <td className="py-4 px-4 text-right font-medium text-dark-200 dark:text-light-200 max-md:hidden">
        {data.market_cap_change_percentage_24h}%
      </td>
      <td className="py-4 px-4 text-right font-medium text-dark-200 dark:text-light-200 max-lg:hidden">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: currency,
        }).format(data.total_volume)}
      </td>
    </tr>
  );
}
