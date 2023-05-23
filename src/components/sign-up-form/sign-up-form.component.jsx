import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../form/form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const defaultFormFields = {
  first_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ user, setUser }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { first_name, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      console.log("redirecting to dashboard");
      navigate("/dashboard/add-equipment");
    }
  }, [user.id, navigate]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      axios.post(`${serverAddress}/api/register`, formFields).then((data) => {
        // console.log("data", data);
        const signedUpUser = data.data[0];
        setUser(signedUpUser);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          type="text"
          required
          onChange={handleChange}
          name="first_name"
          value={first_name}
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
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
