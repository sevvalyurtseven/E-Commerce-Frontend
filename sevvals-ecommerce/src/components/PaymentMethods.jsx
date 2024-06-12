import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PaymentForm from "./PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  fetchPaymentMethods,
  removePaymentMethod,
  selectPaymentMethod,
} from "../store/actions/shoppingCartActions";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css"; // Doğru dosya yolunu kullanarak

function PaymentMethods() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const paymentMethods = useSelector(
    (state) => state.shoppingCart.paymentMethods
  );
  const selectedPaymentMethod = useSelector(
    (state) => state.shoppingCart.selectedPaymentMethod
  );
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPaymentMethodId, setEditPaymentMethodId] = useState(null);

  useEffect(() => {
    dispatch(fetchPaymentMethods(token));
  }, [dispatch, token]);

  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditPaymentMethodId(id);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(removePaymentMethod(id, token));
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setEditPaymentMethodId(null);
    setShowForm(true);
  };

  const handleCardSelect = (id) => {
    dispatch(selectPaymentMethod(id));
  };

  return (
    <div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <PaymentForm
              isEditing={isEditing}
              editPaymentMethodId={editPaymentMethodId}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 tracking-wider text-lg">
        <div
          className="credit-card add-card p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center flex-col"
          onClick={handleAddNewClick}
          style={{
            minWidth: "350px",
            minHeight: "250px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="3x" />
          <span className="text-2xl font-bold text-gray-700 tracking-wider mt-4">
            Add a New Card
          </span>
        </div>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`credit-card p-4 rounded-lg shadow-lg cursor-pointer border ${
              selectedPaymentMethod === method.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => handleCardSelect(method.id)}
            style={{
              minWidth: "350px",
              minHeight: "250px",
              position: "relative",
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <Cards
                cvc=""
                expiry={`${method.expire_month}/${method.expire_year}`}
                focused=""
                name={method.name_on_card}
                number={method.card_no}
              />
              <div className="flex justify-end space-x-2 mt-4 absolute bottom-2 right-2">
                <button
                  onClick={() => handleEditClick(method.id)}
                  className="btn btn-primary btn-sm"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteClick(method.id)}
                  className="btn btn-error btn-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
