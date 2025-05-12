'use client';
import React from 'react';
import SideBar from './_components/sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <SideBar />
      <main className="ml-60">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
