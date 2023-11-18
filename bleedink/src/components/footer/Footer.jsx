import React from "react";
import { Logo } from "../header";
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter, FaLinkedin, FaGlobe } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-slate-300 w-full flex dark:bg-slate-800 py-3 px-3 justify-between">
      <div className="flex gap-2 items-center">
        <Logo />
        <span className="text-center font-bold text-2xl text-blue-700 max-md:hidden">
          BleedINK<span className="text-blue-900">.</span>
        </span>
      </div>
      <div className="justify-center items-center flex gap-3">
        {/* github */}
        <Link to="https://github.com/rishuraj1" target="_blank" title="Github">
          <IoLogoGithub className="inline-block text-2xl text-slate-700 hover:text-black hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-white" />
        </Link>
        {/* twitter */}
        <Link
          to="https://twitter.com/rrishu561"
          target="_blank"
          title="Twitter"
        >
          <FaXTwitter className="inline-block text-2xl text-slate-700 hover:text-black hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-white" />
        </Link>
        {/* linkedin */}
        <Link
          to="https://www.linkedin.com/in/rishu-raj-b380041a1/"
          target="_blank"
          title="Linkedin"
        >
          <FaLinkedin className="inline-block text-2xl text-slate-700 hover:text-[#0077b5] hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-[#0077b5]" />
        </Link>
        {/* website */}
        <Link
          to="https://rishuraj1.github.io/PortfolioReact/"
          target="_blank"
          title="Website"
        >
          <FaGlobe className="inline-block text-2xl text-slate-700 hover:text-indigo-500 hover:scale-110 ease-in-out duration-150 transition-all dark:text-slate-400 dark:hover:text-indigo-500" />
        </Link>
      </div>
      <div className="justify-center items-center flex">
        <span className="text-sm text-gray-400">© 2023 BleedINK</span>
      </div>
    </div>
  );
};

export default Footer;
