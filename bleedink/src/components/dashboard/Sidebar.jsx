import React from "react";

const tabs = [
  {
    name: "profile",
    tabname: "Profile",
  },
  {
    name: "myposts",
    tabname: "My Posts",
  },
];

const Sidebar = ({ setTab, tab }) => {
  return (
    <div className="w-[30%] bg-slate-300 h-full">
      {tabs.map((t) => {
        return (
          <div
            key={t?.name}
            onClick={() => setTab(t?.name)}
            className={`flex items-center justify-center w-full h-16 cursor-pointer hover:bg-indigo-400 ease-in-out duration-150 ${
              t?.name === tab ? "bg-indigo-500" : ""
            }`}
          >
            <h1 className="text-slate-900 font-semibold">{t.tabname}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
