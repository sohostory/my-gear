import "./register.styles.scss";

const Register = () => {
  const onNameChange = (event) => {
    console.log(event.target.value);
  };
  const onEmailChange = (event) => {
    console.log(event.target.value);
  };

  const onPasswordChange = (event) => {
    console.log(event.target.value);
  };

  const onSubmitSignIn = () => {
    console.log("click");
  };

  return (
    <article className="register-container">
      <main className="login-container">
        <div className="register-wrapper">
          <form id="sign_up">
            <span className="form-title">Welcome</span>
            <div className="input-container">
              <label htmlFor="email-address">Email</label>
              <input
                className="input"
                type="text"
                name="name"
                id="0name"
                onChange={onNameChange}
              />
              <input
                className="input"
                type="email"
                name="email-address"
                id="0email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                id="0password"
                onChange={onPasswordChange}
              />
            </div>
          </form>
          <div>
            <input type="submit" value="Sign in" onClick={onSubmitSignIn} />
          </div>
          <div>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
