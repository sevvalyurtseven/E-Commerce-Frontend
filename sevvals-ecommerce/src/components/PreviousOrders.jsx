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

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">
        Önceki Siparişlerim
      </h1>
      {isFetching ? (
        <p className="text-center text-gray-600">Yükleniyor...</p>
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

            return (
              <Collapsible
                key={order.id}
                trigger={
                  <div
                    className="order-card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 rounded-xl flex justify-between items-center border border-gray-200"
                    onClick={() => handleTriggerClick(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="text-3xl text-purple-500"
                      />
                      <span className="text-xl font-semibold text-gray-800">
                        Sipariş ID: {order.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg text-gray-600">
                        {order.order_date}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-gray-600"
                      />
                    </div>
                  </div>
                }
                open={openOrderId === order.id}
                className="shadow-lg rounded-xl overflow-hidden"
                openedClassName="shadow-2xl rounded-xl overflow-hidden"
              >
                <div className="p-8 bg-white border-t-4 border-purple-500 rounded-b-xl">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                    Sipariş Özeti
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        Adres Bilgileri
                      </h3>
                      {address ? (
                        <>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Başlık:</strong> {address.title}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Ad-Soyad:</strong> {address.name}{" "}
                            {address.surname}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Telefon:</strong> {address.phone}
                          </p>
                          <p className="text-gray-700 mb-2 text-lg">
                            <strong>Şehir, İlçe, Mahalle:</strong>{" "}
                            {address.city}, {address.district},{" "}
                            {address.neighborhood}
                          </p>
                          <p className="text-gray-700 text-lg">
                            <strong>Adres Detayları:</strong> {address.address}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-700 text-lg">
                          Adres bilgisi bulunamadı.
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        Ürünler
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
                              Adet: {item.count}
                            </p>
                          </div>
                          <span className="text-lg text-gray-800">
                            {(item.price * item.count).toFixed(2)} TL
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                      Genel Toplam
                    </h3>
                    <p className="text-gray-700 mb-2 text-lg">
                      <strong>Toplam Tutar:</strong> {order.price} TL
                    </p>
                    {shippingCost > 0 && (
                      <p className="text-gray-700 mb-2 text-lg">
                        <strong>Kargo Ücreti:</strong> {shippingCost} TL
                      </p>
                    )}
                    {discountAmount > 0 && (
                      <p className="text-gray-700 mb-2 text-lg">
                        <strong>İndirim:</strong> -{discountAmount.toFixed(2)}{" "}
                        TL
                      </p>
                    )}
                    <p className="text-gray-700 text-lg">
                      <strong>Genel Toplam:</strong>{" "}
                      {finalTotalPrice.toFixed(2)} TL
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                      Teslimat Zamanı
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <strong>Tahmini Kargo Tarihi:</strong> {shippingDate}
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
