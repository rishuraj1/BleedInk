import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Postcard } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);
  const [posts, setPosts] = useState([]);
  const getPublicPosts = async () => {
    try {
      const response = await axios.get("/api/v1/posts/getposts");
      console.log(response);
      const data = response?.data?.posts;
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

  console.log(userName);

  return (
    <Container className="">
      {/* top */}
      <div className="flex justify-start items-start">
        <h1 className="font-semibold text-4xl">
          Welcome <span className="text-indigo-500">{userName}</span> !
        </h1>
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
