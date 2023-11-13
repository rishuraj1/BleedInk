import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAvatar } from "../../assets";

const Avatar = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  // console.log(userData);

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/${userData?.username}`)}
      className="rounded-full border-white border-2 bg-indigo-500"
    >
      <img
        src={userData?.profilePicture || userAvatar}
        alt="user avatar"
        title={userData?.name}
        className={`rounded-full w-[40px] h-[40px] cursor-pointer object-cover`}
      />
    </div>
  );
};

export default Avatar;
