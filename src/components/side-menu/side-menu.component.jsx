import { Outlet } from "react-router-dom";
import { Fragment } from "react";

import "./side-menu.styles.scss";
const SideMenu = () => {
  return (
    <div className="dashboard">
      <aside className="aside-menu">
        <div className="side-menu__header">
          {/* <div className="side-menu__header__logo">
          <img src={logo} alt="logo" />
        </div> */}
          <div className="side-menu__header__title">
            <h3>Options</h3>
          </div>
        </div>
        <div className="side-menu__body">
          <ul>
            <li>
              <a href="/dashboard/main">Home</a>
            </li>
            <li>
              <a href="/dashboard/add-equipment">Add Equipment</a>
            </li>
            <li>
              <a href="">Update Equipment</a>
            </li>
          </ul>
        </div>
      </aside>

      <Outlet />
    </div>
  );
};

export default SideMenu;
