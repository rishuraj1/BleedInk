import axios from "axios";
import React, { useEffect, useState } from "react";
import { userAvatar } from "../../assets";
import timestampParser from "./timestampParser";
import { MdAdminPanelSettings } from "react-icons/md";

const Commentdesign = ({ comment, authorId }) => {
  console.log(comment);
  const [thisComment, setThisComment] = useState(comment);
  // console.log(authorId);
  const isCommentAuthor = authorId === thisComment?.commentedBy?._id;
  // console.log(isCommentAuthor);
  useEffect(() => {
    setThisComment(comment);
  }, [comment]);

  console.log(thisComment);

  const userDP = (
    <>
      <img
        src={thisComment?.commentedBy?.profilePicture || userAvatar}
        alt="user"
        loading="lazy"
        className={`w-12 h-12 rounded-full relative object-cover border-2 ${
          isCommentAuthor ? "border-green-500" : "border-white"
        }`}
      />
      {isCommentAuthor && (
        <MdAdminPanelSettings
          className="text-[21px] text-indigo-600 cursor-pointer absolute mt-[30px] ml-8"
          title="Author"
        />
      )}
    </>
  );

  return (
    <div className="flex items-center w-full">
      <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-2 rounded-md w-full">
        {userDP}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <p className="font-semibold dark:text-slate-100">
              {thisComment?.commentedBy?.fullname}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-300">
              {timestampParser(thisComment?.createdAt)}
            </p>
          </div>
          <p className="text-sm dark:text-white font-Body">
            {thisComment?.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Commentdesign;
