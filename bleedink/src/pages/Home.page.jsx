import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Postcard } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import conf from "../conf";

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  // console.log(userData);
  const [posts, setPosts] = useState([]);
  const getPublicPosts = async () => {
    try {
      const response = await axios.get(
        `${conf.backendURL}/api/v1/posts/getposts`,
      );
      // console.log(response);
      const data = response?.data?.posts;
      // set posts by createdAt
      data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getPublicPosts();
  }, [userData]);

  const userName = userData
    ? userData?.name?.split(" ")[0] || userData?.name
    : "Guest";

  // console.log(userName);

  return (
    <Container className="">
      {/* top */}
      <div className="flex justify-start items-end gap-6">
        <h1 className="font-semibold text-4xl dark:text-slate-100">
          Welcome <span className="text-indigo-500">{userName}</span> !
        </h1>
        <h3 className="text-center font-semibold dark:text-slate-400">
          See newer posts here
        </h3>
      </div>
      {/* posts */}
      <div className="flex gap-4 flex-wrap">
        {posts &&
          posts.map((post, index) => <Postcard key={index} post={post} />)}
      </div>
    </Container>
  );
};

export default HomePage;
