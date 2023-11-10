import React from "react";

const Container = ({ children, className = "" }) => {
  return <div className={`${className} flex flex-col`}>{children}</div>;
};

export default Container;
