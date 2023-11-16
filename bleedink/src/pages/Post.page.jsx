import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Commentbox, Container, Postbox } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

const Postpage = () => {
  const { viewPostId } = useParams();
  const [post, setPost] = useState({});
  const [isCommentBox, setIsCommentBox] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/v1/posts/getpost/${viewPostId}`);
      const data = (await response?.data?.post) || {};
      console.log(data);
      setTimeout(() => {
        setPost(data);
      }, 1000);
      console.log(post);
    } catch (error) {
      toast.error("Error in fetching post");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [viewPostId]);

  console.log(post);

  return (
    <Container>
      <div className="flex justify-between max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-4">
        <Postbox
          post={post}
          isCommentBox={isCommentBox}
          setIsCommentBox={setIsCommentBox}
        />
        {isCommentBox && <Commentbox post={post} />}
      </div>
    </Container>
  );
};

export default Postpage;
