import React from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-36">
      <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
