// src/components/OrderConfirmation.js
import React from "react";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4">
        Thank you, your order is confirmed!
      </h1>
      <p className="text-lg mb-8">
        Your order has been successfully placed. We appreciate your business!
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}

export default OrderConfirmation;
