// src/components/LoginForm.js

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import getGravatar from "gravatar-url"; // Gravatar URL'i almak için

import backgroundImage from "../assets/signup/signup.jpg"; // Arka plan resmi
import { setUser, userLogin } from "../store/actions/clientActions";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const loginSubmit = (data) => {
    dispatch(userLogin(data))
      .then((response) => {
        if (response.token) {
          const gravatar = getGravatar(data.email);
          localStorage.setItem("token", response.token);
          dispatch(
            setUser({
              name: response.name,
              email: data.email,
              gravatar: gravatar,
              isLoggedIn: true,
            })
          );
          toast.success("Logged in successfully!");

          history.goBack(); // Önceki sayfaya yönlendirme
        } else {
          throw new Error("Login failed: No token received");
        }
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 py-36">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 blur-[1px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 w-full max-w-sm p-6 space-y-4 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center tracking-wider">Login</h2>
        <form className="tracking-wider" onSubmit={handleSubmit(loginSubmit)}>
          <div className="form-control">
            <label className="label font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              className="input input-bordered"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="label font-semibold">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className=" leading-tight"
              />
              Remember me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn bg-[#c461b2] text-white hover:bg-[#e7a0da] hover:text-[#fafafa] w-full"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 underline">
            Sign up here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
