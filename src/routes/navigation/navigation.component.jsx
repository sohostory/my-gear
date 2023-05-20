import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import camera from "../../assets/camera.png";

import "./navigation.styles.scss";

const defaultUser = {
  id: "",
  first_name: "",
  email: "",
};

const Navigation = ({ user, setUser }) => {
  const handleSignOut = () => {
    setUser(defaultUser);
  };

  const loggedInLinks = (
    <Fragment>
      <Link to="/dashboard" className="nav-link">
        DASHBOARD
      </Link>
      <Link to="/account" className="nav-link">
        MY ACCOUNT
      </Link>
      <Link to="/" className="nav-link" onClick={handleSignOut}>
        SIGN OUT
      </Link>
    </Fragment>
  );

  const loggedOUtLinks = (
    <Fragment>
      <Link to="/authentication" className="nav-link">
        SIGN IN
      </Link>
      <Link to="/dashboard" className="nav-link">
        DASHBOARD
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navigation">
        <Link to="/" className="logo-container">
          <img src={camera} className="logo" />
        </Link>
        <div className="nav-links-container">
          {user.id ? loggedInLinks : loggedOUtLinks}
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
