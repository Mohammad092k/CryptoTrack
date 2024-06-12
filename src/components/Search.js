
import React, { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "./../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData, error } =
    useContext(CryptoContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    handleSearch(query);
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };
  return (
    <>
      <form
        className="xl:w-96 lg:w-60 w-full relative flex items-center  lg:ml-7  font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={(e) => handleInput(e)}
          placeholder="search here..."
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 placeholder:text-base required outline-0 
border border-transparent focus:border-cyan
"
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} alt="CryptoBucks" className="w-full h-auto" />
        </button>
      </form>

      {searchText.length > 0 ? (
        <ul
          className="absolute top-11 left-5 lg:w-96 w-full bg-gray-200 rounded overflow-x-hidden  py-2 
         backdrop-filter backdrop-blur-md bg-opacity-60 
         scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 
        z-10 h-96
        "
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  key={coin.id}
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    src={coin.thumb}
                    alt={coin.id}
                    className="w-[1rem] h-[1rem] mx-1.5"
                  />
                  <span>{coin.name}</span>{" "}
                </li>
              );
            })
          ) : !error.search ? (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-solid border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="text-base ml-2">Searching...</span>
            </div>
          ) : error.search ? (
            <h1 className="min-h-full w-full text-md text-red flex items-center justify-center text-center">
              {error.search ? error.search : "Something unexpected happened!"}
            </h1>
          ) : null}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  const handleSearch = (val) => {
    debounceFunc(val);
  };

  return (
    <div className="relative">
      <SearchInput handleSearch={handleSearch} />
    </div>
  );
};

export default Search;
