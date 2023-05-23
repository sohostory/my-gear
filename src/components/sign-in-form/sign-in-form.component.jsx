import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../form/form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const defaultFormFields = {
  id: "",
  email: "",
  password: "",
};

const SignInForm = ({ user, setUser }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post(`${serverAddress}/api/signin`, formFields)
      .then((data) => {
        const logedInUser = data.data[0];
        setUser(logedInUser);

        if (logedInUser.id) {
          navigate("/dashboard/main");
          resetFormFields();
        } else {
          console.log("error logging in");
        }
      })
      .catch((error) => {
        alert("Invalid email or password");
        console.log("error signing in");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit" onClick={handleSubmit}>
            Sign In
          </Button>
          {/* <Button type="button" buttonType="google" onClick={handleChange}>
            Google sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
