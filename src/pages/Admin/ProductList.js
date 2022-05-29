import React from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Snackbar from "../../components/layout/UI/Snackbar";
export default function ProductList() {
  const [dataa, setData] = useState([]);
  const AuthCtx = useContext(AuthContext);
  const snackbarRef = useRef(null);

  const handleDelete = (id) => {
    fetch("http://127.0.0.1:8000/api/delete-product", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
        token: AuthCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            snackbarRef.current.show();
            const items = dataa.filter((item) => item.id !== id);
            setData(items);
          } else {
            console.log("wrong");
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
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
            <img
              className="productListImg"
              src={`http://localhost:8000/${params.row.photo}`}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "Quantity", headerName: "Stock", width: 200 },

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
              onClick={() => {
                handleDelete(params.row.id);
                console.log(params.row.id);
              }}
            />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/all-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            setData(data.products);
          } else {
            console.log("wrong");
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between p-2">
        <h2>Products List</h2>
        <Link to="/dashboard/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div style={{ height: 550, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={dataa} columns={columns} pageSize={8} />
            {
              <Snackbar
                ref={snackbarRef}
                message="Product deleted successfully"
                type={"success"}
              />
            }
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
