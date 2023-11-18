import React, { useEffect, useState } from "react";
import { Profileheader, Profilebody } from "../index";
import { Avatar } from "../header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import conf from "../../conf";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const userData = useSelector((state) => state?.auth?.userData);
  // console.log(userData?.userData);

  //username, name, bio, coverImage, profilePicture, followers, following, posts

  useEffect(() => {
    if (userData?.userData?.username === username) {
      return;
    }
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${conf.backendURL}/api/v1/auth/getuser/${username}`,
        );
        const data = response;
        // console.log(data);
        setUser({
          id: data?.data?.data?._id,
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
  }, [setUser]);

  console.log(user);

  return (
    <div className="flex p-1 h-full w-full flex-col">
      <Profileheader user={user} />
      <Profilebody user={user} />
    </div>
  );
};

export default Profile;
