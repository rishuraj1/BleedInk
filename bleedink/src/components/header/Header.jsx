import React, { useState } from "react";
import { Avatar, Darkmode, Logo, Navbar } from "./";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav>
      <nav className="flex justify-between items-center bg-slate-300 p-3">
        <Logo />
        {/* desktop */}
        <div className="max-md:hidden flex justify-center gap-3 items-center">
          <Navbar />
          <Darkmode />
          <Avatar />
        </div>

        {/* mobile */}
        <div className="hidden max-md:flex gap-3 items-center">
          <Darkmode />
          <Avatar />
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
        <div className="max-md:flex hidden gap-3 justify-center items-center bg-slate-300 p-3">
          <Navbar />
        </div>
      )}
    </nav>
  );
};

export default Header;
