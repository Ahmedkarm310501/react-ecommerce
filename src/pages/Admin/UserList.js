import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
export default function UserList() {
  const AuthCtx = useContext(AuthContext);
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    const items = data.filter((item) => item.id !== id);
    setData(items);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={`http://localhost:8000/${params.row.profile_photo_path}`}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/list-allUser", {
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
            setData(data.allUser);
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
        <h2>Users List</h2>
        <Link to="/dashboard/newUser">
          <button className="btn btn-primary">Create user</button>
        </Link>
      </div>

      <div style={{ height: 550, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={data} columns={columns} pageSize={12} />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
