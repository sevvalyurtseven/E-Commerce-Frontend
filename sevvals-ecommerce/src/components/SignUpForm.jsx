import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import backgroundImage from "../assets/signup/signup.jpg";

const SignUpForm = () => {
  const { register, handleSubmit, control } = useForm();
  const [storeFields, setStoreFields] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoleChange = (e) => {
    setStoreFields(e.target.value === "store");
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 py-36">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 blur-[1px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 w-full max-w-sm p-6 space-y-4 bg-white shadow-xl rounded-xl">
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
          <div className="form-control">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered"
              {...register("password")}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="input input-bordered"
              {...register("passwordConfirm")}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="role_id">
              Role
            </label>
            <Controller
              control={control}
              name="role_id"
              defaultValue="customer"
              render={({ field }) => (
                <div className="relative w-full">
                  <button
                    type="button"
                    className="btn btn-outline hover:bg-[#c461b2] hover:text-[#fafafa] w-full flex justify-between items-center"
                    onClick={toggleDropdown}
                  >
                    {field.value === "customer"
                      ? "Customer"
                      : field.value === "store"
                      ? "Store"
                      : "Admin"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <ul
                      className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-1 z-20"
                      onClick={closeDropdown}
                    >
                      <li
                        onClick={() => {
                          field.onChange("customer");
                          handleRoleChange({ target: { value: "customer" } });
                        }}
                      >
                        <a>Customer</a>
                      </li>
                      <li
                        onClick={() => {
                          field.onChange("store");
                          handleRoleChange({ target: { value: "store" } });
                        }}
                      >
                        <a>Store</a>
                      </li>
                      <li
                        onClick={() => {
                          field.onChange("admin");
                          handleRoleChange({ target: { value: "admin" } });
                        }}
                      >
                        <a>Admin</a>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              storeFields
                ? "max-h-screen opacity-100 mb-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="form-control">
              <label className="label" htmlFor="storeName">
                Store Name
              </label>
              <input
                id="storeName"
                className="input input-bordered"
                {...register("store.name")}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storePhone">
                Store Phone
              </label>
              <input
                id="storePhone"
                className="input input-bordered"
                {...register("store.phone")}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storeTaxID">
                Store Tax ID
              </label>
              <input
                id="storeTaxID"
                className="input input-bordered"
                {...register("store.tax_no")}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storeBankAccount">
                Store Bank Account
              </label>
              <input
                id="storeBankAccount"
                className="input input-bordered"
                {...register("store.bank_account")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-[#c461b2] text-white hover:bg-[#e7a0da] hover:text-[#fafafa] w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
