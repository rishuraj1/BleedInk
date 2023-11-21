import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, timestampParser } from "../index";
import parser from "html-react-parser";
import { BiLike } from "react-icons/bi";
import { BiSolidLike, BiTime } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { CgComment } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userAvatar } from "../../assets";
import conf from "../../conf";

const Postcard = ({ post }) => {
  const [thisPost, setThisPost] = useState(post);
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);
  const { username } = useParams();
  console.log(post);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const updatedpost = await axios.get(
          `${conf.backendURL}/api/v1/posts/getpost/${thisPost?._id}`,
        );
        const data = (await updatedpost?.data?.post) || {};
        const commentData = (await updatedpost?.data?.comments) || [];
        data.comments = commentData;
        setThisPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [thisPost?._id, setThisPost]);

  console.log(thisPost);

  const {
    _id,
    title,
    content,
    thumbnail,
    likes,
    comments,
    createdBy,
    isPublic,
    createdAt,
    updatedAt,
  } = thisPost;

  const isLiked = thisPost?.likes?.some((like) => like._id === userData?.id);
  console.log(isLiked);

  const publishPrivatePost = async () => {
    try {
      const response = await axios.post(
        `${conf.backendURL}/api/v1/posts/publish/${post?._id}`,
        {
          isPublic: post?.isPublic,
        },
      );
      // console.log(response);
      toast.success(response?.data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${conf.backendURL}/api/v1/posts/delete/${post?._id}`);
      toast.success("Post deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(
        `${conf.backendURL}/api/v1/posts/like/${userData?.id}/${_id}`,
      );
      // setIsLiked(!isLiked);
      // toast.success("Like updated");
      const updatedpost = await axios.get(
        `${conf.backendURL}/api/v1/posts/getpost/${thisPost?._id}`,
      );
      const data = (await updatedpost?.data?.post) || {};
      const commentData = (await updatedpost?.data?.comments) || [];
      data.comments = commentData;
      setThisPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2 w-[390px] h-[300px] rounded-md shadow-md group hover:scale-105 duration-150 ease-in-out dark:bg-slate-900">
      <div className="flex border-2 border-white rounded-md flex-col relative bg-white">
        {userData?.username === createdBy?.username && (
          <>
            {isPublic && (
              <div className="hidden z-40 fixed gap-3 justify-end items-center p-2 group-hover:flex">
                <Button className="w-15 text-sm" onClick={publishPrivatePost}>
                  Unpublish
                </Button>
                {/* <Link to={`/edit-post/${post?._id}`}>
                  <Button className="w-15 text-sm">Edit</Button>
                </Link> */}
                <Button
                  onClick={handleDelete}
                  className="w-15 text-sm flex items-center text-center gap-2 bg-red-500 hover:bg-red-700 duration-150 ease-in-out"
                >
                  <MdDelete className="text-xl" />
                  Delete
                </Button>
              </div>
            )}
          </>
        )}
        {/* thumbnail */}
        <div className="flex relative h-[200px] w-full">
          <img
            src={thumbnail}
            alt="thumbnail"
            loading="lazy"
            className="object-cover rounded-md"
          />
        </div>
        {/* user avatar */}
        <div className="">
          <Link to={`/profile/${createdBy?.username}`}>
            <img
              title={createdBy?.fullname}
              src={createdBy?.profilePicture || userAvatar}
              alt=""
              loading="lazy"
              className="rounded-full object-cover w-14 h-14 border-2 border-white absolute -bottom-[26px] left-3 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      {/* title */}
      <div className="flex justify-between items-center p-2">
        <Link to={`/posts/${post?._id}`}>
          <p className="mt-4 font-semibold dark:text-slate-400">
            {title.length > 16 ? title.slice(0, 14) + "..." : title}
          </p>
        </Link>
        {/* likes and comments */}
        {isPublic ? (
          <div className="pt-4 mr-2 text-center gap-2 items-center flex">
            {isLiked ? (
              <div className="flex justify-center items-center">
                <BiSolidLike
                  className={`text-xl cursor-pointer text-indigo-500 hover:text-indigo-600 ease-in-out duration-150`}
                  title="Unlike"
                  onClick={handleLike}
                />
                <p className="text-md ml-2 dark:text-slate-50">
                  {likes?.length}
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <BiLike
                  className="text-xl cursor-pointer dark:text-slate-600"
                  onClick={handleLike}
                />
                <p className="text-md ml-2 dark:text-slate-50">
                  {likes?.length}
                </p>
              </div>
            )}
            <Link to={`/posts/${post?._id}`}>
              <div className="flex justify-center items-center">
                <CgComment className="text-xl dark:text-slate-600 ml-2 cursor-pointer" />
                <p className="text-md ml-2 dark:text-slate-50">
                  {comments?.length}
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="pt-4 mr-2 text-center gap-2 items-center flex">
            {/* <Link to={`/edit-post/${post?._id}`}>
              <Button className="w-16">
                <p className="text-xs text-center">Edit</p>
              </Button>
            </Link> */}
            <Button className="w-16" onClick={publishPrivatePost}>
              <p className="text-xs text-center">Publish</p>
            </Button>
            <Button className="w-16 flex bg-red-500 hover:bg-red-700 duration-150 ease-in-out">
              <p className="text-xs text-center">Delete</p>
            </Button>
          </div>
        )}
      </div>
      <div className="px-2">
        <p className="text-xs text-gray-600 flex items-center gap-1 text-center">
          <BiTime className="text-xs dark:text-slate-300" />
          <span className="dark:text-slate-300">
            {timestampParser(createdAt)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Postcard;
