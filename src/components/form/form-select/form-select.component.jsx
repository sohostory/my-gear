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

        // if (defaultValue) {
        //   const defaultOption = response.data[0].find(
        //     (option) => option.name == defaultValue
        //   );
        //   if (defaultOption) {
        //     setSelectedValue(defaultOption.name);
        //   }
        // }
      })
      .catch((error) => {
        console.log("error while getting data", error);
      });
  };

  // useEffect(() => {
  //   if (defaultValue && selectData.length) {
  //     const defaultOption = selectData.find(
  //       (option) => option.id === defaultValue
  //     );

  //     if (defaultOption) {
  //       setSelectedValue(defaultOption.id);
  //     }
  //   }
  // }, [defaultValue, selectData]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
