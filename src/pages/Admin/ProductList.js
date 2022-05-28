import React from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    const items = data.filter((item) => item.id !== id)
    setData(items);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => {handleDelete(params.row.id)
              console.log(params.row.id)}}
            />
          </>
        );
      },
    },
  ];

  return (
    <><h2>Products List</h2><div style={{ height: 550, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            checkboxSelection />
        </div>
      </div>
      <Outlet />
    </div></>
  );
}
