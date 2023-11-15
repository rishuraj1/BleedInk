import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../index";
import parser from "html-react-parser";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { CgComment } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";

const Postcard = ({ post }) => {
  const { username } = useParams();
  console.log(post);
  const {
    title,
    content,
    thumbnail,
    likes,
    comments,
    createdBy,
    isPublic,
    createdAt,
  } = post;

  const publishPrivatePost = async () => {
    try {
      const response = await axios.post(`/api/v1/posts/publish/${post?._id}`, {
        isPublic: post?.isPublic,
      });
      // console.log(response);
      toast.success(response?.data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2 w-[380px] h-[290px] rounded-md shadow-md group hover:scale-105 duration-150 ease-in-out">
      <div className="flex border-2 border-white rounded-md flex-col relative bg-white">
        {username === createdBy?.username && (
          <>
            {isPublic && (
              <div className="hidden z-40 fixed gap-3 justify-end items-center p-2 group-hover:flex">
                <Button className="w-15 text-sm" onClick={publishPrivatePost}>
                  Unpublish
                </Button>
                <Button className="w-15 text-sm">Edit</Button>
                <Button className="w-15 text-sm flex items-center text-center gap-2 bg-red-500 hover:bg-red-700 duration-150 ease-in-out">
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
            className="object-cover rounded-md"
          />
        </div>
        {/* user avatar */}
        <div className="">
          <Link to={`/profile/${createdBy?.username}`}>
            <img
              title={createdBy?.fullname}
              src={createdBy?.profilePicture}
              alt=""
              className="rounded-full w-14 h-14 border-2 border-white absolute -bottom-[26px] left-3 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      {/* content */}
      <div className="flex justify-between items-center p-2">
        <Link to={`/posts/${post?._id}`}>
          <p className="mt-4 font-semibold">
            {title.length > 25 ? title.slice(0, 25) + "..." : title}
          </p>
        </Link>
        {/* likes and comments */}
        {isPublic ? (
          <div className="pt-4 mr-2 text-center gap-2 items-center flex">
            <div className="flex justify-center items-center">
              <BiLike className="text-xl" />
              <p className="text-md ml-2">{likes?.length}</p>
            </div>
            <div className="flex justify-center items-center">
              <CgComment className="text-xl ml-2" />
              <p className="text-md ml-2">{comments?.length}</p>
            </div>
          </div>
        ) : (
          <div className="pt-4 mr-2 text-center gap-2 items-center flex">
            <Button className="w-16">
              <p className="text-xs text-center">Edit</p>
            </Button>
            <Button className="w-16" onClick={publishPrivatePost}>
              <p className="text-xs text-center">Publish</p>
            </Button>
            <Button className="w-16 flex bg-red-500 hover:bg-red-700 duration-150 ease-in-out">
              <p className="text-xs text-center">Delete</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Postcard;
