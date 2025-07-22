import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold bg-gradient-to-r from-[rgb(139,61,255)] to-[#e84aff] text-transparent bg-clip-text cursor-pointer"
          onClick={() => navigate("/")}
        >
          ThinkFlow
        </div>

        {/* Desktop Nav */}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center justify-center gap-6 mt-4 px-4 py-6 bg-black/60 backdrop-blur-lg rounded-lg shadow-md">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className="text-lg font-semibold text-white hover:text-[#b27fff] transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
            className="text-lg font-semibold text-white hover:text-[#b27fff] transition"
          >
            Visualizer
          </button>
          <button
            onClick={() => {
              navigate("/contact");
              setIsOpen(false);
            }}
            className="text-lg font-semibold text-white hover:text-[#b27fff] transition"
          >
            Contact
          </button>
          <a
            href="https://github.com/saurabh-develop/ThinkFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-white hover:text-[#b27fff] transition"
          >
            Source
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
