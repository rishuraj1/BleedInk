import React from "react";
import { useParams } from "react-router-dom";
import { Profile, ProfileheaderSkeleton } from "../components";

const Profilepage = () => {
  const { username } = useParams();
  return (
    <div className="py-4">
      <Profile />
    </div>
  );
};

export default Profilepage;
