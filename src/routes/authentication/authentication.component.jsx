import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = ({ user, setUser }) => {
  return (
    <div className="authentication-container">
      <SignInForm user={user} setUser={setUser} />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
