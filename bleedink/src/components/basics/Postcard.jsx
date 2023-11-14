import React from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { CgComment } from "react-icons/cg";

const Postcard = ({ post }) => {
  console.log(post);
  const {
    content,
    thumbnail,
    likes,
    comments,
    createdBy,
    isPublic,
    createdAt,
  } = post;
  return (
    <div className="flex flex-col gap-2 w-[380px] h-[290px] rounded-md shadow-md  hover:scale-105 duration-150 ease-in-out">
      <div className="flex border-2 border-white rounded-md flex-col relative mt-4 bg-white">
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
      <Link to={`/posts/${post?._id}`}>
        <div className="flex justify-between items-center p-2">
          <p className="mt-4">
            {parser(content?.slice(0, 20) + "..." + "Read more")}
          </p>
          {/* likes and comments */}
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
        </div>
      </Link>
    </div>
  );
};

export default Postcard;
