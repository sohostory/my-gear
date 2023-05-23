import axios from "axios";
import { useState, useEffect } from "react";

import "./form-select.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const FormSelect = ({
  user,
  label,
  defaultValue,
  onChange,
  name,
  ...otherProps
}) => {
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
      .get(`${serverAddress}/api/select-data/${user.id}/${label}`)
      .then((response) => {
        setSelectData(response.data[0]);
      })
      .catch((error) => {
        console.log("error while getting data");
      });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange({ target: { name: name, value: event.target.value } });
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
