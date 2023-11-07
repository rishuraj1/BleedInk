import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Darkmode = () => {
  const [darkmode, setDarkmode] = useState(false);
  return (
    <>
      {darkmode ? (
        <button
          className="text-white text-2xl ease-in-out transition-all duration-300"
          onClick={() => setDarkmode(!darkmode)}
        >
          <BsFillMoonStarsFill className="text-slate-800 text-[20px]" />
        </button>
      ) : (
        <button
          className="text-white text-center items-center text-2xl ease-in-out transition-all duration-300"
          onClick={() => setDarkmode(!darkmode)}
        >
          <BsFillSunFill className="text-yellow-500" />
        </button>
      )}
    </>
  );
};

export default Darkmode;
