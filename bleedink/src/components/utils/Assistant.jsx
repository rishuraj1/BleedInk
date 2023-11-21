import React, { useState } from "react";
import Input from "../basics/Input";
import Button from "../basics/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import conf from "../../conf";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { blogster, loadingChat } from "../../assets";

const Assistant = () => {
  const userData = useSelector((state) => state?.auth?.userData?.userData);
  console.log(userData);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [isCopying, setIsCopying] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${conf.backendURL}/api/v1/gpt`, {
        prompt: prompt,
        userId: userData?.id,
        name: userData?.name,
      });
      const data = res.data?.data?.choices[0]?.text;
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  console.log(response);

  return (
    <div className="h-full flex flex-col max-md:w-full bg-gray-300 dark:bg-slate-900 p-2">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-center font-semibold dark:text-slate-400">
          Blogster
        </h1>
        <p className="text-center text-indigo-500">
          Your personal writing assistant
        </p>
      </div>
      <div className="flex justify-between p-4 mt-5 flex-col gap-3">
        <label
          htmlFor="prompt"
          className="font-semibold text-slate-700 dark:text-slate-500"
        >
          Enter your prompt
        </label>
        <textarea
          name="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full dark:bg-slate-800 dark:text-white h-auto px-3 py-1 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline font-semibold text-start flex justify-start items-start"
          placeholder="Prompt"
        />
      </div>
      {/* Submit button */}
      <div className="w-full flex p-4 justify-center items-center">
        {loading ? (
          <Lottie animationData={loadingChat} className="w-20" />
        ) : (
          <Button
            className="w-full flex justify-center items-center"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
      {/* response */}
      {response ? (
        <div className="w-full flex flex-col justify-start items-start p-4 gap-3">
          <label
            htmlFor="response"
            className="font-semibold text-slate-700 dark:text-slate-500"
          >
            Response
          </label>
          <textarea
            name="response"
            type="text"
            value={response}
            className={`w-full dark:bg-slate-800 dark:text-white px-3 py-1 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline font-semibold text-start flex justify-start items-start no-scrollbar ${
              response
                ? "h-[400px] bg-white cursor-pointer pointer-events-auto"
                : "bg-gray-200 h-[400px] cursor-not-allowed pointer-events-none"
            }`}
          />
          <div className={`gap-2 mt-3 ${response ? "flex" : "hidden"}`}>
            <Button
              className={`w-full flex justify-center items-center`}
              onClick={() => {
                navigator.clipboard.writeText(response);
                setIsCopying(true);
                setTimeout(() => {
                  setIsCopying(false);
                }, 1000);
              }}
            >
              {isCopying ? "Copied" : "Copy"}
            </Button>
            <Button
              className="w-full flex justify-center items-center"
              onClick={() => {
                setResponse("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Lottie animationData={blogster} className="w-full h-full" />
          <h2 className="dark:text-slate-300 justify-center items-center font-semibold text-center">
            Hi{" "}
            <span className="text-indigo-500">
              {userData?.name.split(" ")[0]}
            </span>
            , I'm Blogster. I can help you write your blog posts. Just enter a
            prompt and I'll generate a response for you.
          </h2>
        </div>
      )}
    </div>
  );
};

export default Assistant;
