import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { json, useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../../context/CryptoContext";
import { Triangle } from "lucide-react";
import Chart from "./Chart";
import { useForm } from "react-hook-form";
import { MonitoredContext } from "../../context/MonitoredContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Indicator = ({ currentPrice, high, low }) => {
  const [greenColor, setGreenColor] = useState();

  useEffect(() => {
    let value = high - low;
    let green = ((high - currentPrice) * 100) / value;
    setGreenColor(Math.ceil(green));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red-600 h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - greenColor}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green-600 h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${greenColor}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

export default function CryptoModal() {
  const createUserFormSchema = z.object({
    price: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().gte(111, "Min 3 character")
    ),
    email: z
      .string()
      .nonempty("This field cannot be empty")
      .email("Please enter a valid email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const { coinId } = useParams();
  const navigate = useNavigate();

  const {
    saveMonitoredCoin,
    monitoredCoins,
    removeMonitored,
    monitoredCoinsValue,
    setUserEmail,
  } = useContext(MonitoredContext);

  const handleClick = (data) => {
    localStorage.setItem("userEmail", data.email);
    saveMonitoredCoin(coinId, data.price);
  };

  const handleClickCancelMonitored = () => removeMonitored(coinId);

  const close = () => {
    navigate("../");
  };

  const { getCoinData, coinData, currency } = useContext(CryptoContext);

  useEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  useEffect(() => {
    console.log("USELAYOUTEFFECT");
    setUserEmail(localStorage.getItem("userEmail"));

    monitoredCoinsValue();
  }, [monitoredCoins]);

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 top-0 w-full h-full bg-zinc-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center text-zinc-50  "
      onClick={close}
    >
      <div
        id="modalArea"
        className="overflow-x-none w-[65%] h-[75%] bg-blue-950/80 bg-opacity-75 rounded-xl text-zinc-50 relative max-2xl:w-5/6 max-xl:overflow-y-auto max-md:w-11/12 max-sm:w-4/5"
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? (
          <div className="flex items-center justify-between h-full w-full p-4 max-xl:flex-col">
            <div className="flex flex-col w-[45%] h-full pr-2 gap-4 max-2xl:w-full">
              <div className="flex w-full items-center justify-center ">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={coinData.image.large}
                  alt={coinData.id}
                />
                <h1 className="text-xl capitalize font-medium">
                  {coinData.name}
                </h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-blue-600 text-blue-500 bg-opacity-25 rounded uppercase">
                  {coinData.symbol}
                </span>
              </div>
              <div className="flex w-full ">
                <div className="flex">
                  <div className="flex flex-col w-full ">
                    <div className="flex">
                      <span className="text-sm capitalize text-zinc-400">
                        Price
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        maximumSignificantDigits: 5,
                      }).format(coinData.market_data.current_price[currency])}
                    </h2>
                  </div>
                  <div
                    className={`text-sm w-20 py-1 px-1 ml-5 mt-4 font-medium flex items-center rounded-lg uppercase bg-opacity-25 max-sm:py-0 
                    ${
                      coinData.market_data.price_change_percentage_24h > 0
                        ? " bg-green-600 text-green-400 dark:text-green-500"
                        : " bg-red-600 text-red-400 dark:text-red-500"
                    }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {Number(
                        coinData.market_data.price_change_percentage_24h
                      ).toFixed(2)}
                      %
                      <Triangle
                        className={`w-3 h-4 
                        ${
                          coinData.market_data.price_change_percentage_24h > 0
                            ? "fill-green-400 dark:fill-green-600"
                            : "fill-red-400 dark:fill-red-600 rotate-180"
                        }
                        `}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between max-sm:flex-col max-sm:gap-4">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    Market Cap
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    fully diluted valuation
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      coinData.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-zinc-400">
                  total volume
                </span>
                <h2 className="text-lg font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(coinData.market_data.total_volume[currency])}
                </h2>
              </div>
              <div className="flex w-full mt-4 justify-between">
                <Indicator
                  currentPrice={coinData.market_data.current_price[currency]}
                  high={coinData.market_data.high_24h[currency]}
                  low={coinData.market_data.low_24h[currency]}
                />
              </div>
              <div className="flex w-full mt-4 justify-between max-[400px]:flex-col max-[400px]:gap-3">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    Low 24H
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinData.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    high 24H
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinData.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex w-full mt-1 justify-between max-[400px]:flex-col max-[400px]:gap-3">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    max suply
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-400">
                    circulating supply
                  </span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex flex-col content-start mt-2">
                  <span className="text-sm capitalize text-zinc-400">
                    sentiment
                  </span>
                  <div>
                    <div className="flex flex-col w-24 ">
                      <div
                        className={`text-sm  px-1 ml-2 font-medium flex flex-col my-1  items-center rounded uppercase bg-opacity-25 bg-green-600 text-green-400 dark:text-green-500
                    }
                    `}
                      >
                        <span className="flex items-center gap-2">
                          {Number(
                            coinData.sentiment_votes_up_percentage
                          ).toFixed(2)}
                          %
                          <Triangle
                            className={`w-3 h-4 fill-green-400 dark:fill-green-600
                        }
                        `}
                          />
                        </span>
                      </div>
                      <div
                        className={`text-sm  px-1 ml-2 font-medium flex flex-col my-1  items-center rounded uppercase bg-opacity-25 
                        bg-red-600 text-red-400 dark:text-red-500
                    }
                    `}
                      >
                        <span className="flex items-center gap-2">
                          {Number(
                            coinData.sentiment_votes_down_percentage
                          ).toFixed(2)}
                          %
                          <Triangle
                            className={`w-3 h-4 
                            fill-red-400 dark:fill-red-600 rotate-180
                        `}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-full pr-3 max-2xl:w-full max-2xl:mt-5 max-[420px]:mr-0 max-[420px]:mt-[9.25rem]">
              <Chart id={coinData.id} />

              <div className="flex flex-col items-end mt-4">
                <div className="text-zinc-50 text-xl py-1 max-sm:mt-10 max-sm:text-lg">
                  <span className="text-zinc-500 capitalize mr-1 ">
                    market cap rank:
                  </span>
                  <span>{coinData.market_cap_rank}</span>
                </div>

                {monitoredCoins &&
                  !monitoredCoins.some((coin) => coin.name == coinId) && (
                    <form
                      onSubmit={handleSubmit(handleClick)}
                      className="mt-16 gap-3 flex flex-col items-center justify-center  w-full max-sm:mb-6"
                    >
                      <div className="text-zinc-50 py-1 text-sm self-end">
                        <span className="text-zinc-500 capitalize mr-1">
                          monitored currencies
                        </span>
                        <span>{monitoredCoins.length}/5</span>
                      </div>
                      <div className="flex justify-center gap-6 w-full text-sm text-zinc-200 max-sm:items-center max-sm:flex-col max-sm:mt-5">
                        <div className="flex flex-col gap-1">
                          <input
                            {...register("price")}
                            placeholder="price"
                            className={`w-24 bg-transparent transition-all duration-300 outline-0 border-2  rounded py-1 px-2
                            ${
                              errors.price
                                ? "border-red-400 border-1"
                                : "border-zinc-600"
                            }
                            `}
                          />
                          {errors.price && (
                            <span className=" text-sm text-red-400 dark:text-red-400 font-bold max-w-28">
                              {errors.price.message}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <input
                            {...register("email")}
                            placeholder="your email"
                            className={`bg-transparent transition-all duration-300 outline-0 border-2 border-zinc-600 rounded focus:border-blue-700 px-2  py-1
                            ${
                              errors.email
                                ? "border-red-400 border-1"
                                : "border-zinc-600"
                            }
                            `}
                          />
                          {errors.email && (
                            <span className=" text-red-400 dark:text-red-400 font-bold w-44">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-3 border-2 bg-blue-800 border-transparent rounded px-6 py-[2px] hover:border-transparent hover:bg-transparent hover:border-blue-800 transition-all duration-300 font-bold outline-none"
                      >
                        save
                      </button>
                    </form>
                  )}

                {monitoredCoins &&
                  monitoredCoins.some((coin) => coin.name == coinId) && (
                    <>
                      <div className="text-zinc-50 py-1 text-end mt-28 text-sm">
                        <span className="text-zinc-500 capitalize mr-1">
                          monitored currencies
                        </span>
                        <span>{monitoredCoins.length}/5</span>
                      </div>
                      <button
                        onClick={handleClickCancelMonitored}
                        className="mt-3 border-2 text-sm capitalize bg-red-800 border-transparent rounded px-3 py-[2px] hover:border-transparent hover:bg-transparent hover:border-red-800 transition-all duration-300 font-bold outline-none"
                      >
                        stop monitored
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full absolute inset-0 bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center ">
            <div
              className="w-8 h-8 border-4 border-blue-600 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="ml-4 font-bold text-zinc-700 dark:text-zinc-300">
              Searching...
            </span>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
}
