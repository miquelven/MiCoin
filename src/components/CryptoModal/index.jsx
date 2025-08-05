import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import useGetCoinData from "../../hooks/useGetCoinData";
import { Triangle, TrendingUp, TrendingDown, X } from "lucide-react";
import Chart from "./Chart";
import cryptoStore from "../../stores/cryptoStore";

const Indicator = ({ currentPrice, high, low }) => {
  const [greenColor, setGreenColor] = useState();

  useEffect(() => {
    let value = high - low;
    let green = ((high - currentPrice) * 100) / value;
    setGreenColor(Math.ceil(green));
  }, [currentPrice, high, low]);

  return (
    <div className="flex w-full h-2 rounded-full overflow-hidden">
      <span
        className="bg-red-500 h-full rounded-l-full"
        style={{ width: `${100 - greenColor}%` }}
      ></span>
      <span
        className="bg-green-500 h-full rounded-r-full"
        style={{ width: `${greenColor}%` }}
      ></span>
    </div>
  );
};

export default function CryptoModal() {
  const { coinId } = useParams();
  const navigate = useNavigate();

  const close = () => {
    navigate("..\/");
  };

  const { data: coinData, isPending: coinDataLoading } = useGetCoinData(coinId);
  const currency = cryptoStore((state) => state.cryptoParams.currency);

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 top-0 w-full h-full bg-dark-100/80 backdrop-blur-md flex items-center justify-center text-light-100"
      onClick={close}
    >
      <div
        id="modalArea"
        className="overflow-x-none w-[65%] h-[75%] bg-light-100 dark:bg-dark-200 rounded-2xl text-dark-100 dark:text-light-100 relative max-2xl:w-5/6 max-xl:overflow-y-auto max-md:w-11/12 max-sm:w-4/5 shadow-xl border border-light-400 dark:border-dark-400"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={close} 
          className="absolute top-4 right-4 p-2 rounded-full bg-light-300 dark:bg-dark-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-dark-300 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>
        {!coinDataLoading && coinData ? (
          <div className="flex items-center justify-between h-full w-full p-8 max-xl:flex-col">
            <div className="flex flex-col w-[45%] h-full pr-2 gap-6 max-2xl:w-full">
              <div className="flex w-full items-center justify-center gap-3">
                <img
                  className="w-12 h-12 rounded-full shadow-md"
                  src={coinData.image.large}
                  alt={coinData.name}
                />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-dark-100 dark:text-light-100">
                    {coinData.name}
                  </h1>
                  <span className="text-sm py-0.5 px-2.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full uppercase font-medium">
                    {coinData.symbol}
                  </span>
                </div>
              </div>
              <div className="flex w-full items-center">
                <div className="flex flex-col w-full">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Preço atual
                  </span>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-dark-100 dark:text-light-100">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        maximumSignificantDigits: 5,
                      }).format(coinData.market_data.current_price[currency])}
                    </h2>
                    <div
                      className={`py-1 px-3 font-medium flex items-center rounded-full text-sm ${coinData.market_data.price_change_percentage_24h > 0
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {coinData.market_data.price_change_percentage_24h > 0 ? (
                          <TrendingUp size={16} className="stroke-current" />
                        ) : (
                          <TrendingDown size={16} className="stroke-current" />
                        )}
                        {Number(
                          coinData.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-between gap-6 max-sm:flex-col max-sm:gap-4">
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Cap. de Mercado
                  </span>
                  <h2 className="text-lg font-bold text-dark-200 dark:text-light-200">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                      notation: "compact",
                      compactDisplay: "short"
                    }).format(coinData.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Avaliação diluída
                  </span>
                  <h2 className="text-lg font-bold text-dark-200 dark:text-light-200">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                      compactDisplay: "short"
                    }).format(
                      coinData.market_data.fully_diluted_valuation[currency] || 0
                    )}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full p-4 bg-light-200 dark:bg-dark-300 rounded-xl">
                <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                  Volume total (24h)
                </span>
                <h2 className="text-lg font-bold text-dark-200 dark:text-light-200">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                    notation: "compact",
                    compactDisplay: "short"
                  }).format(coinData.market_data.total_volume[currency])}
                </h2>
              </div>
              <div className="flex flex-col w-full mt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">Faixa de preço (24h)</span>
                </div>
                <Indicator
                  currentPrice={coinData.market_data.current_price[currency]}
                  high={coinData.market_data.high_24h[currency]}
                  low={coinData.market_data.low_24h[currency]}
                />
              </div>
              <div className="flex w-full justify-between gap-6 max-[400px]:flex-col max-[400px]:gap-3">
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Mínimo (24h)
                  </span>
                  <h2 className="text-lg font-bold text-red-500 dark:text-red-400">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(coinData.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Máximo (24h)
                  </span>
                  <h2 className="text-lg font-bold text-green-500 dark:text-green-400">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(coinData.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex w-full justify-between gap-6 mt-4 max-[400px]:flex-col max-[400px]:gap-3">
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Fornecimento máximo
                  </span>
                  <h2 className="text-lg font-bold text-dark-200 dark:text-light-200">
                    {coinData.market_data.max_supply ? new Intl.NumberFormat("en-IN", {
                      style: "decimal",
                      maximumFractionDigits: 0,
                    }).format(coinData.market_data.max_supply) : "∞"}
                  </h2>
                </div>
                <div className="flex flex-col p-4 bg-light-200 dark:bg-dark-300 rounded-xl flex-1">
                  <span className="text-sm font-medium text-dark-400 dark:text-light-500">
                    Fornecimento circulante
                  </span>
                  <h2 className="text-lg font-bold text-dark-200 dark:text-light-200">
                    {new Intl.NumberFormat("en-IN", {
                      style: "decimal",
                      maximumFractionDigits: 0,
                    }).format(coinData.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>
              <div className="w-full flex flex-col mt-4 p-4 bg-light-200 dark:bg-dark-300 rounded-xl">
                <span className="text-sm font-medium text-dark-400 dark:text-light-500 mb-2">
                  Sentimento do mercado
                </span>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col items-center bg-green-100 dark:bg-green-900/20 rounded-lg p-2 flex-1">
                    <span className="text-xs font-medium text-dark-400 dark:text-light-500 mb-1">Positivo</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-green-500 dark:text-green-400" />
                      <span className="text-base font-bold text-green-600 dark:text-green-400">
                        {Number(coinData.sentiment_votes_up_percentage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center bg-red-100 dark:bg-red-900/20 rounded-lg p-2 flex-1">
                    <span className="text-xs font-medium text-dark-400 dark:text-light-500 mb-1">Negativo</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingDown size={16} className="text-red-500 dark:text-red-400" />
                      <span className="text-base font-bold text-red-600 dark:text-red-400">
                        {Number(coinData.sentiment_votes_down_percentage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-full pr-3 max-2xl:w-full max-2xl:mt-8 max-[420px]:mr-0 max-[420px]:mt-10">
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-dark-200 dark:text-light-200">Gráfico de preço</h3>
                  <div className="flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      Rank #{coinData.market_cap_rank}
                    </span>
                  </div>
                </div>
                <Chart id={coinData.id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full absolute inset-0 bg-light-100 dark:bg-dark-200 min-h-[60vh] flex justify-center items-center">
            <div
              className="w-10 h-10 border-4 border-primary-600 dark:border-primary-400 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="ml-4 font-medium text-dark-300 dark:text-light-400">
              Carregando dados...
            </span>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
}
