import React from 'react'
import { Outlet } from "react-router-dom";
export default function ProductList() {
  return (
    <>
      <div>
      <h2>Product List</h2>
      </div>
      <Outlet />
    </>
  )
}
