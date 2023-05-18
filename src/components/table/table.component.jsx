import React, { useState } from "react";
import "./table.styles.scss";

const Table = ({ theadData, tbodyData }) => {
  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSort = (e, key) => {
    e.preventDefault();

    console.log("key", key);
    console.log("e", e);
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredData = tbodyData.filter((row) =>
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
        type="text"
        placeholder="Filter"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            {theadData.map((heading) => (
              <th key={heading} onClick={(e) => handleSort(e, heading)}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => {
            return (
              <tr key={index}>
                {theadData.map((key, index) => {
                  return <td key={row[key]}>{row[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Total Value: $ {sum.toFixed(2)}</p>
    </div>
  );
};

export default Table;
