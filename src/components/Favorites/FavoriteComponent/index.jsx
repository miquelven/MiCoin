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
      className="text-center text-base border-b-2 border-zinc-400  hover:bg-zinc-200/70 dark:border-gray-600 dark:hover:bg-zinc-800/30 last:border-b-0 max-[470px]:text-sm"
    >
      <td className="py-4 flex items-center uppercase  ">
        <button
          className="outline-0 border-0 bg-none cursor-pointer"
          onClick={() => handleClick(data.id)}
        >
          <Star
            className={`w-7 h-7 mx-1.5 text-blue-900 ${
              favoriteCryptoData.favoriteCrypto &&
              favoriteCryptoData.favoriteCrypto.includes(data.id)
                ? "fill-blue-900"
                : ""
            }`}
          />
        </button>

        <img
          className="w-[1.2rem] h-[1.2] mx-1.5"
          src={data.image}
          alt={data.name}
        />
        <span>
          <div
            onClick={() => getCoinDetail(data.id)}
            className="cursor-pointer"
          >
            {data.symbol}
          </div>
        </span>
      </td>
      <td className="py-4 ">
        <Link onClick={() => getCoinDetail(data.id)} className="cursor-pointer">
          {data.name}
        </Link>
      </td>
      <td className="py-4">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currency,
        }).format(data.current_price)}
      </td>
      <td
        className={
          data.price_change_percentage_1h_in_currency > 0
            ? "text-green-600 font-medium dark:font-normal dark:text-green-400 py-4 max-[370px]:hidden"
            : "text-red-600 font-medium dark:font-normal dark:text-red-400 py-4 max-[370px]:hidden"
        }
      >
        {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
      </td>
      <td
        className={
          data.price_change_percentage_24h_in_currency > 0
            ? "text-green-600 font-medium dark:font-normal dark:text-green-400 py-4 max-[470px]:hidden"
            : "text-red-600 font-medium dark:font-normal dark:text-red-400 py-4 max-[470px]:hidden"
        }
      >
        {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
      </td>
      <td
        className={
          data.price_change_percentage_7d_in_currency > 0
            ? "text-green-600 font-medium dark:font-normal dark:text-green-400 py-4 max-[540px]:hidden"
            : "text-red-600 font-medium dark:font-normal dark:text-red-400 py-4 max-[540px]:hidden"
        }
      >
        {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
      </td>
      <td className="py-4 max-md:hidden">
        {data.market_cap_change_percentage_24h}%
      </td>
      <td className="py-4 max-lg:hidden">{data.total_volume}</td>
    </tr>
  );
}
