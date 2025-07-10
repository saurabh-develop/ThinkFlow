import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/NavBar";

const NavOnlyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d0d15] to-[#1a1a27] text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default NavOnlyLayout;
