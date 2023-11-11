import React, { useState } from "react";
import { Button, Imagebox, Input, Textarea } from "../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { MdTextSnippet } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidImageAdd } from "react-icons/bi";

const CreatePost = () => {
  const { register, handleSubmit, setValue, control, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const submit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-8 items-center max-md:flex-col max-md:px-2 flex justify-around px-4 gap-3">
      <form onSubmit={handleSubmit(submit)} className="gap-4 flex flex-col">
        <Input
          label="Title"
          className="w-full"
          placeholder="Title"
          {...register("title", { required: true })}
          icon={<MdTextSnippet className="text-xl text-slate-700" />}
        />
        <div className="flex justify-between gap-3">
          <Input
            type="file"
            label="Thumbnail"
            className="w-[100px]"
            placeholder="Image"
            {...register("thumbnail", { required: true })}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            icon={<BiSolidImageAdd className="text-xl text-slate-700" />}
          />
          {imagePreview && (
            <div className="flex flex-col">
              <AiFillCloseCircle
                title="Remove image"
                className="text-xl text-red-500 hover:text-red-600 cursor-pointer ease-in-out"
                onClick={() => {
                  setImagePreview(null);
                  setValue("image", null);
                }}
              />
              <img
                src={imagePreview}
                alt="Selected thumbnail"
                className="w-full h-24 object-cover cursor-pointer ease-in-out rounded-sm border-indigo-500 hover:border-indigo-700 border-2"
                title="Click to view full size"
                onClick={() => {
                  const fullSizeImage = new Image();
                  fullSizeImage.src = imagePreview;
                  const fullSizeWindow = window.open("");
                  fullSizeWindow.document.write(fullSizeImage.outerHTML);
                }}
              />
            </div>
          )}
        </div>
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
      <Imagebox />
    </div>
  );
};

export default CreatePost;
