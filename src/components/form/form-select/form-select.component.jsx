import axios from "axios";
import { useState, useEffect } from "react";

import "./form-select.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const FormSelect = ({ label, defaultValue, onChange, name, ...otherProps }) => {
  // console.log("defaultValue", defaultValue);
  const [selectData, setSelectData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  useEffect(() => {
    loadSelectData();
  }, []);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const loadSelectData = () => {
    axios
      .get(`${serverAddress}/api/select-data/${label}`)
      .then((response) => {
        setSelectData(response.data[0]);
        console.log("response", response.data[0]);
      })
      .catch((error) => {
        console.log("error while getting data", error);
      });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("event change select", selectedValue);
    onChange({ target: { name: name, value: event.target.value } });
    // console.log("target", event.target.value);
    // console.log("selectedValue after handle", selectedValue);
  };

  return (
    <div className="group">
      <select
        className="form-select"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" disabled hidden className="form-select-label">
          Select {label}
        </option>
        {selectData.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
