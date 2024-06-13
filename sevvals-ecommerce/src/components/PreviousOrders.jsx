import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collapsible from "react-collapsible";
import ReactPaginate from "react-paginate";
import {
  fetchOrders,
  fetchAddresses,
} from "../store/actions/shoppingCartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faShoppingBag,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { format, getMonth, getYear } from "date-fns";
import { useHistory } from "react-router-dom";

const PreviousOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.shoppingCart.orders);
  const isFetching = useSelector((state) => state.shoppingCart.isFetching);
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const token = localStorage.getItem("token");
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
  const [openOrderId, setOpenOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 7;
  const history = useHistory();

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

  const handleMonthClick = (month) => {
    setSelectedMonth(month === selectedMonth ? null : month);
    setOpenOrderId(null); // Clear the open order when switching months
    setCurrentPage(0); // Reset to first page when switching months
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const ordersByMonth = months.map((month, index) => {
    return {
      month,
      orders: orders.filter(
        (order) =>
          getMonth(new Date(order.order_date)) === index &&
          getYear(new Date(order.order_date)) === new Date().getFullYear()
      ),
    };
  });

  const displayOrders =
    selectedMonth !== null
      ? ordersByMonth[selectedMonth].orders.slice(
          currentPage * ordersPerPage,
          (currentPage + 1) * ordersPerPage
        )
      : [];

  const pageCount =
    selectedMonth !== null
      ? Math.ceil(ordersByMonth[selectedMonth].orders.length / ordersPerPage)
      : 0;

  return (
    <div className="flex min-h-screen bg-gray-50 p-10">
      {/* Sol Panel */}
      <div className="w-1/4 bg-blue-200 p-6 min-h-screen shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 tracking-wider text-gray-800 text-center">
          Order History
        </h2>
        <div className="flex flex-col space-y-4">
          {ordersByMonth.map(({ month, orders }, index) => (
            <div key={month}>
              <button
                onClick={() => handleMonthClick(index)}
                className={`w-full text-center py-3 rounded-lg tracking-wider ${
                  selectedMonth === index
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800"
                } hover:bg-indigo-400 transition-colors duration-200`}
              >
                {month}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel */}
      <div className="w-3/4 p-8 bg-gray-100 min-h-screen flex flex-col justify-between rounded-lg shadow-lg ml-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wider">
            My Previous Orders
          </h1>
          {isFetching ? (
            <p className="text-center text-gray-600 tracking-wider">
              Loading...
            </p>
          ) : (
            <div className="space-y-8">
              {selectedMonth !== null && displayOrders.length > 0 ? (
                displayOrders.map((order) => {
                  const address = getAddressById(order.address_id);
                  const shippingCost = order.price >= 400 ? 0 : 29.99;
                  const discountThreshold = 1000;
                  const discountPercentage = 0.1;
                  const discountAmount =
                    order.price >= discountThreshold
                      ? order.price * discountPercentage
                      : 0;
                  const finalTotalPrice =
                    order.price + shippingCost - discountAmount;
                  const formattedOrderDate = format(
                    new Date(order.order_date),
                    "dd MMMM yyyy"
                  );

                  return (
                    <Collapsible
                      key={order.id}
                      trigger={
                        <div className="order-card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 rounded-lg flex justify-between items-center border border-gray-300 tracking-wider">
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
                      onOpening={() => handleTriggerClick(order.id)}
                      onClosing={() => handleTriggerClick(null)}
                      className="shadow-lg rounded-lg overflow-hidden"
                      openedClassName="shadow-2xl rounded-lg overflow-hidden"
                    >
                      <div className="p-8 bg-white border-t-4 border-indigo-600 rounded-b-lg">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center tracking-wider">
                          Order Summary
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 tracking-wider">
                              Address Information
                            </h3>
                            {address ? (
                              <>
                                <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    Title:
                                  </strong>{" "}
                                  {address.title}
                                </p>
                                <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    Name:
                                  </strong>{" "}
                                  {address.name} {address.surname}
                                </p>
                                <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    Phone:
                                  </strong>{" "}
                                  {address.phone}
                                </p>
                                <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    City:
                                  </strong>{" "}
                                  {address.city}
                                </p>
                                <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    District:
                                  </strong>{" "}
                                  {address.district}
                                </p>
                                <p className="text-gray-700 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    Neighborhood:
                                  </strong>{" "}
                                  {address.neighborhood}
                                </p>
                                <p className="text-gray-700 text-lg tracking-wider">
                                  <strong className="text-gray-900">
                                    Address Details:
                                  </strong>{" "}
                                  {address.address}
                                </p>
                              </>
                            ) : (
                              <p className="text-gray-700 text-lg tracking-wider">
                                Address information not found.
                              </p>
                            )}
                          </div>
                          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 tracking-wider">
                              Products
                            </h3>
                            <div className="max-h-48 overflow-y-auto">
                              {order.products.map((item) => (
                                <div
                                  key={item.product_id}
                                  className="flex items-center justify-between mb-4"
                                >
                                  <img
                                    src={
                                      item.images[0]?.url || "placeholder.jpg"
                                    }
                                    alt={item.name}
                                    className="w-16 h-16 object-contain rounded-md shadow-md"
                                  />
                                  <div className="ml-4 flex flex-col">
                                    <h4 className="text-lg font-semibold text-gray-900 tracking-wider">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 tracking-wider">
                                      Quantity: {item.count}
                                    </p>
                                  </div>
                                  <span className="text-lg text-gray-900 tracking-wider">
                                    {(item.price * item.count).toFixed(2)} TL
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 tracking-wider">
                              Total Amount
                            </h3>
                            <p className="text-gray-700 mb-2 text-lg tracking-wider">
                              <strong className="text-gray-900">
                                Total Price:
                              </strong>{" "}
                              {order.price} TL
                            </p>
                            {shippingCost > 0 && (
                              <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                <strong className="text-gray-900">
                                  Shipping Cost:
                                </strong>{" "}
                                {shippingCost} TL
                              </p>
                            )}
                            {discountAmount > 0 && (
                              <p className="text-gray-700 mb-2 text-lg tracking-wider">
                                <strong className="text-gray-900">
                                  Discount:
                                </strong>{" "}
                                -{discountAmount.toFixed(2)} TL
                              </p>
                            )}
                            <p className="text-gray-700 text-lg tracking-wider">
                              <strong className="text-gray-900">
                                Final Total:
                              </strong>{" "}
                              {finalTotalPrice.toFixed(2)} TL
                            </p>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 tracking-wider">
                              Delivery Time
                            </h3>
                            <p className="text-gray-700 text-lg tracking-wider">
                              <strong className="text-gray-900">
                                Shipping Date:
                              </strong>{" "}
                              {format(
                                new Date(order.order_date),
                                "dd MMMM yyyy"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Collapsible>
                  );
                })
              ) : (
                <p className="text-center text-gray-700 text-xl font-semibold tracking-wider mt-10">
                  No order history for this month.
                </p>
              )}
              {selectedMonth !== null && displayOrders.length > 0 && (
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName={"flex justify-center mt-8"}
                  pageClassName={"mx-2"}
                  pageLinkClassName={"text-gray-800 hover:text-gray-600"}
                  previousLinkClassName={"text-gray-800 hover:text-gray-600"}
                  nextLinkClassName={"text-gray-800 hover:text-gray-600"}
                  activeClassName={"text-indigo-600 font-bold"}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition-colors duration-200"
            onClick={() => history.push("/")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousOrders;
