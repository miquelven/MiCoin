import { createContext, useLayoutEffect } from "react";
import { useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSelected, setCoinSelected] = useState("");

  const [currency, setCurrency] = useState("usd");

  const [sortBy, setSortby] = useState("market_cap_desc");

  const getSearch = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSearchData(data.coins);
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSelected}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => json);

      setCryptoData(data);
    } catch (e) {
      alert("error");
      console.log("error: " + e);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSelected, currency, sortBy]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearch,
        setSearchData,
        setCoinSelected,
        currency,
        setCurrency,
        setSortby,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
