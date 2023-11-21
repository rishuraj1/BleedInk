import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../basics/Button";
import Lottie from "lottie-react";
import { IoSend } from "react-icons/io5";
import { nocomments, userAvatar } from "../../assets";
import { toast } from "react-toastify";
import axios from "axios";
import Commentdesign from "./Commentdesign";
import { MdAdminPanelSettings } from "react-icons/md";
import conf from "../../conf";

const Commentbox = ({ post, setPost }) => {
  const [myCmt, setMyCmt] = useState("");
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();
  const [thisPost, setThisPost] = useState(post);
  const userData =
    useSelector((state) => state?.auth?.userData?.userData) || null;
  // console.log(userData);
  // console.log(post);

  useEffect(() => {
    setThisPost(post);
  }, [thisPost, post, setPost]);
  console.log(thisPost);
  const isAuthor = userData?.id === thisPost?.createdBy?._id;
  // console.log(isAuthor);

  // post comment
  const handleComment = async () => {
    setPosting(true);
    if (myCmt === "" || myCmt === null || !myCmt) {
      toast.error("Comment cannot be empty");
      setPosting(false);
      return;
    }
    try {
      const newComment = {
        userId: userData?.id,
        comment: myCmt,
      };
      const response = await axios.post(
        `${conf.backendURL}/api/v1/posts/comment/${thisPost?._id}`,
        newComment,
      );
      toast.success("Comment posted");

      // update post
      const updatedpost = await axios.get(
        `${conf.backendURL}/api/v1/posts/getpost/${thisPost?._id}`,
      );
      const data = (await updatedpost?.data?.post) || {};
      const commentData = (await updatedpost?.data?.comments) || [];
      data.comments = commentData;
      setPost(data);
      setMyCmt("");

      // console.log(post);

      // console.log(response);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setPosting(false);
      setMyCmt("");
    }
  };

  return (
    <div
      className={`flex flex-col w-[40%] bg-gray-300 dark:bg-gray-900 justify-start items-center p-2 rounded-md gap-4 max-md:w-full max-md:mt-4 max-md:rounded-none max-md:rounded-t-md max-md:rounded-b-md max-md:shadow-md max-md:bg-white dark:max-md:bg-white
       max-md:justify-center max-md:items-center max-md:p-4 max-md:gap-4`}
    >
      {userData ? (
        <div className="flex flex-col gap-4 w-full flex-wrap no-scrollbar overflow-y-scroll">
          <div className="flex gap-2 mt-4 w-full items-start">
            <img
              loading="lazy"
              src={userData?.profilePicture || userAvatar}
              className={`w-12 h-12 rounded-full object-cover border-2 ${
                isAuthor ? "border-green-500" : "border-white"
              }`}
            />
            {isAuthor && (
              <MdAdminPanelSettings
                className="text-[21px] text-indigo-600 cursor-pointer absolute mt-[28px] ml-7"
                title="Author"
              />
            )}
            <input
              type="text"
              placeholder="Post a comment"
              className="relative w-full flex justify-center items-center h-12 rounded-full focus:outline-none focus:border-indigo-500 p-2 dark:bg-slate-800 dark:text-white"
              onChange={(e) => setMyCmt(e.target.value)}
            />
            {!posting ? (
              <IoSend
                onClick={handleComment}
                title="Post"
                className="text-indigo-500 mt-2 right-8 font-semibold absolute cursor-pointer hover:text-indigo-600 text-3xl"
              />
            ) : (
              <span className="text-indigo-500 p-1 font-semibold absolute right-8 mt-2">
                Posting...
              </span>
            )}
          </div>

          {/* comments section */}
          {thisPost?.comments?.length > 0 ? (
            <div className="flex flex-col gap-3 items-center justify-center">
              {thisPost?.comments?.map((comment, index) => (
                <Commentdesign
                  comment={comment}
                  key={index}
                  authorId={thisPost?.createdBy?._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Lottie
                animationData={nocomments}
                className="w-80 h-80ml-10"
                loop
                autoplay
              />
              <p className="font-semibold text-2xl ml-10 dark:text-slate-500">
                No comments yet !
              </p>
              <p className="text-sm ml-10 font-semibold dark:text-slate-300">
                Be the first to comment
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="justify-center flex flex-col items-center gap-4 md:absolute md:top-60">
            <p className="text-xl font-bold text-slate-800 dark:text-slate-400">
              Looks like you are not logged in
            </p>
            <Button onClick={() => navigate("/login")} className="w-[300px]">
              Login
            </Button>
            <p className="text-sm font-semibold dark:text-white">New here ?</p>
            <Button onClick={() => navigate("/register")}>Sign Up now</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Commentbox;
