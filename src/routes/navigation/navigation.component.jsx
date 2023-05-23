import { Fragment, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import camera from "../../assets/camera.png";

import "./navigation.styles.scss";

const defaultUser = {
  id: "",
  first_name: "",
  email: "",
};

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      console.log("user from authentication", user);
      navigate("/authentication");
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    setUser(defaultUser);
  };

  const loggedInLinks = (
    <Fragment>
      <Link to="/dashboard/main" className="nav-link">
        DASHBOARD
      </Link>
      <Link to="/account" className="nav-link">
        MY ACCOUNT
      </Link>
      <Link to="/authentication" className="nav-link" onClick={handleSignOut}>
        SIGN OUT
      </Link>
    </Fragment>
  );

  const loggedOUtLinks = (
    <Fragment>
      <Link to="/authentication" className="nav-link">
        SIGN IN
      </Link>
      <Link to="/dashboard/main" className="nav-link">
        DASHBOARD
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navigation">
        <Link to="/dashboard/main" className="logo-container">
          <img src={camera} className="logo" />
        </Link>
        <div className="nav-links-container">
          {user.id ? loggedInLinks : loggedOUtLinks}
        </div>
      </nav>
      <Outlet />

      {/* <footer className="footer">
        <div className="footer__container">
          SOHOSTORY LLC
          <br />
          Dallas, TX
        </div>
      </footer> */}
    </Fragment>
  );
};

export default Navigation;
