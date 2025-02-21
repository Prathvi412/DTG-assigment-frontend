import React from "react";

const teamMembers = [
  { id: 1, name: "John Doe", role: "Frontend Developer" },
  { id: 2, name: "Jane Smith", role: "Backend Developer" },
  { id: 3, name: "Alice Johnson", role: "UI/UX Designer" },
  { id: 4, name: "Bob Brown", role: "Project Manager" },
];

const TeamMembers = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Team Members</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800 p-5 rounded-lg shadow-lg text-center hover:bg-gray-700 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-300">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
