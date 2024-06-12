
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [savedData, setSavedData] = useState();
  const [allCoins, setAllCoins] = useState([]);
  let { currency, sortBy } = useContext(CryptoContext);

  const [storeError, setStoreError] = useState();

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoins = [...oldCoins, coinId];
      setAllCoins(newCoins);
      localStorage.setItem("coins", JSON.stringify(newCoins));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    let newCoins = oldCoins.filter((coin) => coin !== coinId);
    setAllCoins(newCoins);

    localStorage.setItem("coins", JSON.stringify(newCoins));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    setStoreError();

    // console.log("getSavedData function is running!");

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          let errorResponse = await res.json();
          setStoreError(errorResponse.error);
          throw new Error(errorResponse.error);
        })
        .then((json) => json);

      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
  }, [allCoins]);

  useEffect(() => {
    //initializing local storage
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;
    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));

      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        savedData,
        saveCoin,
        allCoins,
        removeCoin,
        storeError,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
