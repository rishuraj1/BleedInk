import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../index";

const Navbar = () => {
  const authStatus = useSelector((state) => state?.auth?.status);
  const user = useSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      active: authStatus,
    },
    {
      name: "Create Post",
      path: "/create",
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
    <div className="flex gap-4 max-md:flex-col items-center text-center">
      {navItems.map(
        (item, index) =>
          item.active && (
            <div
              key={index}
              className={`${
                item.active ? "text-primary" : "text-gray-500"
              } hover:text-primary cursor-pointer`}
            >
              {item.button ? (
                <Button onClick={() => navigate(item.path)}>{item.name}</Button>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default Navbar;
