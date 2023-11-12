import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DashboardLayout, Profile, Myposts } from "../components";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.userData?.userData);
  console.log(user);
  const { username } = useParams();
  console.log(username);
  console.log(username === user?.username);

  return (
    <div className="py-4">
      {username === user?.username ? (
        <DashboardLayout userDashboard={user}>
          <Myposts />
          <Profile />
        </DashboardLayout>
      ) : (
        <h1>
          Oops! You are not authorized to view this page. Please login to view
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
