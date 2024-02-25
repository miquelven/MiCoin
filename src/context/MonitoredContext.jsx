import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";
import { toast } from "react-toastify";

export const MonitoredContext = createContext();

export const MonitoredProvider = ({ children }) => {
  const [monitoredCoins, setMonitoredCoins] = useState([]);
  const [intervalIds, setIntervalIds] = useState({});
  const [userEmail, setUserEmail] = useState({});

  const { currency, sortBy } = useContext(CryptoContext);

  const fetchMonitoredCoinPrice = (name, currentPrice, userPrice) => {
    if (currentPrice === userPrice) {
      fetch("https://mi-coin-send-email.vercel.app/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userEmail,
          name: name,
          currentPrice: currentPrice,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("ERRO BACKEND", error));
    }
  };

  const startMonitoringCoin = (data, userPrice, id) => {
    const { id: name, current_price: currentPrice } = data;

    const intervalId = setInterval(() => {
      fetchMonitoredCoinPrice(name, currentPrice, userPrice);
    }, 30 * 60 * 1000);

    const storedIntervals =
      JSON.parse(localStorage.getItem("monitored-intervals")) || {};
    storedIntervals[id] = intervalId;
    localStorage.setItem(
      "monitored-intervals",
      JSON.stringify(storedIntervals)
    );

    setIntervalIds(storedIntervals);
  };

  const stopMonitoringCoin = (id) => {
    clearInterval(intervalIds[id]);

    const storedIntervals = { ...intervalIds };
    delete storedIntervals[id];
    localStorage.setItem(
      "monitored-intervals",
      JSON.stringify(storedIntervals)
    );

    setIntervalIds(storedIntervals);
  };

  const monitoredCoinsValue = async () => {
    for (const monitoredCoin of monitoredCoins) {
      const { name, price } = monitoredCoin;

      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${name}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
          {
            method: "GET",
          }
        ).then((res) => res.json());

        startMonitoringCoin(data, price, name);
      } catch (e) {
        console.log("error: " + e);
      }
    }
  };

  const saveMonitoredCoin = (idCoin, price) => {
    const oldCoin =
      JSON.parse(localStorage.getItem("monitored-currency")) || [];

    if (oldCoin.includes(idCoin)) {
      return null;
    } else {
      const newMonitoredCoin = [...oldCoin, { name: idCoin, price: price }];
      setMonitoredCoins(newMonitoredCoin);
      localStorage.setItem(
        "monitored-currency",
        JSON.stringify(newMonitoredCoin)
      );
      toast.success("The asset is being monitored");
    }
  };

  const removeMonitored = (idCoin) => {
    let oldCoin = JSON.parse(localStorage.getItem("monitored-currency"));

    if (oldCoin.length === 1) {
      setMonitoredCoins([]);
      localStorage.setItem("monitored-currency", JSON.stringify([]));
      stopMonitoringCoin(idCoin);
      return;
    }

    setMonitoredCoins(
      oldCoin.filter((coinValue) => {
        return coinValue.name !== idCoin;
      })
    );

    const storedIntervals = { ...intervalIds };
    delete storedIntervals[idCoin];
    localStorage.setItem("monitored-currency", JSON.stringify(monitoredCoins));
    localStorage.setItem(
      "monitored-intervals",
      JSON.stringify(storedIntervals)
    );
    stopMonitoringCoin(idCoin);
  };

  useEffect(() => {
    const oldCoin =
      JSON.parse(localStorage.getItem("monitored-currency")) || [];

    if (oldCoin.length > 0) setMonitoredCoins(oldCoin);
  }, []);

  return (
    <MonitoredContext.Provider
      value={{
        saveMonitoredCoin,
        setUserEmail,
        monitoredCoins,
        removeMonitored,
        setUserEmail,
        monitoredCoinsValue,
      }}
    >
      {children}
    </MonitoredContext.Provider>
  );
};
