import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import FormInput from "../form/form-input/form-input.component";
import FormSelect from "../form/form-select/form-select.component";
import FormDate from "../form/form-date/form-date.component";
import Button from "../button/button.component";

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

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const loadEquipmentData = () => {
    axios
      .get(`${serverAddress}/api/equipment/serial/${serial}`)
      .then((response) => {
        console.log("response", response.data[0][0]);
        setEquipmentData(response.data[0][0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error while getting data", error);
        setErrorMessage("Failed to load equipment data.");
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${serverAddress}/api/equipment/serial/${serial}`, {})
      .then((response) => {
        console.log("response", response);
        setSuccessMessage("Equipment successfully updated.");
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage("Failed to update equipment.");
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
    <div>
      <h3>Edit Equipment</h3>
      <form onSubmit={handleSubmit}>
        <FormSelect
          label="Type"
          type="select"
          required
          onChange={handleChange}
          name="type_id"
          value={type}
          defaultValue={type}
        />
        <Button type="submit">Submit</Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditEquipmentForm;
