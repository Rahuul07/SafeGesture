import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0ea5e9,#0284c7,#0369a1)"
      }}
    >
      <GuestHeader />

      <main>
        <Outlet />
      </main>

      <GuestFooter />
    </div>
  );
};

export default GuestLayout;