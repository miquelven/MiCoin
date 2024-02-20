import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from '../../context/CryptoContext';
import { Triangle } from 'lucide-react';
import Chart from './Chart';
import {MonitoredContext} from '../../context/MonitoredContext'

const Indicator = ({ currentPrice, high, low }) => {
  const [greenColor, setGreenColor] = useState();

  useEffect(() => {
    let value = high - low;
    let green = ((high - currentPrice) * 100) / value;
    setGreenColor(Math.ceil(green));
  }, [currentPrice, high, low]);

  return (
    <>
      <span className="bg-red-600 h-1.5 rounded-l-lg w-[50%]" style={{ width: `${100 - greenColor}%` }}>
        &nbsp;
      </span>
      <span className="bg-green-600 h-1.5 rounded-r-lg w-[50%]" style={{ width: `${greenColor}%` }}>
        &nbsp;
      </span>
    </>
  );
};

export default function CryptoModal() {
  const { coinId } = useParams();
  const navigate = useNavigate();



  const {saveMonitoredCoin, monitoredCoins, removeMonitored} = useContext(MonitoredContext)

  const [inputPrice, setInputPrice] = useState();
  const [inputEmail, setInputEmail] = useState();

  const handleClick = () => {if(inputPrice.trim() !== "" && inputEmail.trim() !== ''){
    localStorage.setItem("userEmail", inputEmail) 
    saveMonitoredCoin(coinId, inputPrice)
  }}

  const handleClickCancelMonitored = () =>removeMonitored(coinId)
      

  const close = () => {
    navigate('../');
  };

  const { getCoinData, coinData, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);


  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-zinc-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center text-zinc-50"
      onClick={close}
    >
      <div
        className="w-[65%] h-[75%] bg-zinc-800 bg-opacity-75 rounded-lg text-zinc-50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? (
          <div className="flex items-center justify-between h-full w-full p-4">
            <div className="flex flex-col w-[45%] h-full pr-2">
              <div className="flex w-full items-center">
                <img className="w-[3rem] h-[3rem] mx-1.5" src={coinData.image.large} alt={coinData.id} />
                <h1 className="text-xl capitalize font-medium">{coinData.name}</h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-blue-600 text-blue-500 bg-opacity-25 rounded uppercase">
                  {coinData.symbol}
                </span>
              </div>
              <div className="flex w-full mt-6">
                <div className="flex flex-col w-full ">
                  <div className="flex justify-between ">
                    <span className="text-sm capitalize text-zinc-500">Price</span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25
                    ${
                      coinData.market_data.price_change_percentage_24h > 0
                        ? 'bg-green-600 text-green-500'
                        : 'bg-red-600 text-red-500'
                    }
                    `}
                    >
                      <span className="flex items-center gap-2">
                        {Number(coinData.market_data.price_change_percentage_24h).toFixed(2)}
                        %
                        <Triangle
                          className={`w-3 h-4 
                        ${
                          coinData.market_data.price_change_percentage_24h > 0
                            ? 'fill-green-600'
                            : 'fill-red-600 rotate-180'
                        }
                        `}
                        />
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(coinData.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">Market Cap</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">fully diluted valuation</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      notation: 'compact',
                    }).format(coinData.market_data.fully_diluted_valuation[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-zinc-500">total volume</span>
                <h2 className="text-lg font-bold">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
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

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">Low 24H</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinData.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">high 24H</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinData.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">max suply</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.max_supply
                      )}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-zinc-500">circulating supply</span>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col content-start mt-5">
                <span className="text-sm capitalize text-zinc-500">sentiment</span>
                <div>
                  <div className="flex flex-col w-24 my-2 ">
                    <div
                      className={`text-sm  px-1 ml-2 font-medium flex flex-col my-2  items-center rounded uppercase bg-opacity-25 bg-green-600 text-green-500
                    }
                    `}
                    >
                      <span className="flex items-center gap-2">
                        {Number(coinData.sentiment_votes_up_percentage).toFixed(2)}
                        %
                        <Triangle
                          className={`w-3 h-4 fill-green-600
                        }
                        `}
                        />
                      </span>
                    </div>
                    <div
                      className={`text-sm  px-1 ml-2 font-medium flex flex-col my-2  items-center rounded uppercase bg-opacity-25 
                        bg-red-600 text-red-500
                    }
                    `}
                    >
                      <span className="flex items-center gap-2">
                        {Number(coinData.sentiment_votes_down_percentage).toFixed(2)}
                        %
                        <Triangle
                          className={`w-3 h-4 
                            fill-red-600 rotate-180
                        `}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-full pr-3">
              <Chart id={coinData.id} />

              <div className='flex flex-col items-end mt-4'>
                <div className='text-zinc-50 text-xl py-1'>
                  <span className='text-zinc-600 capitalize mr-1'>
                    market cap rank: 
                  </span>
                    <span>
                    {coinData.market_cap_rank}
                    </span>
                </div>
                
              {monitoredCoins && !monitoredCoins.some(coin => coin.name == coinId) && 
                    <div className='mt-28 gap-3 flex flex-col items-center justify-center  w-full'>
                    <div className='text-zinc-50 py-1 self-start text-sm'>
                    <span className='text-zinc-600 capitalize mr-1'>
                    monitored currencies
                    </span>
                      <span>
                        {monitoredCoins.length}/5
                      </span>
                    </div>
                      <div className='flex justify-center gap-6 w-full text-sm text-zinc-200'>
                <input type="number" placeholder='price' onChange={(e)=> setInputPrice(e.target.value)} className='w-24 bg-transparent transition-all duration-300 outline-0 border-2 border-zinc-600 rounded focus:border-blue-900 px-2'/>
                <input type='text' placeholder='your email' onChange={(e)=> setInputEmail(e.target.value)} className='bg-transparent transition-all duration-300 outline-0 border-2 border-zinc-600 rounded focus:border-blue-900 px-2  py-1'/>  
                      </div>

                    

                <button onClick={handleClick} className='mt-3 border-2 bg-blue-800 border-transparent rounded px-6 py-[2px] hover:border-transparent hover:bg-transparent hover:border-blue-800 transition-all duration-300 font-bold outline-none'>save</button>

                    </div>
          
              }

              {monitoredCoins && monitoredCoins.some(coin => coin.name == coinId) && 
              <>
              <div className='text-zinc-50 py-1 text-end mt-28 text-sm'>
              <span className='text-zinc-600 capitalize mr-1'>
              monitored currencies
              </span>
                <span>
                  {monitoredCoins.length}/5
                </span>
                
              </div>
              <button onClick={handleClickCancelMonitored} className='mt-3 border-2 text-sm capitalize bg-red-800 border-transparent rounded px-3 py-[2px] hover:border-transparent hover:bg-transparent hover:border-red-800 transition-all duration-300 font-bold outline-none'>stop monitored</button>
              </>
              
              }

              </div>
            </div>
            
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById('model'),
  );
}