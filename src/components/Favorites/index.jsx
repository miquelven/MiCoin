import { memo, useContext } from "react"
import { StorageContext } from "../../context/StorageContext"

import FavoriteComponent from "./FavoriteComponent"
 function Favorites () {
  console.log("FAVORITESCOMPONENT")
    const {savedCoins} = useContext(StorageContext)
    
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
                          {savedCoins.map((crypto) => <FavoriteComponent data={crypto} />)}
                        </tbody>
                      </table>
                        
                }
                
            </div>
        </section>
    )
}

export default memo(Favorites)