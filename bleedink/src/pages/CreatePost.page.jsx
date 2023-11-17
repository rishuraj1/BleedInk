import React, { useEffect, useState } from "react";
import { Assistant, Button, Input, Textarea } from "../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { update as updateState } from "../store/authSlice";
import { MdTextSnippet } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { register, handleSubmit, setValue, control, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const userId = useSelector((state) => state?.auth?.userData?.userData?.id);
  // console.log(userId);

  const submit = async (data) => {
    setLoading(true);
    // console.log(data);
    try {
      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("title", data.title);
      formData.set("content", data.content);
      formData.set("thumbnail", data.thumbnail[0]);
      const response = await fetch("/api/v1/posts/create", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-5 justify-between h-full items-center p-4">
      <div className="h-full bg-slate-300 p-2 rounded-sm w-[65%]">
        <form onSubmit={handleSubmit(submit)} className="gap-4 flex flex-col">
          <Input
            label="Title"
            className="w-full"
            name="title"
            placeholder="Title"
            {...register("title", { required: true })}
            icon={<MdTextSnippet className="text-xl text-slate-700" />}
          />
          <Input
            type="file"
            label="Thumbnail"
            className="w-[250px]"
            name="thumbnail"
            {...register("thumbnail", { required: true })}
            icon={<BiSolidImageAdd className="text-xl text-slate-700" />}
            onChange={(e) => {
              setImagePreview(e.target.files[0]);
            }}
          />
          {imagePreview && (
            <div className="flex flex-col">
              <AiFillCloseCircle
                title="Remove image"
                className="text-xl text-red-500 hover:text-red-600 cursor-pointer ease-in-out"
                onClick={() => {
                  setImagePreview(null);
                  setValue("thumbnail", null);
                }}
              />
              <img
                src={URL.createObjectURL(imagePreview)}
                alt="Selected thumbnail"
                className="w-full h-24 object-cover cursor-pointer ease-in-out rounded-sm border-indigo-500 hover:border-indigo-700 border-2"
                title="Click to view full size"
                onClick={() => {
                  const fullSizeImage = new Image();
                  fullSizeImage.src = URL.createObjectURL(imagePreview);
                  const fullSizeWindow = window.open("");
                  fullSizeWindow.document.write(fullSizeImage.outerHTML);
                }}
              />
            </div>
          )}
          <Textarea
            control={control}
            name="content"
            label="Content"
            defaultVal={getValues("content")}
          />
          <Button className="w-[100px]" type="submit">
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
      <Assistant />
    </div>
  );
};

export default CreatePost;
