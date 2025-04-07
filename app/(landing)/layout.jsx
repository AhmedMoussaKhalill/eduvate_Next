import React from "react";
import LandingNavBar from "./_components/LandingNavBar";

const UserLayout = ({ children }) => {
  return (
    <div>
      <LandingNavBar />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
