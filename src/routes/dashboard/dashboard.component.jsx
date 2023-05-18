import axios from "axios";
import { useState, useEffect } from "react";

import Table from "../../components/table/table.component";

import "./dashboard.styles.scss";

const Dashboard = ({ user }) => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/equipment/${user.id}`
        );
        setEquipmentData(response.data[0]);
      } catch (error) {
        console.log("error while getting data", error);
      }
    };

    loadEquipmentData();
  }, [user.id]);

  // console.log("user", user);
  // try {
  //   axios
  //     .get(`http://localhost:4000/api/equipment/${user.id}`)
  //     .then((response) => {
  //       setEquipmentData(response.data[0]);
  //     });

  const getHeadings = () => {
    if (equipmentData.length > 0) {
      return Object.keys(equipmentData[0]);
    }
    return [];
  };

  return (
    <div className="dashboard">
      <aside className="aside-menu">
        <h1>Links</h1>
      </aside>
      <main className="main-dashboard">
        <h1>Dashboard</h1>
        <Table theadData={getHeadings()} tbodyData={equipmentData} />
      </main>
    </div>
  );
};

export default Dashboard;
