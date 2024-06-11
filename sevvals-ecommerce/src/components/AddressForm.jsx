import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useDispatch } from "react-redux";
import data from "../data.json"; // JSON dosyasını içe aktarın
import {
  createAddress,
  editAddress,
  fetchAddresses,
} from "../store/actions/shoppingCartActions";

function AddressForm({
  isEditing,
  editAddressId,
  setShowForm,
  setIsEditing,
  resetForm,
  initialValues = {},
}) {
  const { register, handleSubmit, setValue, watch, reset, control } = useForm({
    defaultValues: initialValues,
  });
  const dispatch = useDispatch();
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
    resetForm();
  };

  useEffect(() => {
    if (isEditing && initialValues) {
      setValue("addressTitle", initialValues.title);
      setValue("name", initialValues.name);
      setValue("surname", initialValues.surname);
      setValue("phone", initialValues.phone);
      setValue("city", {
        value: initialValues.city,
        label: initialValues.city,
      });
      setValue("district", {
        value: initialValues.district,
        label: initialValues.district,
      });
      setValue("neighborhood", {
        value: initialValues.neighborhood,
        label: initialValues.neighborhood,
      });
      setValue("addressDetails", initialValues.address);
    }
  }, [isEditing, initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Adres Başlığı</label>
        <input
          {...register("addressTitle")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Adres Başlığı"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Ad</label>
        <input
          {...register("name")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Ad"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Soyad</label>
        <input
          {...register("surname")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Soyad"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Telefon</label>
        <input
          {...register("phone")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Telefon"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Şehir</label>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              {...field}
              options={cities}
              placeholder="Şehir seçin"
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">İlçe</label>
        <Controller
          control={control}
          name="district"
          render={({ field }) => (
            <Select
              {...field}
              options={districts}
              placeholder="İlçe seçin"
              isDisabled={!selectedCity}
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Mahalle/Köy</label>
        <Controller
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <Select
              {...field}
              options={neighbourhoods}
              placeholder="Mahalle/Köy seçin"
              isDisabled={!selectedDistrict}
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Adres Detayları</label>
        <textarea
          {...register("addressDetails")}
          className="form-textarea mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Adres Detayları"
        />
      </div>
      <button type="submit" className="btn btn-primary py-2 px-4 text-md">
        {isEditing ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}

export default AddressForm;
