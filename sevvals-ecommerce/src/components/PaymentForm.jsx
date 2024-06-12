import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentMethod,
  editPaymentMethod,
} from "../store/actions/shoppingCartActions";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function PaymentForm({ isEditing, editPaymentMethodId, setShowForm }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const paymentMethods = useSelector(
    (state) => state.shoppingCart.paymentMethods
  );

  useEffect(() => {
    // Düzenleme modunda ödeme yöntemi verilerini ayarlamak için
    if (isEditing && editPaymentMethodId) {
      const method = paymentMethods.find((pm) => pm.id === editPaymentMethodId);
      if (method) {
        setValue("card_no", method.card_no);
        setValue("expire_month", method.expire_month);
        setValue("expire_year", method.expire_year);
        setValue("name_on_card", method.name_on_card);
      }
    }
  }, [isEditing, editPaymentMethodId, paymentMethods, setValue]);

  const onSubmit = (data) => {
    if (isEditing) {
      // Düzenleme işlemi için dispatch çağrısı
      dispatch(editPaymentMethod({ ...data, id: editPaymentMethodId }, token));
    } else {
      // Yeni ödeme yöntemi eklemek için dispatch çağrısı
      dispatch(createPaymentMethod(data, token));
    }
    setShowForm(false);
  };

  const card_no = watch("card_no") || "";
  const expire_month = watch("expire_month") || "";
  const expire_year = watch("expire_year") || "";
  const name_on_card = watch("name_on_card") || "";

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <Cards
        cvc=""
        expiry={`${expire_month}/${expire_year}`}
        focused=""
        name={name_on_card}
        number={card_no}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            {...register("card_no", {
              required: "Card number is required",
              minLength: {
                value: 16,
                message: "Card number must be 16 digits",
              },
              maxLength: {
                value: 16,
                message: "Card number must be 16 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Card number must be numeric",
              },
            })}
            className={`input input-bordered w-full ${
              errors.card_no ? "border-red-500" : ""
            }`}
            inputMode="numeric"
          />
          {errors.card_no && (
            <span className="text-red-500 text-sm">
              {errors.card_no.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Expiration Date
          </label>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <input
                type="text"
                {...register("expire_month", {
                  required: "Month is required",
                  minLength: {
                    value: 2,
                    message: "Month must be 2 digits",
                  },
                  maxLength: {
                    value: 2,
                    message: "Month must be 2 digits",
                  },
                  pattern: {
                    value: /^(0[1-9]|1[0-2])$/,
                    message: "Month must be between 01 and 12",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.expire_month ? "border-red-500" : ""
                }`}
                placeholder="MM"
                inputMode="numeric"
              />
              {errors.expire_month && (
                <span className="text-red-500 text-sm">
                  {errors.expire_month.message}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                {...register("expire_year", {
                  required: "Year is required",
                  minLength: {
                    value: 2,
                    message: "Year must be 2 digits",
                  },
                  maxLength: {
                    value: 2,
                    message: "Year must be 2 digits",
                  },
                  pattern: {
                    value: /^[0-9]{2}$/,
                    message: "Year must be numeric",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.expire_year ? "border-red-500" : ""
                }`}
                placeholder="YY"
                inputMode="numeric"
              />
              {errors.expire_year && (
                <span className="text-red-500 text-sm">
                  {errors.expire_year.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            {...register("name_on_card", {
              required: "Name on card is required",
            })}
            className={`input input-bordered w-full ${
              errors.name_on_card ? "border-red-500" : ""
            }`}
          />
          {errors.name_on_card && (
            <span className="text-red-500 text-sm">
              {errors.name_on_card.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full py-2 font-semibold"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
