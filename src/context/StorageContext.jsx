import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import {CryptoContext} from './CryptoContext'

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [savedCoins, setSavedCoins] = useState();

  let {currency, sortBy} = useContext(CryptoContext)


  useEffect(()=>{
    if(coins.length > 0){
      getCoinsData(coins)
    }else{
      setSavedCoins();
    }
  }, [coins])

  const getCoinsData = async (allCoins = coins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(',')}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => json);

        setSavedCoins(data)

    } catch (e) {
      alert("error");
      console.log("error: " + e);
    }
  };


  const saveCoin = (idCoin) => {
    let oldCoin = JSON.parse(localStorage.getItem('coins')) || [];

    if(oldCoin.includes(idCoin)){
        return null;
    }else{
        let newCoin = [...oldCoin, idCoin];
        setCoins(newCoin)
        localStorage.setItem('coins', JSON.stringify(newCoin));
    }
  };

  const removeCoin = (idCoin) =>{
let oldCoin = JSON.parse(localStorage.getItem("coins"));

let newCoin = oldCoin.filter(coin => coin !== idCoin)
setCoins(newCoin)
        localStorage.setItem('coins', JSON.stringify(newCoin));
  }

  useLayoutEffect(() => {
    const total = JSON.parse(localStorage.getItem("coins")) || [];
    
    if(!total){
        localStorage.setItem("coins", JSON.stringify([]))
    }else{
        let totalCoins = JSON.parse(localStorage.getItem("coins"));
        setCoins(totalCoins);


        if(totalCoins.length > 0){
            getCoinsData(totalCoins)
        }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
       saveCoin, coins, removeCoin, savedCoins
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
