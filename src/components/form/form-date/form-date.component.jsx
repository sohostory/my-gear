import axios from "axios";
// import { useState, useEffect } from "react";

import "./form-date.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Ensure month and day are two digits
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const FormDate = ({ label, ...otherProps }) => {
  //   const [selectData, setSelectData] = useState([]);

  //   useEffect(() => {
  //     loadSelectData();
  //   }, []);

  return (
    <div className="group">
      <input
        className="form-date"
        type="date"
        {...otherProps}
        value={getCurrentDate()}
      />
      {label && (
        <label
          className={`${otherProps.value ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormDate;
