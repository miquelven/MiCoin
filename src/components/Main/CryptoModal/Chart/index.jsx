import { useContext, useLayoutEffect, useState } from "react"

import {CryptoContext} from '../../../../context/CryptoContext'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function CustomToolTip({payload, label, active, currency = 'usd'}){
    if(active && payload && payload.length>0){ 
        return(
            <div className='custom-tooltip'>
                <p className="label text-sm text-blue-400">{`${label} : ${new Intl.NumberFormat("en-IN", {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 5,
                }).format(payload[0].value)}`}</p>
            </div>
        )
    }
}

const ChartComponent = ({data, currency, type}) => {
return (
    <ResponsiveContainer height={'90%'} >
    <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey={type} stroke="#45A5FA" strokeWidth={'1px'}/>
    <CartesianGrid stroke='#3F3F46'/>
    <XAxis dataKey='date' hide/> 
    <YAxis dataKey={type} hide domain={['auto', 'auto']}/>
    <Tooltip content={<CustomToolTip />} currency={currency} cursor={false} wrapperStyle={{outline: "none"}}/>
    <Legend />
    </LineChart>
    </ResponsiveContainer>
)
}

export default function Chart ({id}) {

    const [chartData, setChartData] = useState()
    const [type, setType] = useState('prices')
    const [days, setDays] = useState(7)
    const {currency} = useContext(CryptoContext)

    useLayoutEffect(()=>{
        const getChartData = async (id) =>{
            try{
                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`).then(res => res.json()).then(json => json);

                let convertData = data[type].map(price => 
                    {
                        return  {
                            date: new Date(price[1]).toLocaleDateString(),
                            [type]: price[1]
                        }
                    })

                setChartData(convertData);
            }catch(e){
                console.log("error: " + e)
            }
        }

        getChartData(id)
    }, [id, type, days])

    return (
        <div className='w-full h-[60%]'>
        <ChartComponent data={chartData} currency={currency} type={type}/>
        <div>
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${type == 'prices' ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-500'}`} onClick={()=>setType('prices')}>Price</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${type === 'market_cap' ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-400'}`} onClick={()=>setType('market_caps')}>market caps</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${type === 'total_volumes' ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-400'}`} onClick={()=>setType('total_volumes')}>total volumes</button>
            
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${days == 7 ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-400'}`} onClick={()=>setDays(7)}>7d</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${days == 14 ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-400'}`} onClick={()=>setDays(14)}>14d</button>
            <button className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${days == 30 ? 'bg-blue-600 text-blue-300' : 'bg-zinc-700  text-zinc-400'}`} onClick={()=>setDays(30)}>30d</button>

        </div>
        </div>
    )
}