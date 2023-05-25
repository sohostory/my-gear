import { Outlet } from "react-router-dom";

import "./dashboard.styles.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      <main className="main-dashboard">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
