import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const BaseLayout = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default BaseLayout;
