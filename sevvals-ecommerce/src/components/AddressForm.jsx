import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useDispatch } from "react-redux";
import data from "../data.json"; // Import JSON data
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
        <label className="block text-gray-700 text-md">Address Title</label>
        <input
          {...register("addressTitle")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Address Title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">First Name</label>
        <input
          {...register("name")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="First Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Last Name</label>
        <input
          {...register("surname")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Last Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Phone</label>
        <input
          {...register("phone")}
          className="form-input mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Phone"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">City</label>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              {...field}
              options={cities}
              placeholder="Select City"
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">District</label>
        <Controller
          control={control}
          name="district"
          render={({ field }) => (
            <Select
              {...field}
              options={districts}
              placeholder="Select District"
              isDisabled={!selectedCity}
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">
          Neighborhood/Village
        </label>
        <Controller
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <Select
              {...field}
              options={neighbourhoods}
              placeholder="Select Neighborhood/Village"
              isDisabled={!selectedDistrict}
              className="border border-gray-300 rounded"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md">Address Details</label>
        <textarea
          {...register("addressDetails")}
          className="form-textarea mt-1 block w-full p-2 text-md border border-gray-300 rounded"
          placeholder="Address Details"
        />
      </div>
      <button type="submit" className="btn btn-primary py-2 px-4 text-md">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AddressForm;
