import { useContext } from "react"

import TrendingComponent from '../TrendingCoin/TrendingComponent'
import { TrendingContext } from "../../../context/TrendingContext"
import { StorageContext } from "../../../context/StorageContext"
import { CryptoContext } from "../../../context/CryptoContext"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

const SaveBtn = ({data}) =>{
    const {saveCoin, coins, removeCoin} = useContext(StorageContext)
  
    const handleClick = (e) =>{
      e.preventDefault();
      saveCoin(data.id);
  
      if(coins.includes(data.id)){
        removeCoin(data.id)
      }else{
        saveCoin(data.id)
      }
    }
  
    return (
  <button className="outline-0 border-0 bg-none cursor-pointer" onClick={(e) => handleClick(e)}>
                        <Star className={`w-7 h-7 mx-1.5 text-blue-900 ${coins.includes(data.id)? 'fill-blue-900' : ''}`} />
                      </button>
    )
  }
  

export default function Favorites () {

    const {savedCoins} = useContext(StorageContext)
    let {currency} = useContext(CryptoContext)

    return (


        <section className='mt-16 w-full h-full items-center flex flex-col  mb-24 relative' id="favorites" >
                <h2>Favorites</h2>
            <div className='w-full min-h-[60vh] py-8 mt-9 border border-zinc-600 rounded  ' >
                {
                    savedCoins &&  
                        <table className="table-auto w-full">
                        <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
                          <tr>
                            <th className="py-1">asset</th>
                            <th className="py-1">name</th>
                            <th className="py-1">price</th>
                            <th className="py-1">total volume</th>
                            <th className="py-1">market cap change</th>
                            <th className="py-1">1H</th>
                            <th className="py-1">24H</th>
                            <th className="py-1">7D</th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedCoins.map((crypto) => (
                            <tr
                              key={crypto.id}
                              className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                            >
                              <td className="py-4 flex items-center uppercase ">
                                <SaveBtn data={crypto}/>
            
                                <img
                                  className="w-[1.2rem] h-[1.2] mx-1.5"
                                  src={crypto.image}
                                  alt={crypto.name}
                                />
                                <span>
                                  <Link to={`/${crypto.id}`} className="cursor-pointer">
                                    {crypto.symbol}
                                  </Link>
                                </span>
                              </td>
                              <td className="py-4">
                                <Link to={`/${crypto.id}`} className="cursor-pointer">
                                  {crypto.name}
                                </Link>
                              </td>
                              <td className="py-4">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: currency,
                                }).format(crypto.current_price)}
                              </td>
                              <td className="py-4">{crypto.total_volume}</td>
                              <td className="py-4">
                                {crypto.market_cap_change_percentage_24h}%
                              </td>
                              <td
                                className={
                                  crypto.price_change_percentage_1h_in_currency > 0
                                    ? "text-green-400 py-4"
                                    : "text-red-400 py-4"
                                }
                              >
                                {Number(
                                  crypto.price_change_percentage_1h_in_currency
                                ).toFixed(2)}
                              </td>
                              <td
                                className={
                                  crypto.price_change_percentage_24h_in_currency > 0
                                    ? "text-green-400 py-4"
                                    : "text-red-400 py-4"
                                }
                              >
                                {Number(
                                  crypto.price_change_percentage_24h_in_currency
                                ).toFixed(2)}
                              </td>
                              <td
                                className={
                                  crypto.price_change_percentage_7d_in_currency > 0
                                    ? "text-green-400 py-4"
                                    : "text-red-400 py-4"
                                }
                              >
                                {Number(
                                  crypto.price_change_percentage_7d_in_currency
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                        
                }
                
            </div>
        </section>
    )
}