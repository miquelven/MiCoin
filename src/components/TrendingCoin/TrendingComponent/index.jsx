import { useNavigate } from "react-router-dom";

export default function TrendingComponent({ data }) {
  const navigate = useNavigate();

  const getCoinDetail = (id) => {
    navigate(`/trending/crypto/${id}`);
  };

  return (
    <div
      className="w-[80%] flex flex-col items-center mx-auto gap-3 shadow-lg shadow-zinc-200 dark:shadow-transparent justify-center bg-zinc-300 dark:bg-zinc-900 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-zinc-500 hover:dark:bg-zinc-800 hover:bg-opacity-40"
      onClick={() => getCoinDetail(data.id)}
    >
      {data ? (
        <>
          <div className="text-xl flex items-center  max-[420px]:text-lg  mt-0.5 mb-2.5">
            <h3 className="text-zinc-800 font-bold dark:font-normal dark:text-zinc-600 capitalize ">
              name:&nbsp;
            </h3>
            <span className="text-blue-500 font-bold dark:font-normal dark:text-blue-400 ">
              {data.name}
            </span>
            <img
              src={data.small}
              alt={data.name}
              className="w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full"
            />
          </div>
          <div className="text-base flex items-center  max-[420px]:text-sm my-0.5">
            <span className="text-zinc-600 font-bold dark:font-normal dark:text-zinc-600 capitalize ">
              score:&nbsp;
            </span>
            <span className="text-blue-500 font-bold dark:font-normal dark:text-blue-400 ">
              {data.score}
            </span>
          </div>
          <div className="text-base flex items-center  max-[420px]:text-sm  my-0.5">
            <span className="text-zinc-600 font-bold dark:font-normal dark:text-zinc-600 capitalize ">
              price (in btc):&nbsp;
            </span>
            <span className="text-blue-500 font-bold dark:font-normal dark:text-blue-400 ">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </div>
          <div className="text-base flex items-center  max-[420px]:text-sm  my-0.5">
            <span className="text-zinc-600 font-bold dark:font-normal dark:text-zinc-600 capitalize ">
              market cap rank:&nbsp;
            </span>
            <span className="text-blue-500 font-bold dark:font-normal dark:text-blue-400 ">
              {data.market_cap_rank}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
