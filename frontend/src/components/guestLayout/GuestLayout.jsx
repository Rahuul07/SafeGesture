import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
       
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