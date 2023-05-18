import axios from "axios";
import { useState, useEffect } from "react";

import Table from "../../components/table/table.component";
import TableLinks from "../../components/table-links/table-links.component";

import "./dashboard.styles.scss";

const Dashboard = ({ user }) => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const loadEquipmentData = () => {
    axios
      .get(`http://localhost:4000/api/equipment/${user.id}`)
      .then((response) => {
        setEquipmentData(response.data[0]);
      })
      .catch((error) => {
        console.log("error while getting data", error);
      });
  };

  const getHeadings = () => {
    if (equipmentData.length > 0) {
      return Object.keys(equipmentData[0]);
    }
    return [];
  };

  return (
    <div className="dashboard">
      <aside className="aside-menu">
        <TableLinks />
      </aside>
      <main className="main-dashboard">
        <h3>Dashboard</h3>
        <Table theadData={getHeadings()} tbodyData={equipmentData} />
      </main>
    </div>
  );
};

export default Dashboard;
