import { createContext, useLayoutEffect } from "react";
import { useState } from "react";

import { toast } from "react-toastify";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [coinData, setCoinData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSelected, setCoinSelected] = useState("");
  const [pageSelected, setPageSelected] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [per_page, setPerPage] = useState(10);

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
      toast.error("An error occurred. Please wait a moment and try again");
    }
  };

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => json);

      setTotalPages(data.length);
    } catch (e) {
      toast.error("An error occurred. Please wait a moment and try again");
    }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSelected}&order=${sortBy}&per_page=${per_page}&page=${pageSelected}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => json);

      setCryptoData(data);
    } catch (e) {
      toast.error("An error occurred. Please wait a moment and try again");
    }
  };

  const getCoinData = async (id) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => json);

      setCoinData(data);
    } catch (e) {
      toast.error("An error occurred. Please wait a moment and try again");
    }
  };

  const resetData = () => {
    setPageSelected(1);
    setSearchData("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSelected, currency, sortBy, pageSelected, per_page]);

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
        totalPages,
        pageSelected,
        setPageSelected,
        resetData,
        setPerPage,
        per_page,
        coinData,
        getCoinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
