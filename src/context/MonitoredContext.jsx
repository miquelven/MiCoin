import { createContext, useContext, useEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

export const MonitoredContext = createContext();

export const MonitoredProvider = ({ children }) => {
  const [monitoredCoins, setMonitoredCoins] = useState([]);
  const [intervalIds, setIntervalIds] = useState({});
  const [userEmail, setUserEmail] = useState({});

  const { currency, sortBy } = useContext(CryptoContext);

  const fetchMonitoredCoinPrice = (name, currentPrice, userPrice) => {
    if (currentPrice === userPrice) {
      fetch("http://localhost:4000/api/send-email", {
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
    }, 30 * 60 * 1000); // Intervalo de 30 minutos

    // Armazenar o intervalId no localStorage
    const storedIntervals =
      JSON.parse(localStorage.getItem("monitored-intervals")) || {};
    storedIntervals[id] = intervalId;
    localStorage.setItem(
      "monitored-intervals",
      JSON.stringify(storedIntervals)
    );

    // Atualizar o state intervalIds
    setIntervalIds(storedIntervals);
  };

  const stopMonitoringCoin = (id) => {
    clearInterval(intervalIds[id]);

    // Remover o intervalId do localStorage
    const storedIntervals = { ...intervalIds };
    delete storedIntervals[id];
    localStorage.setItem(
      "monitored-intervals",
      JSON.stringify(storedIntervals)
    );

    // Atualizar o state intervalIds
    setIntervalIds(storedIntervals);
  };

  const monitoredCoinsValue = async () => {
    console.log("monitoredCoinsValue");
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
    }
  };

  const removeMonitored = (idCoin) => {
    let oldCoin = JSON.parse(localStorage.getItem("monitored-currency"));

    if (oldCoin.length === 1) {
      setMonitoredCoins([]);
      localStorage.setItem("monitored-currency", JSON.stringify([]));
      stopMonitoringCoin(idCoin); // Parar o intervalo associado ao ativo removido
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
    stopMonitoringCoin(idCoin); // Parar o intervalo associado ao ativo removido
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    monitoredCoinsValue();
  }, [monitoredCoins]);

  return (
    <MonitoredContext.Provider
      value={{ saveMonitoredCoin, monitoredCoins, removeMonitored }}
    >
      {children}
    </MonitoredContext.Provider>
  );
};
