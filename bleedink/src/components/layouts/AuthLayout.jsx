import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../basics/Loader";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state?.auth?.status);
  // console.log(authStatus);

  useEffect(() => {
    if (authentication && authStatus !== authentication) navigate("/login");
    else if (!authentication && authStatus !== authentication) navigate("/");
    setTimeout(() => {
      setLoader(false);
    });
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <div className="justify-center items-center flex">
      <Loader />
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
