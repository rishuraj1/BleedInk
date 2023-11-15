import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Profile } from "../components";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.userData?.userData);
  // console.log(user);
  const { username } = useParams();
  // console.log(username);

  return (
    <>
      {username === user?.username ? (
        <>
          {/* desktop */}
          <div className="flex max-md:hidden items-center justify-around w-full h-full">
            <Profile />
          </div>
          {/* mobile */}
          <div className="hidden max-md:flex  flex-col w-full h-full">
            <Profile />
          </div>
        </>
      ) : (
        <h1>
          Oops! You are not authorized to view this page. Please login to view
        </h1>
      )}
    </>
  );
};

export default Dashboard;
