import React, { useState } from "react";
import { Sidebar, Profileheader } from "../";

const DashboardLayout = ({ children, userDashboard }) => {
  console.log(userDashboard);
  const [profileheader, setProfileheader] = useState({
    cover: userDashboard?.coverImage,
    profilePic: userDashboard?.profileImage,
  });

  return (
    <div className="">
      <Profileheader profileheader={profileheader} />
      <div className="flex justify-between">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
