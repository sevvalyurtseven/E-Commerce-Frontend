import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../../components/AddressForm";
import {
  fetchAddresses,
  removeAddress,
} from "../../store/actions/shoppingCartActions";
import OrderSummary from "../../components/OrderSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Order() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [activeTab, setActiveTab] = useState("address");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const token = localStorage.getItem("token");

  const resetForm = () => {
    setEditAddressId(null);
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEditClick = (address) => {
    setEditAddressId(address.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (addressId) => {
    dispatch(removeAddress(addressId, token));
  };

  useEffect(() => {
    dispatch(fetchAddresses(token));
  }, [dispatch, token]);

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
    setShowAddresses(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNextClick = () => {
    setActiveTab("payment");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-screen-xl py-10 min-h-full">
      <div className="w-full lg:w-8/12 mx-auto bg-[#fafafa] shadow-lg rounded-lg p-4">
        <div className="flex border-b mb-4 text-xl tracking-widest font-bold">
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "address" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("address")}
          >
            Adres Bilgileri
          </button>
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "payment" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("payment")}
            disabled={!selectedAddress}
          >
            Ödeme Bilgileri
          </button>
        </div>

        {activeTab === "address" && (
          <div className="flex flex-col h-[90%] space-y-4">
            <button
              className="btn bg-blue-500 hover:bg-blue-700 text-white w-full flex-grow shadow-lg rounded-lg text-3xl tracking-widest"
              onClick={() => setShowForm(true)}
            >
              Yeni Adres Ekle <FontAwesomeIcon icon={faPlus} />
            </button>
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
            <button
              className="btn bg-blue-500 hover:bg-blue-700 text-white w-full flex-grow shadow-lg rounded-lg text-3xl tracking-widest"
              onClick={() => setShowAddresses(true)}
            >
              Kayıtlı Adreslerim
            </button>
            {showAddresses && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={() => setShowAddresses(false)}
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-bold mb-4">Kayıtlı Adreslerim</h3>
                  {addresses.length > 0 ? (
                    <ul className="space-y-4">
                      {addresses.map((address) => (
                        <li
                          key={address.id}
                          className={`border p-4 rounded-lg cursor-pointer ${
                            selectedAddress === address.id ? "bg-gray-200" : ""
                          }`}
                          onClick={() => handleAddressSelection(address.id)}
                        >
                          <h4 className="font-bold">{address.title}</h4>
                          <p>
                            {address.name} {address.surname}
                          </p>
                          <p>{address.phone}</p>
                          <p>
                            {address.city}, {address.district},{" "}
                            {address.neighborhood}
                          </p>
                          <p>{address.address}</p>
                          <div className="space-x-2 mt-2">
                            <button
                              onClick={() => handleEditClick(address)}
                              className="btn btn-secondary btn-sm shadow-lg rounded-lg"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteClick(address.id)}
                              className="btn btn-error btn-sm shadow-lg rounded-lg"
                            >
                              Sil
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Kayıtlı adres bulunmamaktadır.</p>
                  )}
                  <button
                    className="btn bg-blue-500 hover:bg-blue-700 text-white w-full mt-4 shadow-lg rounded-lg"
                    onClick={() => {
                      handleAddressSelection(selectedAddress);
                      setShowAddresses(false);
                    }}
                  >
                    Seç
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="btn btn-outline shadow-md rounded-lg text-base tracking-widest w-auto"
                onClick={handleNextClick}
              >
                Next <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Ödeme Bilgileri</h2>
            {selectedAddress ? (
              <p>Ödeme bilgileri formu burada olacak...</p>
            ) : (
              <p>Lütfen önce bir adres seçiniz.</p>
            )}
          </div>
        )}
      </div>
      <div className="w-full lg:w-4/12 px-4 mt-8 lg:mt-0">
        <OrderSummary />
      </div>
    </div>
  );
}

export default Order;
