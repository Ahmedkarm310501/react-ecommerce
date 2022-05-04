import React from "react";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <div>Admin page</div>
      <Outlet />
    </>
  );
};

export default AdminPage;
