
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      className="lg:w-[40%] sm:w-[80%] w-[90%] flex justify-around align-middle lg:mt-16
    sm:mt-24 mt-20
     border border-solid border-cyan sm:rounded-lg rounded-md"
    >
      <NavLink
        to="/"
        className={({
          isActive,
        }) => `w-full md:text-base text-sm text-center  font-nunito sm:m-2.5 m-1.5
      ${
        isActive
          ? "bg-cyan text-gray-300"
          : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 "
      } border-0  cursor-pointer rounded capitalize font-semibold
         
      `}
        //end prop is used to ensure that this component isn't matched as "active" when its descendant paths are matched.
        end
      >
        Coins
      </NavLink>

      <NavLink
        to="/trending"
        className={({
          isActive,
        }) => `w-full md:text-base text-sm  text-center  font-nunito sm:m-2.5 m-1.5
      ${
        isActive
          ? "bg-cyan text-gray-300"
          : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 "
      } border-0  cursor-pointer rounded capitalize font-semibold
         
      `}
      >
        TrendingCoins
      </NavLink>
      <NavLink
        to="/saved"
        className={({
          isActive,
        }) => `w-full md:text-base text-sm  text-center  font-nunito sm:m-2.5 m-1.5
      ${
        isActive
          ? "bg-cyan text-gray-300"
          : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 "
      } border-0  cursor-pointer rounded capitalize font-semibold
         
      `}
      >
        SavedCoins
      </NavLink>
    </nav>
  );
};

export default Navigation;

/*
<button className='bg-gray-200 text-gray-100 w-full my-2.5 border-0 cursor-pointer  rounded hover:text-cyan active:bg-cyan active:text-gray-300 font-semibold text-base '>
            <Link to="/trending" className='text-base capitalize font-nunito text-center'>trending</Link>
        </button>
        <button className='bg-gray-200 text-gray-100 w-full m-2.5 border-0  cursor-pointer rounded hover:text-cyan active:bg-cyan active:text-gray-300 font-semibold text-base '>
            <Link to="/saved" className='text-base capitalize font-nunito text-center'>saved</Link>
        </button>
*/
