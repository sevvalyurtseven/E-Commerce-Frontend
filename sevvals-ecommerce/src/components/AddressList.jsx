import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import data from "../data.json"; // JSON dosyasını içe aktarın
import {
  createAddress,
  editAddress,
  fetchAddresses,
  removeAddress,
} from "../store/actions/shoppingCartActions";
import OrderSummary from "./OrderSummary";

const AddressForm = () => {
  const { register, handleSubmit, setValue, watch, reset, control } = useForm();
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.shoppingCart.addresses);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  const selectedCity = watch("city");
  const selectedDistrict = watch("district");

  useEffect(() => {
    const uniqueCities = [];
    data.forEach((item) => {
      if (!uniqueCities.includes(item.il)) {
        uniqueCities.push(item.il);
      }
    });
    setCities(uniqueCities.map((city) => ({ value: city, label: city })));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const cityData = data.filter((item) => item.il === selectedCity.value);
      const uniqueDistricts = [];
      cityData.forEach((item) => {
        if (!uniqueDistricts.includes(item.ilce)) {
          uniqueDistricts.push(item.ilce);
        }
      });
      setDistricts(
        uniqueDistricts.map((district) => ({
          value: district,
          label: district,
        }))
      );
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtData = data.filter(
        (item) =>
          item.ilce === selectedDistrict.value && item.il === selectedCity.value
      );
      const uniqueNeighbourhoods = districtData.map((item) => item.mahalle_koy);
      setNeighbourhoods(
        uniqueNeighbourhoods.map((neighbourhood) => ({
          value: neighbourhood,
          label: neighbourhood,
        }))
      );
    }
  }, [selectedDistrict, selectedCity]);

  const token = localStorage.getItem("token");

  const onSubmit = (formData) => {
    const addressData = {
      address: formData.addressDetails,
      city: formData.city.value,
      district: formData.district.value,
      name: formData.name,
      surname: formData.surname,
      neighborhood: formData.neighborhood.value,
      phone: formData.phone,
      title: formData.addressTitle,
    };
    if (isEditing) {
      addressData.id = editAddressId;
      dispatch(editAddress(addressData, token));
    } else {
      dispatch(createAddress(addressData, token));
    }
    reset();
    setShowForm(false);
    setIsEditing(false);
    dispatch(fetchAddresses(token));
  };

  const handleEditClick = (address) => {
    setEditAddressId(address.id);
    setValue("addressTitle", address.title);
    setValue("name", address.name);
    setValue("surname", address.surname);
    setValue("phone", address.phone);
    setValue("city", { value: address.city, label: address.city });
    setValue("district", { value: address.district, label: address.district });
    setValue("neighborhood", {
      value: address.neighborhood,
      label: address.neighborhood,
    });
    setValue("addressDetails", address.address);
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

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-screen-xl py-10">
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
          showForm ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? "Adres Güncelle" : "Adres Ekle"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Adres Başlığı"
              {...register("addressTitle", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="İsim"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Soyisim"
              {...register("surname", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Telefon"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            <div className="form-control">
              <label className="label">
                <span className="label-text">İl</span>
              </label>
              <Select
                options={cities}
                {...register("city", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">İlçe</span>
              </label>
              <Select
                options={districts}
                {...register("district", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mahalle</span>
              </label>
              <Select
                options={neighbourhoods}
                {...register("neighborhood", { required: true })}
              />
            </div>
            <textarea
              placeholder="Adres"
              {...register("addressDetails", { required: true })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              {isEditing ? "Güncelle" : "Ekle"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-secondary w-full"
            >
              Kapat
            </button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        {!showPayment ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Adres Bilgileri</h2>
            <button
              className="btn btn-primary mb-4"
              onClick={() => setShowForm(true)}
            >
              Adres Ekle
            </button>
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
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowPayment(true)}
              disabled={!selectedAddress}
            >
              Next
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Ödeme Bilgileri</h2>
            <p>Ödeme bilgileri formu burada olacak...</p>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => setShowPayment(false)}
            >
              Geri
            </button>
          </div>
        )}
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <OrderSummary />
      </div>
    </div>
  );
};

export default AddressForm;
