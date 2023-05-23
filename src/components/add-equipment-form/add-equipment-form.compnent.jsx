import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../form/form-input/form-input.component";
import FormSelect from "../form/form-select/form-select.component";
import FormDate from "../form/form-date/form-date.component";
import Button from "../button/button.component";

import "./add-equipment-form.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const defaultFormFields = {
  brand_id: "",
  model: "",
  serial_number: "",
  purchase_date: "",
  price: "",
  warranty_expire_date: "",
  store_id: "",
  insurance_id: "",
  type_id: "",
  user_id: "",
};

const AddEquipmentForm = ({ user }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    brand_id,
    model,
    serial_number,
    purchase_date,
    price,
    warranty_expire_date,
    store_id,
    insurance_id,
    type_id,
  } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // setFormFields({ ...formFields, user_id: user.id });
      const updatedFormFields = { ...formFields, user_id: user.id };
      setFormFields(updatedFormFields);
      axios
        .post(`${serverAddress}/api/add-equipment`, formFields)
        .then((data) => {
          resetFormFields();
          setSuccessMessage("Equipment added successfully!");
        });
    } catch (error) {
      console.log("error has occured. please try again");
      setErrorMessage("Error adding equipment: please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value, user_id: user.id });
  };

  const handleCancel = (event) => {
    navigate("/dashboard/main");
  };

  return (
    <div className="add-equipment-container">
      <div className="form-container">
        <h2>Purchased new equipment?</h2>
        <span>Fill out the form below to add</span>

        <form onSubmit={handleSubmit}>
          <FormSelect
            user={user}
            label="Type"
            type="select"
            required
            onChange={handleChange}
            name="type_id"
            value={type_id}
          />
          <FormSelect
            user={user}
            label="Brand"
            type="select"
            required
            onChange={handleChange}
            name="brand_id"
            value={brand_id}
          />
          <FormInput
            label="Model"
            type="text"
            required
            onChange={handleChange}
            name="model"
            value={model}
          />
          <FormInput
            label="Serial Number"
            type="text"
            required
            onChange={handleChange}
            name="serial_number"
            value={serial_number}
          />
          <FormDate
            label="Purchase Date"
            type="date"
            required
            onChange={handleChange}
            name="purchase_date"
            value={purchase_date}
          />
          <FormInput
            label="Purchase Price"
            type="number"
            required
            onChange={handleChange}
            name="price"
            value={price}
          />
          <FormDate
            label="Warranty Expiration Date"
            type="date"
            required
            onChange={handleChange}
            name="warranty_expire_date"
            value={warranty_expire_date}
          />
          <FormSelect
            user={user}
            label="Store"
            type="select"
            required
            onChange={handleChange}
            name="store_id"
            value={store_id}
          />

          <FormSelect
            user={user}
            label="Insurance"
            type="select"
            required
            onChange={handleChange}
            name="insurance_id"
            value={insurance_id}
          />
          <div className="buttons-container">
            <Button type="submit">Add Equpiment</Button>
            <Button type="button" buttonType="inverted" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddEquipmentForm;
