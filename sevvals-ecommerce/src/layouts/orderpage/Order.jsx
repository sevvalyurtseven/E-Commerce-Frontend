import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; // useHistory'yi ekleyin
import AddressForm from "../../components/AddressForm";
import PaymentMethods from "../../components/PaymentMethods";
import {
  fetchAddresses,
  removeAddress,
  createAddress,
  createOrder,
} from "../../store/actions/shoppingCartActions";
import OrderSummary from "../../components/OrderSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Order() {
  const dispatch = useDispatch();
  const history = useHistory();
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const selectedPaymentMethod = useSelector(
    (state) => state.shoppingCart.selectedPaymentMethod
  );
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("address");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const token = localStorage.getItem("token");

  // Formu sıfırlama işlevi
  const resetForm = () => {
    setEditAddressId(null);
    setShowForm(false);
    setIsEditing(false);
  };

  // Adresi düzenleme işlevi
  const handleEditClick = (address) => {
    setEditAddressId(address.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Adresi silme işlevi
  const handleDeleteClick = (addressId) => {
    dispatch(removeAddress(addressId, token));
  };

  // Adres ekleme işlevi
  const handleAddAddress = (address) => {
    dispatch(createAddress(address, token)).then(() => {
      dispatch(fetchAddresses(token));
    });
  };

  // Sayfa yüklendiğinde adresleri fetch etme
  useEffect(() => {
    dispatch(fetchAddresses(token));
  }, [dispatch, token]);

  // Adres seçimi işlevi
  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
  };

  // Sekme tıklama işlevi
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // İleri düğmesi tıklama işlevi
  const handleNextClick = () => {
    setActiveTab("payment");
  };

  const handleCreateOrder = () => {
    // Sipariş verisi oluşturuluyor. Bu veri sunucuya gönderilecek.
    const orderData = {
      // Seçilen adresin ID'si
      address_id: selectedAddress,
      // Sipariş tarihi, ISO formatında
      order_date: new Date().toISOString(),
      // Seçilen ödeme kartının numarası
      card_no: selectedPaymentMethod.card_no,
      // Kart üzerindeki isim
      card_name: selectedPaymentMethod.name_on_card,
      // Kartın son kullanma ayı
      card_expire_month: selectedPaymentMethod.expire_month,
      // Kartın son kullanma yılı
      card_expire_year: selectedPaymentMethod.expire_year,
      // Kartın güvenlik kodu
      card_ccv: selectedPaymentMethod.ccv, // Bu bilginin mevcut olduğunu varsayıyoruz
      // Toplam fiyat
      price: totalPrice,
      // Sepetteki ürünler, her bir ürünün ID'si, miktarı ve detayı ile birlikte
      products: cartItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.detail, // Bu bilginin mevcut olduğunu varsayıyoruz
      })),
    };

    // createOrder thunk action'ını çağırarak sipariş oluşturma isteği yapılıyor.
    // Bu işlem, orderData ve token ile gerçekleştiriliyor.
    dispatch(createOrder(orderData, token)).then(() => {
      history.push("/order-confirmation"); // Sipariş oluşturulduktan sonra yönlendirme
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-screen-xl py-10 min-h-full">
      <div className="w-full lg:w-8/12 mx-auto bg-[#fafafa] shadow-lg rounded-lg p-4">
        <div className="flex border-b mb-4 text-xl tracking-widest font-bold">
          {/* Adres Bilgileri sekmesi */}
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "address" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("address")}
          >
            Address Information
          </button>
          {/* Ödeme Bilgileri sekmesi */}
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "payment" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("payment")}
            disabled={!selectedAddress} // Adres seçilmediyse devre dışı
          >
            Payment Information
          </button>
        </div>

        {activeTab === "address" && (
          <div className="flex flex-col h-[90%] space-y-4">
            {/* Adres Bilgileri Açıklaması */}
            <p className="text-lg mb-4 tracking-wider">
              You can enter/select your address information below to{" "}
              <span className="font-bold">secure and accurate delivery.</span>
            </p>
            {/* Kayıtlı Adresler Listesi ve Yeni Adres Ekle Düğmesi */}
            <div className="flex flex-wrap gap-4 tracking-wider text-lg max-h-[400px] overflow-y-auto">
              <div
                className="credit-card add-card p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center flex-col transition-transform transform hover:scale-105"
                onClick={() => setShowForm(true)}
                style={{
                  minWidth: "370px",
                  minHeight: "270px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="3x" />
                <span className="text-2xl font-bold text-gray-700 tracking-wider mt-4">
                  Add New Address
                </span>
              </div>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border p-4 rounded-lg shadow-lg cursor-pointer flex flex-col justify-between transition-transform transform hover:scale-105 ${
                    selectedAddress === address.id
                      ? "bg-blue-200 border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{
                    minWidth: "370px",
                    minHeight: "270px",
                    width: "370px",
                  }}
                  onClick={() => handleAddressSelection(address.id)}
                >
                  <h4 className="font-bold truncate">{address.title}</h4>
                  <p className="truncate">
                    {address.name} {address.surname}
                  </p>
                  <p className="truncate">{address.phone}</p>
                  <p className="truncate">
                    {address.city}, {address.district}, {address.neighborhood}
                  </p>
                  <p className="truncate">{address.address}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleEditClick(address)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address.id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={() => setShowForm(false)}
                  >
                    &times;
                  </button>
                  <AddressForm
                    isEditing={isEditing}
                    editAddressId={editAddressId}
                    setShowForm={setShowForm}
                    setIsEditing={setIsEditing}
                    resetForm={resetForm}
                    onSubmit={handleAddAddress} // onSubmit işlevini ekleyin
                    initialValues={
                      isEditing
                        ? addresses.find(
                            (address) => address.id === editAddressId
                          )
                        : {}
                    }
                  />
                </div>
              </div>
            )}
            {/* İleri Düğmesi */}
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-outline shadow-md rounded-lg text-base tracking-widest w-auto"
                onClick={handleNextClick}
                disabled={!selectedAddress} // Adres seçilmediyse buton devre dışı
              >
                Next <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div>
            <p className="text-lg mb-4 tracking-wider">
              You can safely make your payment with a bank/credit{" "}
              <span className="font-bold">card or a shopping loan.</span>
            </p>
            <PaymentMethods />
          </div>
        )}
      </div>
      <div className="w-full lg:w-4/12 px-4 mt-8 lg:mt-0">
        <OrderSummary handleCreateOrder={handleCreateOrder} />
      </div>
    </div>
  );
}

export default Order;
