import React from "react";

const PostcardSkeleton = () => {
  return (
    <>
      <div className="mt-4 flex flex-col gap-2 w-[390px] h-[300px] rounded-md shadow-md group duration-150 ease-in-out bg-slate-200 dark:bg-slate-900 animate-pulse">
        <div className="flex relative h-[200px] w-full">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-300 dark:bg-slate-800 rounded-md"></div>
          <div className="rounded-full absolute top-44 left-3 w-14 h-14 bg-white shadow-md dark:bg-slate-900"></div>
        </div>
        <div className="p-2 relative">
          <div className="rounded-[3px] mt-2 right-2 w-3/4 h-4 bg-slate-300 dark:bg-slate-800 ml-auto"></div>
          <div className="rounded-[3px] mt-2 w-full h-4 bg-slate-300 dark:bg-slate-800"></div>
          <div className="rounded-[3px] mt-2 w-full h-4 bg-slate-300 dark:bg-slate-800"></div>
        </div>
      </div>
    </>
  );
};

export default PostcardSkeleton;
