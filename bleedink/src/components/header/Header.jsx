import React, { useState } from "react";
import { Avatar, Darkmode, Logo, Navbar } from "./";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice";
import Button from "../basics/Button";
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state?.auth?.status);

  const handleLogout = () => {
    dispatch(authLogout());
    localStorage.removeItem("user");
  };

  return (
    <nav className="top-0">
      <nav className="dark:bg-slate-800 flex justify-between items-center bg-slate-300 p-2.5">
        <Link to="/">
          <div className="flex items-center justify-center gap-2">
            <Logo />
            <span className="text-center font-bold text-2xl text-blue-700 max-md:hidden">
              BleedINK<span className="text-blue-900">.</span>
            </span>
          </div>
        </Link>
        {/* desktop */}
        <div className="max-md:hidden flex justify-center gap-6 items-center">
          <Darkmode />
          <Navbar />
          {authStatus && <Avatar />}
          {authStatus && (
            <Button
              className="bg-red-500 hover:bg-red-700 duration-150 ease-in-out transition-all"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          <Link
            to="https://github.com/rishuraj1/BleedInk"
            target="_blank"
            title="Github"
          >
            <IoLogoGithub className="inline-block text-3xl text-slate-700 hover:text-black hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-white" />
          </Link>
        </div>

        {/* mobile */}
        <div className="hidden max-md:flex gap-3 items-center">
          <Darkmode />
          {authStatus && <Avatar />}
          {
            <button
              className="text-white text-2xl"
              onClick={() => setOpenMenu(!openMenu)}
              title="Menu"
            >
              {openMenu ? (
                <IoCloseSharp className="text-slate-800" />
              ) : (
                <IoMenuSharp className="text-slate-800" />
              )}
            </button>
          }
        </div>
      </nav>
      {openMenu && (
        <div className="max-md:flex flex-col hidden gap-3 justify-center items-center bg-slate-300 p-3">
          <span className="text-center font-bold text-2xl text-blue-700">
            BleedINK<span className="text-blue-900">.</span>
          </span>
          <Navbar />
          {authStatus && (
            <Button
              className="bg-red-500 hover:bg-red-700 duration-150 ease-in-out transition-all"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          <Link
            to="https://github.com/rishuraj1"
            target="_blank"
            title="Github"
          >
            <IoLogoGithub className="inline-block text-3xl text-slate-700 hover:text-black hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-white" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
