
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useLayoutEffect, useState } from "react";

export const TrendContext = createContext({});

export const TrendProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();
  const [trendError, setTrendError] = useState();


  const getTrendData = async () => {
    // console.log("getTrendData function is running!");
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }

        let errorResponse = await res.json();
        setTrendError(errorResponse.error);
        throw new Error(errorResponse.error);
      })
        .then((json) => json);

      // console.log(data);
      setTrendData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingResult = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return (
    <TrendContext.Provider
      value={{
        trendData,
        trendError,
        resetTrendingResult
      }}
    >
      {children}
    </TrendContext.Provider>
  );
};
