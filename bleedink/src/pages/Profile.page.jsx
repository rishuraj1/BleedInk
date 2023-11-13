import React from "react";
import { useParams } from "react-router-dom";
import { Profile } from "../components";

const Profilepage = () => {
  const { username } = useParams();
  return (
    <div className="py-4">
      <h1>{username}</h1>
      <Profile />
    </div>
  );
};

export default Profilepage;
