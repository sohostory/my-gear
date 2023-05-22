import { useEffect, useState } from "react";
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
  const { id, email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("button pushed");

    axios
      .post(`${serverAddress}/api/signin`, formFields)
      .then((data) => {
        const logedInUser = data.data[0];
        setUser(logedInUser);

        if (logedInUser.id) {
          navigate("/dashboard/main");
        } else {
          console.log("error logging in");
        }
      })
      .catch((error) => {
        alert("Invalid email or password");
        console.log("error signing in", error);
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
          <Button type="submit">Sign In</Button>
          {/* <Button type="button" buttonType="google" onClick={handleChange}>
            Google sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
