import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../form/form-input/form-input.component";
import Button from "../button/button.component";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const ManageList = ({ user }) => {
  const [selectData, setSelectData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const { table } = params;

  const [value, setValue] = useState("");

  useEffect(() => {
    loadSelectData();
  }, [table]);

  const resetFormFields = () => {
    setValue("");
  };

  const loadSelectData = () => {
    axios
      .get(`${serverAddress}/api/select-data/${user.id}/${table}`, {
        user: user,
      })
      .then((response) => {
        setSelectData(response.data[0]);
      })
      .catch((error) => {
        console.log("error while getting data");
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${serverAddress}/api/select-data/${user.id}/${table}`, {
        value: value,
      })
      .then((response) => {
        setErrorMessage("");
        setSuccessMessage("");
        resetFormFields();
        setSuccessMessage("Data updated successfully");
        loadSelectData();
      })
      .catch((error) => {
        console.log("error while getting data");
        setErrorMessage("Error updating data");
      });
  };
  const getHeadings = () => {
    if (selectData.length > 0) {
      return Object.keys(selectData[0]);
    }
    return [];
  };

  return (
    <div className="list-container">
      <h2>Manage Categories</h2>
      <p>Here you can manage your list for your database.</p>
      <div className="list-header">
        <table>
          <thead>
            <tr>
              {getHeadings().map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectData.map((row, index) => {
              return (
                <tr key={index}>
                  {getHeadings().map((key, index) => {
                    return <td key={row[key]}>{row[key]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Add new"
          type="text"
          required
          onChange={handleChange}
          name={table}
          value={value}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="inverted">
            Update Info
          </Button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ManageList;
