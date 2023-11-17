import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../index";

const Navbar = () => {
  const authStatus = useSelector((state) => state?.auth?.status);
  // const user = useSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authStatus,
    },
    {
      name: "Log In",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      path: "/register",
      active: !authStatus,
      button: true,
    },
  ];

  return (
    <div className="flex gap-6 max-md:flex-col items-center text-center">
      {navItems.map(
        (item, index) =>
          item.active && (
            <div key={index}>
              {item.button ? (
                <Button onClick={() => navigate(item.path)}>{item.name}</Button>
              ) : (
                <Link
                  className={`text-slate-950 dark:text-slate-100 hover:text-slate-800 font-semibold duration-150 ease-in-out transition-all text-lg`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default Navbar;
