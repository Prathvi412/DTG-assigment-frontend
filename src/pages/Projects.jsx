import React, { useEffect, useState } from "react";
import axios from "axios";

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/project", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching projects");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Update project
  const updateProject = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/project/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setProjects((prevProjects) =>
        prevProjects.map((proj) => (proj._id === id ? res.data.project : proj))
      );
    } catch (err) {
      alert("Error updating project");
    }
  };

  // ✅ Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/project/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects((prevProjects) => prevProjects.filter((proj) => proj._id !== id));
    } catch (err) {
      alert("Error deleting project");
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

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
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}`}>
                <td className="py-4 px-4">{project.name}</td>
                <td className="py-4 px-4 text-center">
                  <select
                    className={`px-3 py-1 rounded-lg text-white ${getStatusColor(project.status)}`}
                    value={project.status}
                    onChange={(e) => updateProject(project._id, { status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="number"
                    value={project.membersCount}
                    onChange={(e) => updateProject(project._id, { membersCount: Number(e.target.value) })}
                    className="bg-gray-700 text-white px-2 py-1 rounded w-16 text-center"
                    min="1"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
