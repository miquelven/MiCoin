import { useEffect, useState } from "react";
import cryptoStore from "../../../stores/cryptoStore";
import { API } from "../../../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomToolTip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    // Determina o tipo de dados para exibir o rótulo correto
    let valueLabel = "Preço";
    if (payload[0].dataKey === "market_caps") {
      valueLabel = "Cap. de Mercado";
    } else if (payload[0].dataKey === "total_volumes") {
      valueLabel = "Volume Total";
    }
    
    // Formata o valor com base no tipo de dados
    const value = payload[0].value;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: payload[0].dataKey === "prices" ? 5 : 0,
      maximumFractionDigits: payload[0].dataKey === "prices" ? 5 : 0,
    }).format(value);
    
    return (
      <div className="custom-tooltip bg-zinc-800 p-2 rounded shadow-lg border border-zinc-700">
        <p className="label text-sm font-medium text-white mb-1">{label}</p>
        <p className="value text-sm text-blue-400">
          <span className="font-medium">{valueLabel}:</span> {formattedValue}
        </p>
      </div>
    );
  }
  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  // Define cores e rótulos com base no tipo de dados
  const getChartConfig = () => {
    switch(type) {
      case "prices":
        return {
          stroke: "#3b82f6", // blue-500
          fill: "#3b82f680", // blue-500 com transparência
          label: "Preço"
        };
      case "market_caps":
        return {
          stroke: "#10b981", // emerald-500
          fill: "#10b98180", // emerald-500 com transparência
          label: "Cap. de Mercado"
        };
      case "total_volumes":
        return {
          stroke: "#8b5cf6", // violet-500
          fill: "#8b5cf680", // violet-500 com transparência
          label: "Volume Total"
        };
      default:
        return {
          stroke: "#3b82f6",
          fill: "#3b82f680",
          label: "Preço"
        };
    }
  };

  const config = getChartConfig();

  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart 
        width={400} 
        height={400} 
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={config.stroke} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={config.stroke} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#3F3F46" strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#9ca3af' }} // text-gray-400
          tickMargin={10}
        />
        <YAxis 
          dataKey={type} 
          domain={["auto", "auto"]} 
          tick={{ fill: '#9ca3af' }} // text-gray-400
          tickFormatter={(value) => {
            // Formata os valores do eixo Y de acordo com o tipo
            if (type === "prices") {
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: currency,
                notation: "compact",
                maximumFractionDigits: 2
              }).format(value);
            } else {
              return new Intl.NumberFormat("pt-BR", {
                notation: "compact",
                maximumFractionDigits: 1
              }).format(value);
            }
          }}
        />
        <Tooltip
          content={<CustomToolTip />}
          currency={currency}
          cursor={{ stroke: '#6b7280', strokeWidth: 1 }} // text-gray-500
          wrapperStyle={{ outline: "none" }}
        />
        <Legend 
          formatter={() => config.label}
          wrapperStyle={{ paddingTop: '10px' }}
        />
        <Line
          type="monotone"
          dataKey={type}
          name={config.label}
          stroke={config.stroke}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, stroke: config.stroke, strokeWidth: 2, fill: '#fff' }}
          fillOpacity={1}
          fill={`url(#gradient-${type})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function Chart({ id }) {
  const [chartData, setChartData] = useState();
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currency = cryptoStore((state) => state.cryptoParams.currency);

  useEffect(() => {
    const getChartData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await API.getChartData(id, currency, days);
        
        if (data && data[type]) {
          const convertData = data[type].map((item) => {
            return {
              date: new Date(item[0]).toLocaleDateString(),
              [type]: item[1],
            };
          });
          
          setChartData(convertData);
        } else {
          setError("Dados do gráfico não disponíveis");
        }
      } catch (e) {
        console.error("Chart error:", e);
        setError("Erro ao carregar dados do gráfico");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getChartData();
    }
  }, [id, type, days, currency]);

  return (
    <div className="w-full h-[60%] max-sm:mt-20 max-[400px]:mt-32">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full flex-col">
          <p className="text-red-500 mb-2">{error}</p>
          <button 
            onClick={() => {
              setIsLoading(true);
              setError(null);
              API.getChartData(id, currency, days)
                .then(data => {
                  if (data && data[type]) {
                    const convertData = data[type].map((item) => ({
                      date: new Date(item[0]).toLocaleDateString(),
                      [type]: item[1],
                    }));
                    setChartData(convertData);
                  } else {
                    setError("Dados do gráfico não disponíveis");
                  }
                })
                .catch(e => {
                  console.error("Chart error:", e);
                  setError("Erro ao carregar dados do gráfico");
                })
                .finally(() => setIsLoading(false));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      ) : chartData && chartData.length > 0 ? (
        <ChartComponent data={chartData} currency={currency} type={type} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Nenhum dado disponível para exibição</p>
        </div>
      )}
      
      <div className="max-sm:flex max-sm:gap-[15px] max-sm:flex-wrap max-sm:mt-3 mt-4">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${
            type == "prices"
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-500"
          }`}
          onClick={() => setType("prices")}
          disabled={isLoading}
        >
          Preço
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${
            type === "market_caps"
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-400"
          }`}
          onClick={() => setType("market_caps")}
          disabled={isLoading}
        >
          Cap. de mercado
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${
            type === "total_volumes"
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-400"
          }`}
          onClick={() => setType("total_volumes")}
          disabled={isLoading}
        >
          Volume total
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${
            days == 7
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-400"
          }`}
          onClick={() => setDays(7)}
          disabled={isLoading}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize ${
            days == 14
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-400"
          }`}
          onClick={() => setDays(14)}
          disabled={isLoading}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 opacity-85 rounded capitalize max-2xl:mb-3 ${
            days == 30
              ? "bg-blue-600 text-blue-300"
              : "bg-zinc-700  text-zinc-400"
          }`}
          onClick={() => setDays(30)}
          disabled={isLoading}
        >
          30d
        </button>
      </div>
    </div>
  );
}
