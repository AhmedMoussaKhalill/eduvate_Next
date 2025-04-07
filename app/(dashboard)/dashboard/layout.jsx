import React from "react";
import SideBar from "./_components/sidebar";
import RightBar from "./_components/RightBar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <SideBar />

      {/* <div className="pr-64">
          <Navbar />
        </div> */}
      <div className="pl-64">{children}</div>
      {/* <RightBar /> */}
    </div>
  );
};

export default DashboardLayout;
