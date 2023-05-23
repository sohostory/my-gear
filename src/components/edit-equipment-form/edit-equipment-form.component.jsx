import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../form/form-input/form-input.component";
import FormSelect from "../form/form-select/form-select.component";
import FormDate from "../form/form-date/form-date.component";
import Button from "../button/button.component";

import "./edit-equipment-form.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const EditEquipmentForm = ({ user }) => {
  const params = useParams();
  const { serial } = params;
  const [equipmentData, setEquipmentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    type,
    brand,
    model,
    serial_number,
    price,
    depreciation,
    date,
    warranty,
    store,
    insurance,
  } = equipmentData;

  const navigate = useNavigate();

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const loadEquipmentData = () => {
    axios
      .get(`${serverAddress}/api/equipment/serial/${serial}`)
      .then((response) => {
        setEquipmentData(response.data[0][0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error while getting data");
        setErrorMessage("Failed to load equipment data.");
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${serverAddress}/api/equipment/serial/${serial}`, equipmentData)
      .then((response) => {
        setSuccessMessage("Equipment successfully updated.");
        navigate("/dashboard/main");
      })
      .catch((error) => {
        setErrorMessage("Failed to update equipment.");
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`${serverAddress}/api/delete-equipment/serial/${serial}`, {})
      .then((response) => {
        console.log("response", response);
        setSuccessMessage("Equipment has been deleted.");
        navigate("/dashboard/main");
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage("Failed to delete equipment.");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEquipmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-equipment-container">
      <div className="form-container">
        <h2>Edit Equipment</h2>
        <form onSubmit={handleSubmit}>
          <FormSelect
            user={user}
            label="Type"
            type="select"
            required
            onChange={handleChange}
            name="type_id"
            value={type}
            defaultValue={type}
          />
          <FormSelect
            user={user}
            label="Brand"
            type="select"
            required
            onChange={handleChange}
            name="brand_id"
            value={brand}
            defaultValue={brand}
          />

          <FormInput
            label="Model"
            type="text"
            required
            onChange={handleChange}
            name="model"
            value={model}
            defaultValue={model}
          />
          <FormInput
            label="Serial Number"
            type="text"
            required
            onChange={handleChange}
            name="serial_number"
            value={serial_number}
            defaultValue={serial_number}
          />
          <FormInput
            label="Price"
            type="number"
            required
            onChange={handleChange}
            name="price"
            value={price}
            defaultValue={price}
          />
          <FormInput
            label="Depreciation Rate"
            type="number"
            min={0}
            max={1}
            step={0.01}
            required
            onChange={handleChange}
            name="depreciation"
            value={depreciation}
            defaultValue={depreciation}
          />
          <FormDate
            label="Purchase Date"
            type="date"
            required
            onChange={handleChange}
            name="date"
            value={date}
            defaultValue={date}
          />
          <FormDate
            label="Warranty Expiration Date"
            type="date"
            required
            onChange={handleChange}
            name="warranty"
            value={warranty}
            defaultValue={warranty}
          />
          <FormSelect
            user={user}
            label="Store"
            type="select"
            required
            onChange={handleChange}
            name="store_id"
            value={store}
            defaultValue={store}
          />
          <FormSelect
            user={user}
            label="Insurance"
            type="select"
            required
            onChange={handleChange}
            name="insurance_id"
            value={insurance}
            defaultValue={insurance}
          />
          <div className="buttons-container">
            <Button type="submit" buttonType="inverted">
              Update Info
            </Button>
            <Button type="button" onClick={handleDelete}>
              Delete Equipment
            </Button>
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EditEquipmentForm;
