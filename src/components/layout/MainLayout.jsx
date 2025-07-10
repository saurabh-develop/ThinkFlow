import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "../pages/SideBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0d0d15] to-[#1a1a27] text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
