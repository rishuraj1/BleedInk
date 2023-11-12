import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import conf from "../../conf";
import { jwtDecode } from "jwt-decode";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    // console.log(data);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/v1/auth/login", data);
      console.log(response);
      const userData = {
        name: response?.data?.data?.fullname,
        email: response?.data?.data?.email,
        id: response?.data?.data?._id,
        profilePicture: response?.data?.data?.profilePicture || null,
        username: response?.data?.data?.username,
        coverImage: response?.data?.data?.coverImage || null,
        posts: response?.data?.data?.posts || [],
        followers: response?.data?.data?.followers || [],
        following: response?.data?.data?.following || [],
        bio: response?.data?.data?.bio || null,
      };
      dispatch(
        authLogin({
          type: "login",
          userData,
        }),
      );
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      // console.log(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}
      >
        <div className="mb-2 flex-col items-center flex justify-center">
          {/*Logo  */}
          <span className="flex justify-center w-full max-w-[100px]">
            <Logo width="95%" />
          </span>
          <h1 className="text-2xl font-bold text-blue-700">
            BleedINK<span className="font-extrabold text-blue-900">.</span>
          </h1>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          <span className="text-gray-500">Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-2 text-center text-base text-red-600">{error}</p>
        )}

        {/* form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          {/* Email */}
          <div className="mt-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email must include @";
                  }
                  return true;
                },
              })}
              icon={<MdEmail className="text-gray-500 text-xl" />}
              className="w-full"
            />
          </div>

          {/* password */}
          <div className="mt-4 relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
              icon={<RiLockPasswordFill className="text-gray-500 text-xl" />}
              className="w-full"
            />
            {
              // show hide password
              showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-gray-500 text-[23px] cursor-pointer absolute right-2 pl-1 top-[38px] text-center flex items-center"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="text-gray-500 text-[23px] cursor-pointer absolute right-2 pl-1 top-[38px] text-center flex items-center"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          </div>
          {/* Submit button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-base text-black/60">
          <span className="text-gray-500">Forgot your password? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Reset Password
          </Link>
        </p>

        <div className="flex flex-col gap-4 mt-4 justify-center items-center">
          <p className="text-gray-500">Or login with</p>
          <div className="flex justify-center gap-6">
            <FaGoogle className="text-2xl hover:text-[#DB4437] text-gray-700 hover:scale-110 ease-in-out duration-150 transition-all mt-2" />
            <GrFacebook className="text-2xl hover:text-[#4267B2] text-gray-700 hover:scale-110 ease-in-out duration-150 transition-all mt-2" />
            <RiTwitterXFill className="text-2xl hover:scale-110 text-gray-700 hover:text-black ease-in-out duration-150 transition-all mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
