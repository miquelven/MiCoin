import { useNavigate } from "react-router-dom"

export default function TrendingComponent ({data}) {

    const navigate = useNavigate();

    const getCoinDetail = (id) =>{
        navigate(id)
    }


    return (
        <div className="w-[40%] bg-zinc-900 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-zinc-400 hover:bg-opacity-40"
        onClick={()=>getCoinDetail(data.id)}
        >
            {data ? 

                <>
                <h3 className="text-base flex items-center my-0.5">
                    <span className="text-zinc-600 capitalize ">name:&nbsp;</span>
                    <span className="text-blue-400 ">
                        {data.name}
                    </span>
                    <img src={data.small} alt={data.name} className="w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full"/>
                </h3> 
                <h3 className="text-base flex items-center my-0.5">
                    <span className="text-zinc-600 capitalize ">market cap rank:&nbsp;</span>
                    <span className="text-blue-400 ">
                        {data.market_cap_rank}
                    </span>
                </h3> 
                <h3 className="text-base flex items-center my-0.5">
                    <span className="text-zinc-600 capitalize ">price (in btc):&nbsp;</span>
                    <span className="text-blue-400 ">
                        {
                            new Intl.NumberFormat('en-IN', {
                                style: "currency",
                                currency: 'btc',
                                maximumSignificantDigits: 5,
                            }).format(data.price_btc)
                        }
                    </span>
                </h3> 
                <h3 className="text-base flex items-center my-0.5">
                    <span className="text-zinc-600 capitalize ">score:&nbsp;</span>
                    <span className="text-blue-400 ">
                        {data.score}
                    </span>
                </h3> 
                </>   


                :
                null
        }
        </div>
    )
}