import React, { useEffect, useState } from "react";
import { defCover, userAvatar } from "../../assets";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidEditAlt, BiImageAdd } from "react-icons/bi";
import { update as updatState } from "../../store/authSlice";
import Button from "../basics/Button";
import { toast } from "react-toastify";
import conf from "../../conf";
import ProfileheaderSkeleton from "../skeletons/ProfileheaderSkeleton";

const Profileheader = ({ user }) => {
  const { userData } = useSelector((state) => state?.auth);
  const { username } = useParams();
  const [author, setAuthor] = useState(userData?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(userData);
  // console.log(user);
  // console.log(author);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (username === author?.username) navigate(`/dashboard/${username}`);
    if (user) {
      setCoverPreview(user?.coverImage || defCover);
      setProfilePreview(user?.profilePicture || userAvatar);
    } else {
      setCoverPreview(author.coverImage || defCover);
      setProfilePreview(author.profilePicture || userAvatar);
    }
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, [user, username, author.username, navigate, author]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (cover && profile) {
        const formCoverData = new FormData();
        formCoverData.append("username", username);
        formCoverData.append("coverPicture", cover);
        const response = await fetch(
          `${conf.backendURL}/api/v1/dashboard/updateimages/coverimage`,
          {
            method: "POST",
            body: formCoverData,
          },
        );

        const data = await response.json();
        console.log(data?.user?.coverImage);

        const formProfileData = new FormData();
        formProfileData.append("username", username);
        formProfileData.append("profilePicture", profile);

        const res = await fetch(
          `${conf.backendURL}/api/v1/dashboard/updateimages/profilepicture`,
          {
            method: "POST",
            body: formProfileData,
          },
        );

        const profiledata = await res.json();
        console.log(profiledata?.user?.profilePicture);

        dispatch(
          updatState({
            type: "UPDATE_USER_DATA",
            userData: {
              ...userData?.userData,
              coverImage: data?.user?.coverImage,
              profilePicture: profiledata?.user?.profilePicture,
            },
          }),
        );
        toast.success("Cover picture and Profile picture updated successfully");
      } else if (cover) {
        const formCoverData = new FormData();
        formCoverData.append("username", username);
        formCoverData.append("coverPicture", cover);
        const response = await fetch(
          `${conf.backendURL}/api/v1/dashboard/updateimages/coverimage`,
          {
            method: "POST",
            body: formCoverData,
          },
        );

        const data = await response.json();
        console.log(data?.user?.coverImage);
        dispatch(
          updatState({
            type: "UPDATE_USER_DATA",
            userData: {
              ...userData?.userData,
              coverImage: data?.user?.coverImage,
            },
          }),
        );
        toast.success("Cover picture updated successfully");
      } else if (profile) {
        const formProfileData = new FormData();
        formProfileData.append("username", username);
        formProfileData.append("profilePicture", profile);

        const res = await fetch(
          `${conf.backendURL}/api/v1/dashboard/updateimages/profilepicture`,
          {
            method: "POST",
            body: formProfileData,
          },
        );

        const profiledata = await res.json();
        console.log(profiledata?.user?.profilePicture);
        dispatch(
          updatState({
            type: "UPDATE_USER_DATA",
            userData: {
              ...userData?.userData,
              profilePicture: profiledata?.user?.profilePicture,
            },
          }),
        );
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setImageUpload(false);
      setCover(null);
      setProfile(null);
    }
  };

  return (
    <>
      {isPageLoading ? (
        <ProfileheaderSkeleton />
      ) : (
        <div className="flex relative flex-col h-full">
          <div className="flex group/cover relative flex-col bg-gray-400 h-[245px] border-[1.5px] border-white rounded-sm">
            <img
              src={coverPreview}
              alt="cover"
              className="w-full h-full object-cover rounded-sm rounded-b-none group-hover/cover:opacity-50 ease-in-out duration-150"
            />
            {username === author?.username && (
              <>
                <input
                  type="file"
                  name="coverPicture"
                  id="coverPicture"
                  className="hidden"
                  onChange={(e) => {
                    setImageUpload(true);
                    setCover(e.target.files[0]);
                    setCoverPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label htmlFor="coverPicture">
                  <BiSolidEditAlt
                    title="Edit cover picture"
                    className="absolute hidden group-hover/cover:flex bottom-5 right-6 bg-slate-300 ease-in-out duration-150 rounded-full p-2 cursor-pointer text-[40px] text-slate-700"
                  />
                </label>
              </>
            )}
          </div>
          <div className="rounded-full group/pp absolute top-[167px] left-6">
            <img
              src={profilePreview}
              alt="user"
              title={user?.name}
              className="bg-white border-4 border-white rounded-full w-28 h-28 object-cover group-hover/pp:opacity-50 ease-in-out duration-150"
            />
            {username === author?.username && (
              <>
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  className="hidden"
                  onChange={(e) => {
                    setImageUpload(true);
                    setProfile(e.target.files[0]);
                    setProfilePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label htmlFor="profilePicture">
                  <BiImageAdd
                    title={
                      !author?.profilePicture
                        ? "Upload profile picture"
                        : "Edit profile picture"
                    }
                    className="bottom-10 absolute left-11 bg-slate-300 text-3xl p-1 rounded-full text-slate-700 hidden group-hover/pp:flex cursor-pointer ease-in-out duration-150"
                  />
                </label>
              </>
            )}
          </div>
          {imageUpload && (
            <Button
              className="flex absolute right-8 top-[234px] bg-indigo-500 hover:bg-indigo-600 duration-150 ease-in-out transition-all my-4"
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Profileheader;
