import React, { useState } from "react";
import { Button, Imagebox, Input, Textarea } from "../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { MdTextSnippet } from "react-icons/md";

const CreatePost = () => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm();
  const [loading, setLoading] = useState(false);

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
