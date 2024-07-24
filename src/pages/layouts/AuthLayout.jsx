import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main>
        <div className="auth-page">
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
