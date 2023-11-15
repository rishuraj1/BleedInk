import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`${className} flex flex-col p-4 flex-1 h-full`}>
      {children}
    </div>
  );
};

export default Container;
