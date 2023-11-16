import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../basics/Button";
import Lottie from "lottie-react";
import { IoSend } from "react-icons/io5";
import { nocomments, userAvatar } from "../../assets";

const Commentbox = ({ post }) => {
  const [myCmt, setMyCmt] = useState("");
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();
  const thisPost = post;
  // console.log(thisPost);
  const userData =
    useSelector((state) => state?.auth?.userData?.userData) || null;
  console.log(userData);
  console.log(post);
  return (
    <div
      className={`bg-gray-200 max-md:w-full w-1/2 flex flex-col ${
        userData ? "justify-start items-start" : "justify-center items-center"
      } overflow-y-scroll rounded-sm shadow-lg p-4 border-2 border-white`}
    >
      {userData ? (
        <div className="flex flex-col gap-4 md:absolute flex-wrap">
          <div className="mt-8 justify-center items-center flex gap-2">
            <img
              src={userData?.profilePicture || userAvatar}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <input
              type="text"
              placeholder="Post a comment"
              className="w-[370px] h-12 rounded-full border-2 border-white px-4 max-[487px]:w-[200px] relative"
              onChange={(e) => setMyCmt(e.target.value)}
            />
            <IoSend
              onClick={() => setPosting(true)}
              title="Post"
              className="w-10 h-10 rounded-full text-indigo-500 duration-200 ease-in-out transition-all p-1 cursor-pointer hover:text-indigo-800 absolute right-1"
            />
          </div>

          {/* comments section */}
          {thisPost?.comments?.legth > 0 ? null : (
            <div className="flex flex-col justify-center items-center">
              <Lottie
                animationData={nocomments}
                className="w-80 h-80ml-10"
                loop
                autoplay
              />
              <p className="font-semibold text-2xl ml-10">No comments yet !</p>
              <p className="text-sm ml-10 font-semibold">
                Be the first to comment
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="justify-center flex flex-col items-center gap-4 md:absolute md:top-60">
            <p className="text-xl font-bold text-slate-800">
              Looks like you are not logged in
            </p>
            <Button onClick={() => navigate("/login")} className="w-[300px]">
              Login
            </Button>
            <p className="text-sm font-semibold">New here ?</p>
            <Button onClick={() => navigate("/register")}>Sign Up now</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Commentbox;
