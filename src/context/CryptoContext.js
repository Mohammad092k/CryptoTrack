

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [error, setError] = useState({ data: "", coinData: "", search: "" });
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currency, setCurrency] = useState("usd");
  const [coinSearch, setCoinSearch] = useState("");

  const getCryptoData = async () => {
    // console.log("getCryptoData function is running!");
    setError({ ...error, data: "" });
    setCryptoData();
    setLoading(true);

    //     try {
    //       const data = await fetch(
    //         `https://api.coingecko.com/api/v3/coins/list`
    //       )
    //         .then((res) => res.json())
    //         .then((json) => json);
    // console.log(data);
    //     } catch (error) {
    //       console.log(error);
    //     }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          setLoading(false);

          let errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });

          throw new Error(errorResponse.error);
        })
        .then((json) => json);

      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getCoinData = async (coin) => {
    setError({ ...error, coinData: "" });

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          let errorResponse = await res.json();
          setError({ ...error, coinData: errorResponse.error });
          throw new Error(errorResponse.error);
        })
        .then((json) => json);

      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    setError({ ...error, search: "" });
    setSearchData();
    
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          let errorResponse = await res.json();
          setError({ ...error, search: errorResponse.error });

          throw new Error(errorResponse.error);
        })
        .then((json) => json);
      // console.log(data)

      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const clearSearch = () => {
    setPage(1);
    setCoinSearch("");
  }

  useLayoutEffect(() => {
    getCryptoData();
  }, [perPage, page, sortBy, currency, coinSearch]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        setPerPage,
        setPage,
        page,
        perPage,
        setSortBy,
        sortBy,
        setCurrency,
        currency,
        getSearchResult,
        searchData,
        setSearchData,
        setCoinSearch,
        getCoinData,
        coinData,
        setCoinData,
        error,
        loading,
        clearSearch
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
