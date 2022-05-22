import React from 'react'
import { Outlet } from "react-router-dom";
export default function OrdersList() {
  return (
    <>
      <div>
      <h2>Orders List</h2>
      </div>
      <Outlet />
    </>
  )
}
