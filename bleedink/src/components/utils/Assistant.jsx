import React, { useState } from "react";
import Input from "../basics/Input";
import Button from "../basics/Button";

const Assistant = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  return (
    <div className="h-full flex flex-col w-[35%] bg-gray-300 p-2">
      <div className="flex flex-col gap-3">
        <h1 className="text-center font-semibold">Blogster</h1>
        <p className="text-center text-indigo-500">
          Your personal writing assistant
        </p>
      </div>
      <div className="flex justify-between p-4 mt-5 flex-col gap-3">
        <label htmlFor="prompt" className="font-semibold text-slate-700">
          Enter your prompt
        </label>
        <textarea
          name="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-auto px-3 py-1 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline font-semibold text-start flex justify-start items-start"
          placeholder="Prompt"
        />
      </div>
      {/* Submit button */}
      <div className="w-full flex p-4">
        <Button className="w-full flex justify-center items-center">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
      {/* response */}
      <div className="w-full flex flex-col justify-start items-start p-4 gap-3">
        <label htmlFor="response" className="font-semibold text-slate-700">
          Response
        </label>
        <textarea
          name="response"
          type="text"
          value={response}
          className={`w-full px-3 py-1 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline font-semibold text-start flex justify-start items-start ${
            response
              ? "h-auto"
              : "bg-gray-200 h-[300px] cursor-not-allowed pointer-events-none"
          }`}
        />
        <div className={`gap-2 mt-3 ${response ? "flex" : "hidden"}`}>
          <Button className={`w-full flex justify-center items-center`}>
            Copy
          </Button>
          <Button className="w-full flex justify-center items-center">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
