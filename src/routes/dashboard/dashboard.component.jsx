import axios from "axios";
import { useState, useEffect } from "react";

import Table from "../../components/table/table.component";
import TableLinks from "../../components/table-links/table-links.component";

import "./dashboard.styles.scss";
import AddEquipmentForm from "../../components/add-equipment-form/add-equipment-form.compnent";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const Dashboard = ({ user }) => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const loadEquipmentData = () => {
    axios
      .get(`${serverAddress}/api/equipment/${user.id}`)
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
    <div className="dashboard-main">
      <main className="main-dashboard">
        <h3>Dashboard</h3>
        <Table theadData={getHeadings()} tbodyData={equipmentData} />
        <AddEquipmentForm user={user} />
      </main>
    </div>
  );
};

export default Dashboard;
