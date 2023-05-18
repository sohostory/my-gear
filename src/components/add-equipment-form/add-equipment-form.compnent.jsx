import { useState } from "react";
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
  warraty_expire_date: "",
  store_id: "",
  insurance_comapny_id: "",
  equipment_type_id: "",
  user_id: "",
};

const AddEquipmentForm = ({ user }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    user_id,
    brand_id,
    model,
    serial_number,
    purchase_date,
    price,
    warraty_expire_date,
    store_id,
    insurance_id,
    type_id,
  } = formFields;

  const navigate = useNavigate();

  // console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios
        .post(`${serverAddress}/api/add-equipment`, formFields)
        .then((data) => {
          console.log("add equipment data", data);
          resetFormFields();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Purchased new equipment?</h2>
      <span>Fill out the form below to add</span>
      <form onSubmit={handleSubmit}>
        <FormSelect
          label="Type"
          type="select"
          required
          onChange={handleChange}
          name="type_id"
          value={type_id}
        />
        <FormSelect
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
          value={warraty_expire_date}
        />
        <FormSelect
          label="Store"
          type="select"
          required
          onChange={handleChange}
          name="store_id"
          value={store_id}
        />

        <FormSelect
          label="Insurance"
          type="select"
          required
          onChange={handleChange}
          name="insurance_id"
          value={insurance_id}
        />

        <Button type="submit">Add Equpiment</Button>
      </form>
    </div>
  );
};

export default AddEquipmentForm;
