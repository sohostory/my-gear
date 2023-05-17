import { useState } from "react";
import axios from "axios";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ user, setUser }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("button pushed");
    try {
      axios
        .post("http://localhost:4000/api/signin", formFields)
        .then((data) => {
          console.log("data", data.data[0]);
          const loggedUser = data.data[0];
          setUser(loggedUser);
          // user.id = loggedUser.id;
          // user.first_name = loggedUser.first_name;
          // user.email = loggedUser.email;
          console.log(user);
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
