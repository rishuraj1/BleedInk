import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../contexts/themeContext";

const Darkmode = () => {
  const { theme, setThemeMode } = useTheme();

  function toggleDarkMode() {
    if (theme === "dark") {
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    } else {
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setThemeMode(localTheme);
  }, [setThemeMode]);

  // console.log(theme);

  return (
    <>
      {theme === "light" ? (
        <button
          className="text-white text-2xl ease-in-out transition-all duration-300"
          onClick={toggleDarkMode}
        >
          <BsFillMoonStarsFill className="text-slate-800 text-[20px]" />
        </button>
      ) : (
        <button
          className="text-white text-center items-center text-2xl ease-in-out transition-all duration-300"
          onClick={toggleDarkMode}
        >
          <BsFillSunFill className="text-yellow-500" />
        </button>
      )}
    </>
  );
};

export default Darkmode;
