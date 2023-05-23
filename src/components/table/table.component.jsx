import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./table.styles.scss";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const Table = ({ user }) => {
  const navigate = useNavigate();

  const [equipmentData, setEquipmentData] = useState([]);

  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const loadEquipmentData = () => {
    if (!user.id) {
      navigate("/authentication");
    } else {
      axios
        .get(`${serverAddress}/api/equipment/user/${user.id}`)
        .then((response) => {
          setEquipmentData(response.data[0]);
        })
        .catch((error) => {
          console.log("error while getting data", error);
        });
    }
  };

  const getHeadings = () => {
    if (equipmentData.length > 0) {
      return Object.keys(equipmentData[0]);
    }
    return [];
  };

  const handleRowClick = (serial) => {
    navigate(`/dashboard/edit-equipment/${serial}`);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSort = (e, key) => {
    e.preventDefault();

    // console.log("key", key);
    // console.log("e", e);
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredData = equipmentData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  const sum = sortedData.reduce(
    (total, row) => total + parseFloat(row["Purchase Price"]),
    0
  );

  return (
    <div>
      <input
        className="filter-input"
        type="text"
        placeholder="Filter"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            {getHeadings().map((heading) => (
              <th key={heading} onClick={(e) => handleSort(e, heading)}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => {
            return (
              <tr
                key={index}
                onClick={() => handleRowClick(row["Serial Number"])}
              >
                {getHeadings().map((key, index) => {
                  return (
                    <td key={row[key]}>
                      {/* <Link to={`/edit-equipment/${row.id}`}>Edit</Link> */}
                      {row[key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Total Value: $ {sum.toFixed(2)}</h4>
    </div>
  );
};

export default Table;
