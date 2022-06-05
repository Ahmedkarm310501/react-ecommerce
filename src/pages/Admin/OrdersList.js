import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Snackbar from "../../components/layout/UI/Snackbar";
export default function OrdersList() {
  const [dataa, setData] = useState(userRows);
  const snackbarRef = useRef(null);
  const AuthCtx = useContext(AuthContext);
  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={`http://localhost:8000/${params.row.user_photo}`}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email_user", headerName: "Email", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "total_price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.status == 0 && (
              <button
                className="userListEdit"
                onClick={() => {
                  confirmOrder(params.row.id);
                }}
              >
                confirm order
              </button>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-orders", {
      method: "POST",
      body: JSON.stringify({
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
            let newData = data.orders_array.map((item) => {
              item.total_price = parseInt(item.total_price);
              return item;
            });
            setData(newData);
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
  const confirmOrder = (id) => {
    fetch("http://127.0.0.1:8000/api/activate_order", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        order_id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            snackbarRef.current.show();
            console.log(data);
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
  return (
    <div className="p-3">
      <h2>Orders List</h2>
      <div style={{ height: 550, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={dataa} columns={columns} pageSize={8} />
          </div>
        </div>
        {
          <Snackbar
            ref={snackbarRef}
            message={"Order confirmed successfully"}
            type={"success"}
          />
        }
        <Outlet />
      </div>
    </div>
  );
}
