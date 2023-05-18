import axios from "axios";
import { useState, useEffect } from "react";

import "./form-select.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const FormSelect = ({ label, ...otherProps }) => {
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    loadSelectData();
  }, []);

  const loadSelectData = () => {
    axios.get(`${serverAddress}/api/select-data/${label}`).then((response) => {
      setSelectData(response.data[0]);
      console.log(response.data[0]);
    });
  };

  return (
    <div className="group">
      <select className="form-select" {...otherProps}>
        <option value="" diabled hidden className="form-select-label">
          Select {label}
        </option>
        {selectData.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {/* {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-select-label`}
        >
          {label}
        </label>
      )} */}
    </div>
  );
};

export default FormSelect;
