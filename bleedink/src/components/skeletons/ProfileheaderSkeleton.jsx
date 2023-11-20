import React from "react";
import Button from "../basics/Button";

const ProfileheaderSkeleton = () => {
  return (
    <div className="flex relative flex-col h-full animate-pulse">
      {/* Cover Section */}
      <div className="flex relative flex-col bg-gray-300 dark:bg-slate-900 h-[245px] rounded-sm">
        <div className="w-full h-full object-cover rounded-sm rounded-b-none animate-pulse"></div>
      </div>

      {/* Profile Picture Section */}
      <div className="rounded-full absolute top-[167px] left-6">
        <div className="bg-white dark:bg-slate-800 rounded-full w-28 h-28 object-cover"></div>
      </div>
    </div>
  );
};

export default ProfileheaderSkeleton;
