import React from "react";

const projects = [
  { id: 1, name: "Task Manager", status: "Ongoing", members: 5 },
  { id: 2, name: "E-Commerce App", status: "Completed", members: 8 },
  { id: 3, name: "Chat Application", status: "Pending", members: 4 },
  { id: 4, name: "Portfolio Website", status: "Ongoing", members: 3 },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Ongoing":
      return "bg-yellow-500";
    case "Completed":
      return "bg-green-500";
    case "Pending":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const Projects = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Projects</h1>

      <div className="w-full max-w-4xl">
        <table className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-700 text-blue-300">
            <tr>
              <th className="py-3 px-4 text-left">Project Name</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Members</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}`}>
                <td className="py-4 px-4">{project.name}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">{project.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
