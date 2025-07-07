import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Sorting Algorithms",
      desc: "Visualize popular sorting techniques like bubble, merge, and quick sort with interactive steps.",
      path: "/sorting",
    },
    {
      title: "Data Structures",
      desc: "Learn how arrays, stacks, queues, trees, and heaps work internally.",
      path: "/array",
    },
    {
      title: "Graph & DP",
      desc: "Watch graph traversals and dynamic programming solutions unfold in real-time.",
      path: "/graphs",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#8b3dff] to-[#e84aff] text-transparent bg-clip-text"
        >
          Visualize. Understand. Master DSA.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg md:text-xl text-gray-400"
        >
          Dive into beautifully animated structures and algorithms.
        </motion.p>
        <Button
          variant="default"
          size="lg"
          className="mt-10 bg-[#8b3dff] hover:bg-[#a54dff] text-white px-6 py-3 rounded-xl text-base shadow-lg"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </header>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-10 pb-20">
        {cards.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-8 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-white to-purple-300 text-transparent bg-clip-text">
              {item.title}
            </h2>
            <p className="text-sm text-gray-300 mb-6">{item.desc}</p>
            <Button
              className="bg-[#8b3dff] hover:bg-[#a54dff] text-white w-full py-2 rounded-lg"
              onClick={() => navigate(item.path)}
            >
              Explore
            </Button>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/10">
        Made with 💜 by Saurabh |{" "}
        <a
          href="https://github.com/saurabh-develop"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
