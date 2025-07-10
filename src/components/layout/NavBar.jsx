import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="text-2xl font-extrabold bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text cursor-pointer"
          onClick={() => navigate("/")}
        >
          ThinkFlow
        </div>
        <div className="hidden md:flex gap-5 items-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-white hover:text-[#b27fff] transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-white hover:text-[#b27fff] transition"
          >
            Visualizer
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-sm font-medium text-white hover:text-[#b27fff] transition"
          >
            Contact
          </button>
          <a
            href="https://github.com/saurabh-develop/ThinkFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white hover:text-[#b27fff] transition"
          >
            Source
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
