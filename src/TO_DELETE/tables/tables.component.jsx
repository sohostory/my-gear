import React, { useReducer, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Tables = () => {
  const db = [
    {
      id: 1,
      type: "camera",
      brand: "Canon",
      model: "EOS 5D Mark IV",
      serial: "123456789",
    },
    {
      id: 2,
      type: "camera",
      brand: "Canon",
      model: "EOS 5D Mark IV",
      serial: "123456789",
    },
  ];
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", "ID"),
    columnHelper.accessor("type", "Type"),
    columnHelper.accessor("brand", "Brand"),
    columnHelper.accessor("model", "Model"),
    columnHelper.accessor("serial", "Serial"),
  ];

  const [data, setData] = useState(() => [...db]);
  const rerender = useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
