import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Login, Logo } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdEmail, MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signup = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/v1/auth/register", data);
      console.log(response);
      dispatch(
        authLogin({
          type: "signup",
          userData: {
            username: response?.data?.data?.username,
            name: response?.data?.data?.name,
            email: response?.data?.data?.email,
            id: response?.data?.data?._id,
            profilePicture: response?.data?.data?.profilePicture || null,
          },
        }),
      );
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
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
        <div className="mb-2 flex flex-col items-center justify-center">
          {/*Logo  */}
          <span className="flex items-center justify-center w-full max-w-[100px]">
            <Logo width="95%" />
          </span>
          <h1 className="text-2xl font-bold text-blue-700">
            BleedINK<span className="font-extrabold text-blue-900">.</span>
          </h1>
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">Sign Up</h2>
        <p className="mt-2 text-center text-base text-black/60">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
        {error && (
          <p className="mt-2 text-center text-base text-red-600">{error}</p>
        )}

        {/* form */}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          {/* Username */}
          <div className="mt-4">
            <Input
              label="Username"
              type="text"
              placeholder="Enter unique username ex: rishu561"
              {...register("username", {
                required: true,
              })}
              icon={<MdAlternateEmail className="text-gray-500 text-xl" />}
              className="w-full"
            />
          </div>

          {/* Name */}
          <div className="mt-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name ex: Rishu Raj"
              {...register("name", {
                required: true,
              })}
              icon={<FaUser className="text-gray-500 text-xl" />}
              className="w-full"
            />
          </div>

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
              {loading ? "Logging in..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
