import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { update as editUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";

const Profilebody = ({ user }) => {
  const { username } = useParams();
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = user;
  console.log(userData);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.username === username) {
      setIsAuthor(true);
      return;
    }
  }, [username, userData?.userData, userData?.username]);

  const handleEditProfile = async () => {
    try {
      if (name || bio) {
        const formdata = {
          username: userData?.username,
          name: name && name,
          bio: bio && bio,
        };
        const response = await axios.post(
          "/api/v1/dashboard/updateuser",
          formdata,
        );
        console.log(response);
      }
      dispatch(
        editUser({
          type: "UPDATE_USER_DATA",
          userData: {
            ...userData?.userData,
            name: name && name,
            bio: bio && bio,
          },
        }),
      );
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
              defaultValue={userData?.name}
              onChange={(e) => setName(e.target.value)}
            />
            <h2 className="ml-5 text-gray-700 text-sm">
              @{userData?.username}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="ml-5 text-2xl font-semibold">{userData?.name}</h1>
            <h2 className="ml-5 text-gray-700 text-sm">
              @{userData?.username}
            </h2>
          </div>
        )}

        <div className="mt-4">
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
                defaultValue={userData?.bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          ) : (
            <p className="text-sm">{userData?.bio}</p>
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
  );
};

export default Profilebody;
