import { useNavigate } from "react-router-dom";

export default function TrendingComponent({ data }) {
  const navigate = useNavigate();

  const getCoinDetail = (id) => {
    navigate(`/trending/crypto/${id}`);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="flex flex-col items-center gap-4 bg-light-100 dark:bg-dark-400 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative hover:bg-light-300 dark:hover:bg-dark-500"
      onClick={() => getCoinDetail(data.id)}
    >
      {data ? (
        <>
          <div className="w-16 h-16 mb-2">
            <img
              src={data.small}
              alt={data.name}
              className="w-full h-full object-contain rounded-full bg-light-300 dark:bg-dark-500 p-1"
            />
          </div>
          
          <h3 className="text-xl font-bold text-dark-100 dark:text-light-100 mb-1">
            {data.name}
          </h3>
          
          <div className="text-sm text-dark-300 dark:text-light-400 mb-4">
            <span className="uppercase font-medium">{data.symbol}</span>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 text-sm">
            <div className="bg-light-200 dark:bg-dark-500 p-3 rounded-lg">
              <div className="text-dark-400 dark:text-light-500 mb-1">Score</div>
              <div className="font-medium text-dark-200 dark:text-light-200">{data.score + 1}</div>
            </div>
            
            <div className="bg-light-200 dark:bg-dark-500 p-3 rounded-lg">
              <div className="text-dark-400 dark:text-light-500 mb-1">Rank</div>
              <div className="font-medium text-dark-200 dark:text-light-200">#{data.market_cap_rank}</div>
            </div>
          </div>
          
          <div className="w-full bg-light-200 dark:bg-dark-500 p-3 rounded-lg mt-2">
            <div className="text-dark-400 dark:text-light-500 mb-1">Preço (BTC)</div>
            <div className="font-medium text-dark-200 dark:text-light-200">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BTC",
                maximumSignificantDigits: 8,
              }).format(data.price_btc)}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
