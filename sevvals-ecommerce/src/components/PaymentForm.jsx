import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentMethod,
  editPaymentMethod,
} from "../store/actions/shoppingCartActions";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css"; // Doğru dosya yolunu kullanarak

function PaymentForm({ isEditing, editPaymentMethodId, setShowForm }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const paymentMethods = useSelector(
    (state) => state.shoppingCart.paymentMethods
  );

  useEffect(() => {
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
      dispatch(editPaymentMethod({ ...data, id: editPaymentMethodId }, token));
    } else {
      dispatch(createPaymentMethod(data, token));
    }
    setShowForm(false);
  };

  const card_no = watch("card_no") || "";
  const expire_month = watch("expire_month") || "";
  const expire_year = watch("expire_year") || "";
  const name_on_card = watch("name_on_card") || "";

  return (
    <div>
      <Cards
        cvc=""
        expiry={`${expire_month}/${expire_year}`}
        focused=""
        name={name_on_card}
        number={card_no}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Kart Numarası</label>
          <input
            type="text"
            {...register("card_no")}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Son Kullanma Tarihi</label>
          <div className="flex space-x-2">
            <input
              type="number"
              {...register("expire_month")}
              required
              className="input input-bordered w-1/2"
              placeholder="Ay"
            />
            <input
              type="number"
              {...register("expire_year")}
              required
              className="input input-bordered w-1/2"
              placeholder="Yıl"
            />
          </div>
        </div>
        <div>
          <label>Kart Üzerindeki İsim</label>
          <input
            type="text"
            {...register("name_on_card")}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          {isEditing ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
