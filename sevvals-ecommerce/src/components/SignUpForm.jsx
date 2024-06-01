import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import backgroundImage from "../assets/signup/signup.jpg";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const [storeFields, setStoreFields] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Rolleri getir
    // Örnek roller set edilir, GET isteği ile roller alınacak
    setRoles([
      { id: "customer", name: "Customer" },
      { id: "store", name: "Store" },
      { id: "admin", name: "Admin" },
    ]);
  }, []);

  const handleRoleChange = (value) => {
    setStoreFields(value === "store");
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate an API request
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
    }, 2000);
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
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
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
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasNumber: (value) =>
                    /\d/.test(value) || "Password must contain a number",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain a lowercase letter",
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain an uppercase letter",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain a special character",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="input input-bordered"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <span className="text-red-500">
                {errors.passwordConfirm.message}
              </span>
            )}
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
                    {roles.find((role) => role.id === field.value)?.name ||
                      "Select Role"}
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
                      {roles.map((role) => (
                        <li
                          key={role.id}
                          onClick={() => {
                            field.onChange(role.id);
                            handleRoleChange(role.id);
                          }}
                        >
                          <a>{role.name}</a>
                        </li>
                      ))}
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
                {...register("store.name", {
                  required: storeFields ? "Store name is required" : false,
                  minLength: storeFields
                    ? {
                        value: 3,
                        message: "Store name must be at least 3 characters",
                      }
                    : undefined,
                })}
              />
              {errors.store?.name && (
                <span className="text-red-500">
                  {errors.store.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storePhone">
                Store Phone
              </label>
              <input
                id="storePhone"
                className="input input-bordered"
                {...register("store.phone", {
                  required: storeFields ? "Store phone is required" : false,
                  pattern: storeFields
                    ? {
                        value: /^(\+90|0)?5\d{9}$/,
                        message: "Geçerli bir Türkiye telefon numarası girin",
                      }
                    : undefined,
                })}
              />
              {errors.store?.phone && (
                <span className="text-red-500">
                  {errors.store.phone.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storeTaxID">
                Store Tax ID
              </label>
              <input
                id="storeTaxID"
                className="input input-bordered"
                {...register("store.tax_no", {
                  required: storeFields ? "Store tax ID is required" : false,
                  pattern: storeFields
                    ? {
                        value: /^T\d{4}V\d{6}$/,
                        message:
                          "Geçerli bir Vergi Kimlik Numarası girin (TXXXXVXXXXXX formatında)",
                      }
                    : undefined,
                })}
              />
              {errors.store?.tax_no && (
                <span className="text-red-500">
                  {errors.store.tax_no.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="storeBankAccount">
                Store Bank Account
              </label>
              <input
                id="storeBankAccount"
                className="input input-bordered"
                {...register("store.bank_account", {
                  required: storeFields
                    ? "Store bank account is required"
                    : false,
                  pattern: storeFields
                    ? {
                        value: /^TR\d{24}$/,
                        message:
                          "Geçerli bir IBAN girin (TR ile başlayan ve toplam 26 karakter)",
                      }
                    : undefined,
                })}
              />
              {errors.store?.bank_account && (
                <span className="text-red-500">
                  {errors.store.bank_account.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-[#c461b2] text-white hover:bg-[#e7a0da] hover:text-[#fafafa] w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
