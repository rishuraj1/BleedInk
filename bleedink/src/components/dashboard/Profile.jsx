import React, { useEffect, useState } from "react";
import Profileheader from "./Profileheader";
import { Avatar } from "../header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const userData = useSelector((state) => state?.auth?.userData);
  console.log(userData?.userData);

  //username, name, bio, coverImage, profilePicture, followers, following, posts

  useEffect(() => {
    if (userData?.userData?.username === username) {
      setUser(userData?.userData);
      return;
    }
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/getuser/${username}`);
        const data = response;
        console.log(data);
        setUser({
          username: data?.data?.data?.username,
          name: data?.data?.data?.fullname,
          bio: data?.data?.data?.bio || "",
          coverImage: data?.data?.data?.coverImage || "",
          profilePicture: data?.data?.data?.profilePicture || "",
          followers: data?.data?.data?.followers || [],
          following: data?.data?.data?.following || [],
          posts: data?.data?.data?.posts || [],
        });
        console.log(user);
        console.log(data?.data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
        setUser(null);
      }
    };
    getUser();
  }, [username, userData?.userData]);

  if (!user) {
    return <div className="flex p-1 w-full">Oops! User not found</div>;
  }

  return (
    <div className="flex p-1 w-full">
      <Profileheader user={user} />
    </div>
  );
};

export default Profile;
