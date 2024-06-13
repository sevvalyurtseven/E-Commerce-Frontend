import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collapsible from "react-collapsible";
import {
  fetchOrders,
  fetchAddresses,
} from "../store/actions/shoppingCartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import {
  format,
  addDays,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";

const PreviousOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.shoppingCart.orders);
  const isFetching = useSelector((state) => state.shoppingCart.isFetching);
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const token = localStorage.getItem("token");
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders(token));
    dispatch(fetchAddresses(token));
  }, [dispatch, token]);

  const getAddressById = (id) => {
    return addresses.find((address) => address.id === id);
  };

  const handleTriggerClick = (orderId) => {
    setOpenOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const calculateShippingCost = (totalPrice) => {
    return totalPrice >= 400 ? 0 : 29.99;
  };

  const calculateShippingDate = (orderDate) => {
    const currentDate = new Date(orderDate);
    let shippingDate;

    if (isThursday(currentDate)) {
      shippingDate = addDays(currentDate, 4); // Orders placed on Thursday are shipped on Monday
    } else if (
      isFriday(currentDate) ||
      isSaturday(currentDate) ||
      isSunday(currentDate)
    ) {
      shippingDate = addDays(currentDate, 3); // Orders placed on Friday, Saturday, or Sunday are shipped on Monday
    } else {
      shippingDate = addDays(currentDate, 2); // Orders placed on other days are shipped 2 days later
    }

    return format(shippingDate, "EEEE, MMMM d");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">
        My Previous Orders
      </h1>
      {isFetching ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const address = getAddressById(order.address_id);
            const shippingCost = calculateShippingCost(order.price);
            const discountThreshold = 1000;
            const discountPercentage = 0.1;
            const discountAmount =
              order.price >= discountThreshold
                ? order.price * discountPercentage
                : 0;
            const finalTotalPrice = order.price + shippingCost - discountAmount;
            const shippingDate = calculateShippingDate(order.order_date);
            const formattedOrderDate = format(
              new Date(order.order_date),
              "dd MMMM yyyy"
            );

            return (
              <Collapsible
                key={order.id}
                trigger={
                  <div
                    className="order-card bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 rounded-lg flex justify-between items-center border border-gray-200"
                    onClick={() => handleTriggerClick(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="text-3xl text-indigo-600"
                      />
                      <span className="text-xl font-semibold text-gray-800">
                        Order ID: {order.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg text-gray-600">
                        {formattedOrderDate}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-gray-600"
                      />
                    </div>
                  </div>
                }
                open={openOrderId === order.id}
                className="shadow-lg rounded-lg overflow-hidden"
                openedClassName="shadow-2xl rounded-lg overflow-hidden"
              >
                <div className="p-8 bg-white border-t-4 border-indigo-600 rounded-b-lg">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                    Order Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        Address Information
                      </h3>
                      {address ? (
                        <>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Title:</strong> {address.title}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Name:</strong> {address.name}{" "}
                            {address.surname}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Phone:</strong> {address.phone}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>City, District, Neighborhood:</strong>{" "}
                            {address.city}, {address.district},{" "}
                            {address.neighborhood}
                          </p>
                          <p className="text-gray-700 text-lg">
                            <strong>Address Details:</strong> {address.address}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-700 text-lg">
                          Address information not found.
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        Products
                      </h3>
                      {order.products.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex items-center justify-between mb-4"
                        >
                          <img
                            src={item.images[0]?.url || "placeholder.jpg"}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded-md shadow-md"
                          />
                          <div className="ml-4 flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.count}
                            </p>
                          </div>
                          <span className="text-lg text-gray-800">
                            {(item.price * item.count).toFixed(2)} TL
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                      Total Amount
                    </h3>
                    <p className="text-gray-700 mb-2 text-lg">
                      <strong>Total Price:</strong> {order.price} TL
                    </p>
                    {shippingCost > 0 && (
                      <p className="text-gray-700 mb-2 text-lg">
                        <strong>Shipping Cost:</strong> {shippingCost} TL
                      </p>
                    )}
                    {discountAmount > 0 && (
                      <p className="text-gray-700 mb-2 text-lg">
                        <strong>Discount:</strong> -{discountAmount.toFixed(2)}{" "}
                        TL
                      </p>
                    )}
                    <p className="text-gray-700 text-lg">
                      <strong>Final Total:</strong> {finalTotalPrice.toFixed(2)}{" "}
                      TL
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                      Delivery Time
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <strong>Estimated Shipping Date:</strong> {shippingDate}
                    </p>
                  </div>
                </div>
              </Collapsible>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreviousOrders;
