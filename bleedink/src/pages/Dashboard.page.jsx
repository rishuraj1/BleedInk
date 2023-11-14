import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Profile, Myposts, Profileheader, Sidebar } from "../components";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.userData?.userData);
  console.log(user);
  const { username } = useParams();
  // console.log(username);

  const [tab, setTab] = useState("profile");

  const components = [
    {
      name: "profile",
      component: <Profile />,
    },
    {
      name: "myposts",
      component: <Myposts />,
    },
  ];

  return (
    <>
      {username === user?.username ? (
        <>
          {/* desktop */}
          <div className="flex max-md:hidden items-center justify-around w-full h-full">
            <Sidebar setTab={setTab} tab={tab} />
            <div className="flex justify-between w-full h-full">
              {components.map((component) => {
                if (tab === component.name) {
                  return component.component;
                }
              })}
            </div>
          </div>

          {/* mobile */}
          <div className="hidden max-md:flex  flex-col w-full h-full">
            <Sidebar setTab={setTab} tab={tab} />
            {components.map((component) => {
              if (tab === component.name) {
                return component.component;
              }
            })}
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
