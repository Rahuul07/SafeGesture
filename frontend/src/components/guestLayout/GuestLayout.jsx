import React from "react";

import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <>
      <GuestHeader />

      <main>
        <Outlet />
      </main>

      <GuestFooter />
    </>
  );
};

export default GuestLayout;