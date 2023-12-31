import React, { useEffect, useState } from "react";
import { userAvatar } from "../../assets";
import { Link } from "react-router-dom";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import parse from "html-react-parser";
import { BiLike, BiSolidLike, BiCommentDetail } from "react-icons/bi";
import { postBackground } from "../../assets";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import conf from "../../conf";
import PostboxSkeleton from "../skeletons/PostboxSkeleton";

const Postbox = ({ post, setIsCommentBox, isCommentBox, setPost }) => {
  const [thisPost, setThisPost] = useState(post);
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(post);

  useEffect(() => {
    setThisPost(post);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [post, setThisPost, thisPost]);

  console.log(thisPost);

  const {
    _id,
    title,
    content,
    createdAt,
    thumbnail,
    likes,
    createdBy,
    updatedAt,
    isPublic,
    comments,
  } = thisPost;

  const isLiked = thisPost?.likes?.some((like) => like._id === userData?.id);
  console.log(isLiked);

  const handleLike = async () => {
    try {
      await axios.post(
        `${conf.backendURL}/api/v1/posts/like/${userData?.id}/${thisPost?._id}`,
      );
      // setIsLiked(!isLiked);
      const updatedpost = await axios.get(
        `${conf.backendURL}/api/v1/posts/getpost/${thisPost?._id}`,
      );
      const data = (await updatedpost?.data?.post) || {};
      const commentData = (await updatedpost?.data?.comments) || [];
      data.comments = commentData;
      setPost(data);
      toast.success("Like updated");
    } catch (error) {
      console.log(error);
    }
  };

  if (!thisPost) return <div>Invalid</div>;

  return (
    <div
      className={`flex max-md:w-full flex-col gap-3 ${
        isCommentBox ? "w-2/3" : "w-full"
      } px-8 h-full`}
    >
      {isLoading ? (
        <PostboxSkeleton />
      ) : (
        <>
          {/* thumbnail and user avatar */}
          <div className="flex flex-col items-start justify-center relative">
            <img
              src={thumbnail}
              loading="lazy"
              alt="thumbnail"
              className="object-cover w-full max-h-[350px] border-2 border-black rounded-sm"
            />
            <div className="flex gap-5 items-center absolute left-5 -bottom-10">
              <Link to={`/profile/${createdBy?._id}`}>
                <img
                  src={createdBy?.profilePicture || userAvatar}
                  alt="user"
                  title={createdBy?.fullname}
                  loading="lazy"
                  className="w-36 h-36 border-2 border-white rounded-full object-cover"
                />
              </Link>
            </div>
          </div>
          {/* like and comment array */}
          <div className="flex mt-4 justify-end gap-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-800 text-xl gap-2 flex items-center">
                {isLiked ? (
                  <BiSolidLike
                    className="text-3xl text-indigo-500 cursor-pointer"
                    title="Liked"
                    onClick={handleLike}
                  />
                ) : (
                  <BiLike
                    className="text-3xl text-slate-800 dark:text-slate-600 hover:text-indigo-500 duration-200 transition-all ease-in-out cursor-pointer"
                    title="Like"
                    onClick={handleLike}
                  />
                )}
                <span className="dark:text-slate-50">{likes?.length}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-800 text-xl gap-2 flex items-center">
                <BiCommentDetail
                  className={`text-3xl ${
                    isCommentBox
                      ? "text-indigo-500 hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-700"
                      : "text-slate-800 hover:text-slate-900"
                  } duration-200 transition-all ease-in-out cursor-pointer dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-700`}
                  title="Comments"
                  onClick={() => setIsCommentBox(!isCommentBox)}
                />
                <span className="dark:text-slate-50">{comments?.length}</span>
              </span>
            </div>
          </div>
          {/* title && content */}
          <div className="items-center mt-10 justify-center flex flex-col">
            <div className="flex justify-center items-center">
              <span className="px-2 text-indigo-500 font-Title text-[45px]">
                {title}
              </span>
            </div>
            <h2 className="">
              <span className="hover:text-slate-800 duration-150 ease-in-out transition-all">
                <Link
                  className="font-Body font-semibold text-2xl"
                  to={`/profile/${createdBy?._id}`}
                >
                  <span className="dark:text-slate-50">
                    {createdBy?.fullname}
                  </span>
                </Link>
              </span>
            </h2>
          </div>

          {/* content */}
          <div
            className="flex flex-col h-full w-full items-center p-2 overflow-y-auto border-2 rounded-md"
            style={{
              backgroundImage: `url(${postBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              padding: "20px",
              boxShadow: "0px 0px 10px 5px rgba(0.5,0.5,0.5,0.5)",
            }}
          >
            <p className="font-Body text-slate-800 text-2xl">
              {parse(content || "")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Postbox;
