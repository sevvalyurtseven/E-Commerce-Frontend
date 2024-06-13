import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome } from "@fortawesome/free-solid-svg-icons";

const OrderConfirmation = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 py-36 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-10 rounded-3xl shadow-2xl max-w-lg">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-green-500 text-6xl mb-4"
        />
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Thank you, your order is confirmed!
        </h1>
        <p className="text-lg mb-8 text-center text-gray-600">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <Link
          to="/"
          className="flex items-center justify-center btn bg-[#c461b2] text-white hover:bg-[#e7a0da] hover:text-[#fafafa] w-full py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Return to Home
        </Link>
      </div>
      <div className="absolute bottom-10 text-white text-sm z-10">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-ping"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-ping"></div>
    </div>
  );
};

export default OrderConfirmation;
