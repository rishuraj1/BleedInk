import React from "react";

const PostboxSkeleton = () => {
  return (
    <div className="flex max-md:w-full flex-col gap-3 w-full px-8 h-full animate-pulse">
      {/* thumbnail and user avatar skeleton */}
      <div className="flex flex-col items-start justify-center relative">
        <div className="w-full h-[350px] rounded-sm bg-gray-200 dark:bg-slate-900"></div>
        <div className="flex gap-5 items-center absolute left-5 -bottom-12">
          <div className="w-32 h-32 shadow-xl bg-gray-300 dark:bg-slate-900 rounded-full"></div>
        </div>
      </div>
      {/* like and comment array skeleton */}
      <div className="flex mt-4 justify-end gap-6">
        <div className="flex justify-between items-center">
          <div className="text-slate-800 text-xl gap-2 flex items-center">
            <div className="w-8 h-8 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-slate-900"></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-slate-800 text-xl gap-2 flex items-center">
            <div className="w-8 h-8 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-slate-900"></div>
          </div>
        </div>
      </div>
      {/* title && content skeleton */}
      <div className="items-center mt-6 justify-center flex flex-col">
        <div className="flex justify-center items-center"></div>
        <h2 className="">
          <div className="font-Body font-semibold text-2xl">
            <div className="w-96 h-6 bg-gray-300 dark:bg-slate-900"></div>
          </div>
        </h2>
      </div>

      {/* content skeleton */}
      <div className="flex flex-col h-full w-full items-center p-2 rounded-md">
        <div
          className="bg-gray-300 dark:bg-slate-900 w-full rounded-md"
          style={{
            height: "200px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PostboxSkeleton;
