import React from "react";
import { useParams } from "react-router-dom";

const Editpost = () => {
  const { postId } = useParams();
  return <div>{postId}</div>;
};

export default Editpost;
