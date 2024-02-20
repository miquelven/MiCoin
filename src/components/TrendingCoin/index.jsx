import { useContext } from "react"

import TrendingComponent from "./TrendingComponent"
import { TrendingContext } from "../../context/TrendingContext"

export default function TrendingCoin () {
    console.log('TRENDINGCOIN')

    const {trendingData} = useContext(TrendingContext)

    return (


        <section className='mt-16 w-full h-full items-center flex flex-col  mb-24 relative' id="trending" >
                <h2>Trending</h2>
            <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-9 border border-zinc-600 rounded  ' >
                {
                    trendingData && trendingData.map(trending => <TrendingComponent key={trending.item.id} data={trending.item} />)
                }
                
            </div>
        </section>
    )
}