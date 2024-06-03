import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../assets/signup/signup.jpg";
import axiosInstance from "../api/api";

// setValue, react-hook-form kütüphanesinin bir fonksiyonudur ve form alanlarının değerlerini programatik olarak ayarlamak için kullanılır. Form bileşenine varsayılan değerleri dinamik olarak atamak veya belirli bir olaydan sonra form alanlarını güncellemek için kullanılabilir.

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({ mode: "onChange" });
  const history = useHistory();
  const [storeFields, setStoreFields] = useState(false); // Mağaza alanlarının gösterilip gösterilmeyeceğini kontrol eder
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown menünün açık olup olmadığını kontrol eder
  const [roles, setRoles] = useState([]); // Roller listesini tutar
  const [isSubmitting, setIsSubmitting] = useState(false); // Formun gönderilip gönderilmediğini kontrol eder

  useEffect(() => {
    // Rolleri getir
    axiosInstance
      .get("/roles")
      .then((response) => {
        setRoles(response.data);
        // Varsayılan rolü "Müşteri" yap
        const customerRole = response.data.find(
          (role) => role.name === "Müşteri"
        );
        if (customerRole) {
          setValue("role_id", customerRole.id);
        }
      })
      .catch((error) => {
        console.error("Roller getirilirken hata oluştu:", error);
      });
  }, [setValue]);

  const handleRoleChange = (roleName) => {
    setStoreFields(roleName === "Mağaza"); // Eğer seçilen rol "Mağaza" ise mağaza alanlarını göster
  };

  const onSubmit = (data, event) => {
    console.log("Form verileri:", data); // Konsola form verilerini yazdır

    // Veriyi sunucunun beklediği formatta düzenle

    let formattedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    };
    // Eğer rol "Magaza" ise mağaza bilgilerini ekle
    if (storeFields) {
      formattedData = {
        ...formattedData,
        store: {
          name: data.store?.name,
          phone: data.store?.phone,
          tax_no: data.store?.tax_no,
          bank_account: data.store?.bank_account,
        },
      };
    }

    console.log("Düzenlenmiş veri:", formattedData); // Konsola düzenlenmiş veriyi yazdır

    setIsSubmitting(true); // Formun gönderildiğini işaretle
    axiosInstance
      .post("/signup", formattedData)
      .then((response) => {
        event.target.reset();
        setIsSubmitting(false); // Formun gönderilme durumunu sıfırla
        history.goBack(); // Bir önceki sayfaya geri dön
        setTimeout(() => {
          toast.success(
            "Please click the link in the email to activate your account!"
          );
        }, 500); // Toastify mesajını 500ms gecikmeli göster
      })
      .catch((error) => {
        console.error("Hata cevabı:", error.response);
        toast.error("An error occurred during the registration process.");
        setIsSubmitting(false); // Formun gönderilme durumunu sıfırla
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdown menüyü aç/kapat
  };

  const closeDropdown = () => {
    setDropdownOpen(false); // Dropdown menüyü kapat
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 py-36">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 blur-[1px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 w-full max-w-sm p-6 space-y-4 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center tracking-wider">
          Sign Up
        </h2>
        <form className="tracking-wider" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
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
            <label className="label font-semibold" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm your password"
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
            <label className="label font-semibold" htmlFor="role_id">
              Role
            </label>
            <Controller
              control={control}
              name="role_id"
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
                            handleRoleChange(role.name);
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
              <label className="label font-semibold" htmlFor="storeName">
                Store Name
              </label>
              <input
                id="storeName"
                placeholder="Enter store name"
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
              <label className="label font-semibold" htmlFor="storePhone">
                Store Phone
              </label>
              <input
                id="storePhone"
                placeholder="Enter store phone number"
                className="input input-bordered"
                {...register("store.phone", {
                  required: storeFields ? "Store phone is required" : false,
                  pattern: storeFields
                    ? {
                        value: /^(\+90|0)?5\d{9}$/,
                        message: "Enter a valid Turkish phone number",
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
              <label className="label font-semibold" htmlFor="storeTaxID">
                Store Tax ID
              </label>
              <input
                id="storeTaxID"
                placeholder="Enter store tax ID"
                className="input input-bordered"
                {...register("store.tax_no", {
                  required: storeFields ? "Store tax ID is required" : false,
                  pattern: storeFields
                    ? {
                        value: /^T\d{4}V\d{6}$/,
                        message:
                          "Enter a valid Tax ID (in the format TXXXXVXXXXXX)",
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
              <label className="label font-semibold" htmlFor="storeBankAccount">
                Store Bank Account
              </label>
              <input
                id="storeBankAccount"
                placeholder="Enter store bank account"
                className="input input-bordered"
                {...register("store.bank_account", {
                  required: storeFields
                    ? "Store bank account is required"
                    : false,
                  pattern: storeFields
                    ? {
                        value: /^TR\d{24}$/,
                        message:
                          "Enter a valid IBAN (starting with TR and 26 characters long)",
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
            disabled={!isValid || isSubmitting}
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
