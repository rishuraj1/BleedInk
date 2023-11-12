import React, { useEffect, useState } from "react";
import { defCover, userAvatar } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidEditAlt, BiImageAdd } from "react-icons/bi";
import { login as loginAction } from "../../store/authSlice";
import Button from "../basics/Button";
import { toast } from "react-toastify";

const Profileheader = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);

  const dispatch = useDispatch();

  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(
    userData?.coverImage ? userData?.coverImage : defCover,
  );
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(
    userData?.profilePicture ? userData?.profilePicture : userAvatar,
  );
  const [imageUpload, setImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.coverImage) {
      setCoverPreview(userData?.coverImage);
    }
    if (userData?.profilePicture) {
      setProfilePreview(userData?.profilePicture);
    }
  }, [userData?.coverImage, userData?.profilePicture]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (cover) {
        const formData = new FormData();
        formData.append("username", userData?.username);
        formData.append("coverPicture", cover);
        const response = await fetch(
          "/api/v1/dashboard/updateimages/coverimage",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();
        console.log(data?.user?.coverImage);

        dispatch(
          loginAction({
            type: "UPDATE",
            ...userData,
            coverImage: data?.user?.coverImage,
          }),
        );
        toast.success("Cover picture updated successfully");
      }

      // if (profile) {
      //   const formData = new FormData();
      //   formData.append("profilePicture", profile);
      //   const response = await fetch('/api/v1/dashboard/updateimages/profilepicture', {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const data = await response.json();
      //   console.log(data);
      // }
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
    <div className="flex relative flex-col w-full overflow-x-hidden">
      <div className="flex group/cover relative flex-col bg-gray-400 h-[250px] border-[1.5px] border-white rounded-sm">
        <img
          src={coverPreview}
          alt="cover"
          className="w-full h-full object-cover rounded-sm rounded-b-none group-hover/cover:opacity-50 ease-in-out duration-150"
        />
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
      </div>
      <div className="rounded-full group/pp absolute top-[167px] left-6">
        <img
          src={profilePreview}
          alt="user"
          title={userData?.name}
          className="bg-white border-4 border-white rounded-full w-28 h-28 object-cover group-hover/pp:opacity-50 ease-in-out duration-150"
        />
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
              !userData?.profilePicture
                ? "Upload profile picture"
                : "Edit profile picture"
            }
            className="bottom-10 absolute left-11 bg-slate-300 text-3xl p-1 rounded-full text-slate-700 hidden group-hover/pp:flex cursor-pointer ease-in-out duration-150"
          />
        </label>
      </div>
      {imageUpload && (
        <Button
          className="flex absolute right-3 top-64 bg-indigo-500 hover:bg-indigo-600 duration-150 ease-in-out transition-all my-4"
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      )}
    </div>
  );
};

export default Profileheader;
