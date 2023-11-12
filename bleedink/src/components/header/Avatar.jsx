import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAvatar } from "../../assets";

const Avatar = ({ width = "40px", height = "40px" }) => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/${userData?.username}`)}
      className="rounded-full border border-black/10 bg-indigo-500"
    >
      <img
        src={userData?.profilePicture || userAvatar}
        alt="user avatar"
        title={userData?.name}
        width={width}
        height={height}
        className={`rounded-full p-[1px] cursor-pointer`}
      />
    </div>
  );
};

export default Avatar;
