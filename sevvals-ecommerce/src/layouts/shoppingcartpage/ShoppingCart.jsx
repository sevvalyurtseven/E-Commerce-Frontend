import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTruck } from "@fortawesome/free-solid-svg-icons";

import {
  format,
  addDays,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  toggleItemSelection,
} from "../../store/actions/shoppingCartActions";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleToggleSelection = (productId) => {
    dispatch(toggleItemSelection(productId));
  };

  const calculateTotalPrice = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0)
      .toFixed(2);
  };

  const calculateShippingDate = () => {
    const currentDate = new Date();
    let shippingDate;

    if (isThursday(currentDate)) {
      shippingDate = addDays(currentDate, 4); // Perşembe günü verilen siparişler pazartesi kargoya verilir
    } else if (
      isFriday(currentDate) ||
      isSaturday(currentDate) ||
      isSunday(currentDate)
    ) {
      shippingDate = addDays(currentDate, 3); // Cuma, cumartesi veya pazar günü verilen siparişler pazartesi kargoya verilir
    } else {
      shippingDate = addDays(currentDate, 2); // Diğer günlerde 2 gün sonra kargoya verilir
    }

    return format(shippingDate, "EEEE, MMMM d");
  };

  const totalPrice = calculateTotalPrice();
  const estimatedShippingTime = calculateShippingDate();

  if (isMobile) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className={`flex flex-col md:flex-row items-center justify-between border-b py-2 ${
                item.checked ? "" : "opacity-50"
              }`}
            >
              <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleSelection(item.product.id)}
                  className="checkbox checkbox-success mr-2"
                />
                <img
                  src={item.product.images[0].url} // Use product.images[0].url if product image is not available
                  alt={item.product.name}
                  className="w-20 object-contain rounded-md"
                />
                <div className="ml-4" style={{ minWidth: "200px" }}>
                  <h4 className="text-lg font-bold truncate">
                    {item.product.name}
                  </h4>
                  <p className="line-clamp-2 w-full">
                    {item.product.description}
                  </p>
                  <div className="flex items-center mt-2 text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                    <span>Shipping Time: {estimatedShippingTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-auto md:flex-row items-center justify-between">
                <div className="flex items-center justify-between w-full mb-4 md:mb-0 md:w-auto">
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-outline text-sky-500 btn-sm"
                      onClick={() => handleDecrease(item.product.id)}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="btn btn-outline text-sky-500 btn-sm"
                      onClick={() => handleIncrease(item.product.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold whitespace-nowrap">
                      {(item.product.price * item.count).toFixed(2)} TL
                    </p>
                    <button
                      className="btn  btn-sm"
                      onClick={() => handleRemove(item.product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Total: {totalPrice} TL</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className={`flex flex-col md:flex-row items-center justify-between border-b py-2 ${
                item.checked ? "" : "opacity-50"
              }`}
            >
              <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleSelection(item.product.id)}
                  className="checkbox checkbox-success mr-2"
                />
                <img
                  src={item.product.images[0].url} // Use product.images[0].url if product image is not available
                  alt={item.product.name}
                  className="w-20 object-contain rounded-md"
                />
                <div className="ml-4" style={{ minWidth: "200px" }}>
                  <h4 className="text-lg font-bold truncate">
                    {item.product.name}
                  </h4>
                  <p className="line-clamp-2 w-full">
                    {item.product.description}
                  </p>
                  <div className="flex items-center mt-2 text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                    <span>Shipping Time: {estimatedShippingTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full md:w-32 justify-center mb-4 md:mb-0">
                <button
                  className="btn btn-outline text-sky-500 btn-sm"
                  onClick={() => handleDecrease(item.product.id)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="btn btn-outline text-sky-500 btn-sm"
                  onClick={() => handleIncrease(item.product.id)}
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-2 w-full md:w-40 justify-end">
                <p className="font-bold whitespace-nowrap">
                  {(item.product.price * item.count).toFixed(2)} TL
                </p>
                <button
                  className="btn  btn-sm"
                  onClick={() => handleRemove(item.product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Total: {totalPrice} TL</h3>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
