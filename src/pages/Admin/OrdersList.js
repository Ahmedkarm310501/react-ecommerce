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
      field: "userName",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={`http://localhost:8000/${params.row.userPhoto}`}
              alt=""
            />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "userEmail", headerName: "Email", width: 150 },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 150,
    },
    {
      field: "totalPrice",
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
            {params.row.orderStatus == 0 && (
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
    fetch("http://127.0.0.1:8000/admin/orders", {
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);

            setData(data.orders);
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
    fetch(`http://127.0.0.1:8000/admin/confirm-order/${id}`, {
      method: "PUT",
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            // update state of order status to true
            const newData = dataa.map((item) => {
              if (item.id == id) {
                item.orderStatus = 1;
              }
              return item;
            });
            setData(newData);

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
