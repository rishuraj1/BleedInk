import React from "react";
import { logo } from "../../assets";

const Logo = ({ width = "100px" }) => {
  return (
    <img
      src={logo}
      alt={"BleedINK"}
      width="53px"
      className="rounded-full p-[3px] bg-indigo-500"
    />
  );
};

export default Logo;
