import { useState, useEffect } from "react";
import axios from "axios";

import "./my-account.styles.scss";

import FormInput from "../../components/form/form-input/form-input.component";
import Button from "../../components/button/button.component";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const defaultFormFields = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const EditMyAccountForm = ({ user, setUser }) => {
  const [userData, setUserData] = useState({});
  const [id, setId] = useState(user.id);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let { email, first_name, password, newPassword, confirmPassword } = userData;

  const resetFormFields = () => {
    setUserData({ ...user, ...defaultFormFields });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    axios
      .get(`${serverAddress}/api/user/${user.id}`)
      .then((response) => {
        setUserData(response.data[0][0]);
      })
      .catch((error) => {
        setErrorMessage("Failed to get account info.");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("passwords does not match");
      return;
    }

    try {
      const updatedUserData = { ...userData, id };
      axios
        .put(`${serverAddress}/api/user/update`, updatedUserData)
        .then((data) => {
          const signedInUser = data.data;
          setUser(signedInUser);
          setSuccessMessage("Your account successfully updated.");
          resetFormFields();
        });
    } catch (error) {
      setErrorMessage("Failed to update account. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      <span>Update your name, email, and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          type="text"
          required
          onChange={handleChange}
          name="first_name"
          value={first_name}
          defaultValue={first_name}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="New Password"
          type="password"
          required
          onChange={handleChange}
          name="newPassword"
          value={newPassword}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit" buttonType="inverted">
          Update Account
        </Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditMyAccountForm;
