import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { update as editUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Postcard } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";

const Profilebody = ({ user }) => {
  const { username } = useParams();
  const { userData } = useSelector((state) => state?.auth);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(false);
  const currUser = user || userData?.userData;
  console.log(currUser);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [posts, setPosts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currUser?.username === username) {
      setIsAuthor(true);
      return;
    }
  }, [username, currUser?.currUser, currUser?.username]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/api/v1/posts/getposts/${currUser?.id}`,
        );
        const data = response?.data?.posts;
        setPosts(data);
        console.log(data);
      } catch (error) {
        toast.error("Error fetching posts");
        console.log(error);
      }
    };
    fetchPosts();
  }, [currUser]);

  const handleEditProfile = async () => {
    try {
      if (name && bio) {
        const formdata = {
          username: currUser?.username,
          name: name,
          bio: bio,
        };
        await axios.post("/api/v1/dashboard/updateuser", formdata);
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
        await axios.post("/api/v1/dashboard/updateuser", formdata);
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
        await axios.post("/api/v1/dashboard/updateuser", formdata);
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
        <div className="flex flex-col">
          {loading ? (
            <div className="flex flex-col">
              <label htmlFor="name" className="ml-5 text-md font-semibold">
                Edit name
              </label>
              <Input
                type="text"
                name="name"
                className="ml-5 w-[250px]"
                placeholder="Name"
                defaultValue={currUser?.name}
                onChange={(e) => setName(e.target.value)}
              />
              <h2 className="ml-5 text-gray-700 text-sm">
                @{currUser?.username}
              </h2>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="ml-5 text-2xl font-semibold">{currUser?.name}</h1>
              <h2 className="ml-5 text-gray-700 text-sm">
                @{currUser?.username}
              </h2>
            </div>
          )}

          <div className="mt-2">
            {loading ? (
              <div className="flex flex-col">
                <label htmlFor="bio" className="ml-5 text-md font-semibold">
                  Edit bio
                </label>
                <Input
                  type="text"
                  name="bio"
                  className="ml-5 h-[80px] items-start text-start w-[350px]"
                  placeholder="Bio"
                  defaultValue={currUser?.bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            ) : (
              <p className="text-md ml-5 text-gray-900">{currUser?.bio}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col mr-8">
          {isAuthor ? (
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
                <Button
                  className="bg-white text-gray-900 hover:bg-gray-500"
                  onClick={() => setLoading(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          ) : (
            <Button className="bg-gray-200 text-gray-700">Follow</Button>
          )}
        </div>
      </div>

      {/* posts section */}
      <div className="py-8 ml-5 flex flex-col">
        <h1 className="text-xl">My Posts</h1>
        <div className="flex gap-6 flex-wrap">
          {posts &&
            posts.map((post, index) => <Postcard key={index} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Profilebody;
