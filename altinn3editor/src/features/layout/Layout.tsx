import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
    </div>
  );
}
