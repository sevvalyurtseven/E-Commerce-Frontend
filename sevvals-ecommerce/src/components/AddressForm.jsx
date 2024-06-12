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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Address Title
        </label>
        <input
          {...register("addressTitle", {
            required: "Address title is required",
          })}
          className={`form-input mt-1 block w-full p-2 text-sm border border-gray-300 rounded ${
            errors.addressTitle ? "border-red-500" : ""
          }`}
          placeholder="Address Title"
        />
        {errors.addressTitle && (
          <span className="text-red-500 text-sm">
            {errors.addressTitle.message}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          First Name
        </label>
        <input
          {...register("name", { required: "First name is required" })}
          className={`form-input mt-1 block w-full p-2 text-sm border border-gray-300 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="First Name"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Last Name
        </label>
        <input
          {...register("surname", { required: "Last name is required" })}
          className={`form-input mt-1 block w-full p-2 text-sm border border-gray-300 rounded ${
            errors.surname ? "border-red-500" : ""
          }`}
          placeholder="Last Name"
        />
        {errors.surname && (
          <span className="text-red-500 text-sm">{errors.surname.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Phone
        </label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          className={`form-input mt-1 block w-full p-2 text-sm border border-gray-300 rounded ${
            errors.phone ? "border-red-500" : ""
          }`}
          placeholder="Phone"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          City
        </label>
        <Controller
          control={control}
          name="city"
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={cities}
              placeholder="Select City"
              className={`border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded mt-1`}
            />
          )}
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          District
        </label>
        <Controller
          control={control}
          name="district"
          rules={{ required: "District is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={districts}
              placeholder="Select District"
              isDisabled={!selectedCity}
              className={`border ${
                errors.district ? "border-red-500" : "border-gray-300"
              } rounded mt-1`}
            />
          )}
        />
        {errors.district && (
          <span className="text-red-500 text-sm">
            {errors.district.message}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Neighborhood/Village
        </label>
        <Controller
          control={control}
          name="neighborhood"
          rules={{ required: "Neighborhood/Village is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={neighbourhoods}
              placeholder="Select Neighborhood/Village"
              isDisabled={!selectedDistrict}
              className={`border ${
                errors.neighborhood ? "border-red-500" : "border-gray-300"
              } rounded mt-1`}
            />
          )}
        />
        {errors.neighborhood && (
          <span className="text-red-500 text-sm">
            {errors.neighborhood.message}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          Address Details
        </label>
        <textarea
          {...register("addressDetails", {
            required: "Address details are required",
          })}
          className={`form-textarea mt-1 block w-full p-2 text-sm border border-gray-300 rounded ${
            errors.addressDetails ? "border-red-500" : ""
          }`}
          placeholder="Address Details"
        />
        {errors.addressDetails && (
          <span className="text-red-500 text-sm">
            {errors.addressDetails.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full py-2 text-sm font-semibold"
      >
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AddressForm;
