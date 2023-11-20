import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { update as editUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PostcardSkeleton } from "../../components";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import conf from "../../conf";
const Postcard = lazy(() => import("../../components/basics/Postcard"));

const Profilebody = ({ user }) => {
  const { username } = useParams();
  const { userData } = useSelector((state) => state?.auth);
  console.log(userData?.userData);
  const [loading, setLoading] = useState(false);
  const currUser = user || userData?.userData;
  console.log(currUser);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [posts, setPosts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${conf.backendURL}/api/v1/posts/getposts/${currUser?.id}`,
        );
        const data = response?.data?.posts;
        data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPosts(data);
        // console.log(data);
      } catch (error) {
        toast.error("Error fetching posts");
        console.log(error);
      }
    };
    fetchPosts();
  }, [currUser?.id]);
  console.log(posts);

  const handleEditProfile = async () => {
    try {
      if (name && bio) {
        const formdata = {
          username: currUser?.username,
          name: name,
          bio: bio,
        };
        await axios.post(
          `${conf.backendURL}/api/v1/dashboard/updateuser`,
          formdata,
        );
        // console.log(response);

        dispatch(
          editUser({
            type: "update",
            userData: {
              ...userData?.userData,
              name: name,
              bio: bio,
            },
          }),
        );
      } else if (name) {
        const formdata = {
          username: currUser?.username,
          name: name,
        };
        await axios.post(
          `${conf.backendURL}/api/v1/dashboard/updateuser`,
          formdata,
        );
        // console.log(response);

        dispatch(
          editUser({
            type: "update",
            userData: {
              ...userData?.userData,
              name: name,
            },
          }),
        );
      } else if (bio) {
        const formdata = {
          username: currUser?.username,
          bio: bio,
        };
        await axios.post(
          `${conf.backendURL}/api/v1/dashboard/updateuser`,
          formdata,
        );
        // console.log(response);

        dispatch(
          editUser({
            type: "update",
            userData: {
              ...userData?.userData,
              bio: bio,
            },
          }),
        );
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setBio("");
      setName("");
    }
  };

  return (
    <div className="flex flex-col mt-12">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="ml-5 text-md dark:text-slate-200 font-semibold"
                >
                  Edit name
                </label>
                <Input
                  type="text"
                  name="name"
                  className="ml-5 w-[250px] dark:bg-slate-800 dark:text-white items-start text-start"
                  placeholder="Name"
                  defaultValue={currUser?.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h2 className="ml-5 text-gray-200 text-sm dark:text-slate-400">
                  @{currUser?.username}
                </h2>
              </div>
            ) : (
              <div className="flex justify-between mr-24">
                <div className="flex flex-col">
                  <h1 className="ml-5 text-2xl font-semibold dark:text-slate-200">
                    {currUser?.name}
                  </h1>
                  <h2 className="ml-5 text-gray-700 text-sm dark:text-slate-400">
                    @{currUser?.username}
                  </h2>
                </div>
              </div>
            )}
            <div className="mt-2">
              {loading ? (
                <div className="flex flex-col">
                  <label
                    htmlFor="bio"
                    className="ml-5 text-md dark:text-slate-200 font-semibold"
                  >
                    Edit bio
                  </label>
                  <Input
                    type="text"
                    name="bio"
                    className="ml-5 h-[80px] dark:bg-slate-800 dark:text-white items-start text-start w-[350px]"
                    placeholder="Bio"
                    defaultValue={currUser?.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              ) : (
                <p className="text-md ml-5 text-gray-900 font-semibold dark:text-white">
                  {currUser?.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mr-8">
          {userData?.userData?.username === username && (
            <div className="flex gap-2">
              {!loading ? (
                <Button
                  onClick={() => {
                    setLoading(true);
                  }}
                >
                  {loading ? "Save" : "Edit Profile"}
                </Button>
              ) : (
                <Button onClick={handleEditProfile}>Save</Button>
              )}
              {loading && (
                <Button className="" onClick={() => setLoading(false)}>
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* posts section */}
      <div className="py-8 ml-5 flex flex-col">
        <h1 className="text-xl dark:text-slate-300">Posts</h1>
        <div className="flex gap-6 flex-wrap">
          {posts &&
            posts.map((post, index) => (
              <Suspense fallback={<PostcardSkeleton />} key={index}>
                <Postcard key={index} post={post} />
              </Suspense>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profilebody;
