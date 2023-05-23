import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./dashboard.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      <main className="main-dashboard">
        <h3>Dashboard</h3>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
