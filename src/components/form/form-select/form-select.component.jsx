import axios from "axios";
import { useState, useEffect } from "react";

import "./form-select.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const FormSelect = ({ label, defaultValue, ...otherProps }) => {
  const [selectData, setSelectData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  console.log("defaultValue", defaultValue);
  useEffect(() => {
    loadSelectData();
  }, []);

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
    console.log("target", event.target.value);
  };

  if (defaultValue) {
    return (
      <div className="group">
        <select
          className="form-select"
          value={defaultValue}
          onChange={handleChange}
        >
          <option value="" disabled hidden className="form-select-label">
            Select {label}
          </option>
          {selectData.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="group">
      <select className="form-select" value="" onChange={handleChange}>
        <option value="" disabled hidden className="form-select-label">
          Select {label}
        </option>
        {selectData.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
