import { Link, Outlet } from "react-router-dom";

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
              <Link to="/dashboard/main">Equipment List</Link>
            </li>
            <li>
              <Link to="/dashboard/add-equipment">Add Equipment</Link>
            </li>
          </ul>
          <div className="side-menu__header__title">
            <h4>Manage Categories & Vendors</h4>
          </div>
          <ul>
            <li>
              <Link to="/dashboard/list/type">Equipment Type</Link>
            </li>
            <li>
              <Link to="/dashboard/list/brand">Brand</Link>
            </li>

            <li>
              <Link to="/dashboard/list/store">Store</Link>
            </li>
            <li>
              <Link to="/dashboard/list/insurance">Insurance</Link>
            </li>
          </ul>
        </div>
      </aside>

      <Outlet />
    </div>
  );
};

export default SideMenu;
