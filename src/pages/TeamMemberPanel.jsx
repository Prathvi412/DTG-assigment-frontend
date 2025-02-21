import React from "react";
import Dashboard from "../components/Dashboard";

const TeamMemberPanel = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-800 hover:bg-gray-800 text-white">
      <div className="w-full h-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default TeamMemberPanel;
