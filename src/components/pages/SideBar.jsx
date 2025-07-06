import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Data Structures",
      links: [
        { label: "Array", path: "/array" },
        { label: "Stack", path: "/stack" },
        { label: "Queue", path: "/queue" },
        { label: "Heap", path: "/heap" },
        { label: "Binary Tree", path: "/binarytree" },
        { label: "AVL Tree", path: "/avltree" },
      ],
    },
    {
      title: "Algorithms",
      links: [
        { label: "Sorting", path: "/sorting" },
        { label: "Graph", path: "/graphs" },
        { label: "DP", path: "/dp" },
      ],
    },
  ];

  return (
    <aside className="min-h-screen w-[250px] px-6 py-8 flex flex-col gap-8 text-white bg-[#0d0d15] border-r border-white/10 shadow-lg">
      <div className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text">
        ThinkFlow
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-bold text-purple-400 uppercase mb-4 tracking-widest">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {section.links.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="group cursor-pointer text-base text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
