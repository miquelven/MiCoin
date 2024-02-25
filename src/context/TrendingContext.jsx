import { createContext, useState } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState();

  const getTrendingData = async () => {
    if (trendingData) return;
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((json) => json);

      setTrendingData(data.coins);
    } catch (e) {
      toast.error("An error occurred. Please wait a moment and try again");
    }
  };

  return (
    <TrendingContext.Provider
      value={{
        trendingData,
        getTrendingData,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
