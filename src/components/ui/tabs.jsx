import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Cloning children to pass activeTab and setActiveTab as props
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );
};

export const TabsList = ({ children }) => (
  <div className="flex gap-2 justify-center mb-4">{children}</div>
);

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      activeTab === value
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white/70 hover:bg-white/20"
    }`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return <div className="mt-4">{children}</div>;
};
