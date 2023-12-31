import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Commentbox, Container, Postbox, PostboxSkeleton } from "../components";
import axios from "axios";
import { toast } from "react-toastify";
import conf from "../conf";

const Postpage = () => {
  const { viewPostId } = useParams();
  const [post, setPost] = useState({});
  const [isCommentBox, setIsCommentBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${conf.backendURL}/api/v1/posts/getpost/${viewPostId}`,
        );
        const data = (await response?.data?.post) || {};
        const commentData = (await response?.data?.comments) || [];
        console.log(data);
        // console.log(commentData);
        data.comments = commentData;
        setPost(data);
        // console.log(post);
      } catch (error) {
        toast.error("Error in fetching post");
        console.log(error);
      }
    };
    fetchPost();
    setIsLoading(false);
  }, [viewPostId, isCommentBox]);

  console.log(post);

  return (
    <Container>
      <div className="flex overflow-y-scroll no-scrollbar justify-between max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-4">
        {isLoading ? (
          <PostboxSkeleton />
        ) : (
          <Postbox
            post={post}
            isCommentBox={isCommentBox}
            setIsCommentBox={setIsCommentBox}
            setPost={setPost}
          />
        )}
        {isCommentBox && <Commentbox post={post} setPost={setPost} />}
      </div>
    </Container>
  );
};

export default Postpage;
