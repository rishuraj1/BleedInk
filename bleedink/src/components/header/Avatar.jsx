import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAvatar } from "../../assets";

const Avatar = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  // console.log(userData);

  return (
    <div className="rounded-full border border-black/10 bg-indigo-500">
      <img
        src={userData?.profilePicture || userAvatar}
        alt="user avatar"
        title={userData?.name}
        className="rounded-full p-[1px] w-10 h-10 cursor-pointer"
      />
    </div>
  );
};

export default Avatar;
