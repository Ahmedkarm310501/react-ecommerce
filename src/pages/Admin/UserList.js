import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
export default function UserList() {
 
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    const items = data.filter((item) => item.id !== id)
    setData(items);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
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
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                console.log(params.row.id)
                return handleDelete(params.row.id);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <><h2>Users List</h2><div style={{ height: 550, width: '100%' }}>
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
