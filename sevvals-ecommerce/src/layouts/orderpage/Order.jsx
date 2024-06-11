import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../../components/AddressForm";
import {
  fetchAddresses,
  removeAddress,
} from "../../store/actions/shoppingCartActions";
import OrderSummary from "../../components/OrderSummary";

function Order() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-screen-xl py-10">
      <div className="w-full lg:w-8/12 mx-auto bg-white shadow-lg rounded-lg p-4">
        <div className="flex border-b mb-4">
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
          <div>
            <h2 className="text-2xl font-bold mb-4">Adres Bilgileri</h2>
            <button
              className="btn btn-primary mb-4"
              onClick={() => setShowForm(true)}
            >
              Adres Ekle
            </button>
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
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
            <h3 className="text-xl font-bold mt-8">Kayıtlı Adresler</h3>
            <ul className="space-y-4">
              {addresses.map((address) => (
                <li
                  key={address.id}
                  className={`border p-4 rounded-lg ${
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
                    {address.city}, {address.district}, {address.neighborhood}
                  </p>
                  <p>{address.address}</p>
                  <div className="space-x-2 mt-2">
                    <button
                      onClick={() => handleEditClick(address)}
                      className="btn btn-secondary btn-sm"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address.id)}
                      className="btn btn-error btn-sm"
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
