import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";
import { toast } from "react-toastify";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [savedCoins, setSavedCoins] = useState();

  let { currency, sortBy } = useContext(CryptoContext);

  useEffect(() => {
    if (coins) {
      if (coins.length > 0) {
        getCoinsData(coins);
      } else {
        setSavedCoins();
      }
    } else {
      localStorage.setItem("coins", JSON.stringify([]));
    }
  }, [coins]);

  const getCoinsData = async (allCoins = coins) => {
    if (savedCoins !== undefined) return;
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => json);

      setSavedCoins(data);
    } catch (e) {
      toast.error("An error occurred. Please wait a moment and try again");
    }
  };

  const saveCoin = (idCoin) => {
    let oldCoin = JSON.parse(localStorage.getItem("coins")) || [];

    if (oldCoin.includes(idCoin)) {
      return null;
    } else {
      let newCoin = [...oldCoin, idCoin];
      setCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = useCallback((idCoin) => {
    let oldCoin = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoin.filter((coin) => coin !== idCoin);
    setCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  }, []);

  useLayoutEffect(() => {
    const total = JSON.parse(localStorage.getItem("coins")) || [];
    if (total == null) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setCoins(totalCoins);

      if (totalCoins) {
        if (totalCoins.length > 0) {
          getCoinsData(totalCoins);
        }
      } else {
        localStorage.setItem("coins", JSON.stringify([]));
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        coins,
        removeCoin,
        savedCoins,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
