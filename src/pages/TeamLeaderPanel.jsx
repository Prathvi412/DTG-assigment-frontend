import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCreation from "./TaskCreation";
import TasksList from "./TasksList";
import Dashboard from "../components/Dashboard";

const TeamLeaderPanel = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [memberData, setMemberData] = useState({ name: "", email: "", password: "" });
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectData, setProjectData] = useState({ name: "", members: 1, deadline: "", status: "Pending" });

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/members", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/create-member", memberData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert(response.data.message);
      setIsModalOpen(false);
      setMemberData({ name: "", email: "", password: "" });
      fetchTeamMembers();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding team member");
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/project/", {
        ...projectData,
        membersCount: projectData.members, // ✅ Change "members" to "membersCount"
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      alert(response.data.message);
      setIsModalOpen(false);
      setProjectData({ name: "", members: 1, deadline: "", status: "Pending" });
    } catch (error) {
      alert(error.response?.data?.message || "Error creating project");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex">
      <div className="w-1/2 bg-gray-700 p-4 rounded-lg shadow-md">
        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("create")}
              className={`w-1/2 px-3 py-1.5 text-sm rounded transition ${activeTab === "create" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-600 text-blue-300"}`}
            >
              Create Task
            </button>

            <button
              onClick={() => setActiveTab("list")}
              className={`w-1/2 px-3 py-1.5 text-sm rounded transition ${activeTab === "list" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-600 text-blue-300"}`}
            >
              All Assigned Tasks
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setModalType("addMember");
              }}
              className="w-1/2 px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded shadow-md"
            >
              Add Team Member
            </button>

            <button
              onClick={() => {
                setIsModalOpen(true);
                setModalType("createProject");
              }}
              className="w-1/2 px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded shadow-md"
            >
              Create Project
            </button>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === "create" && <TaskCreation />}
          {activeTab === "list" && <TasksList />}
        </div>

        <h2 className="text-lg font-semibold mt-6">Team Members</h2>
        <ul className="mt-2">
          {teamMembers.map((member) => (
            <li key={member._id} className="p-2 bg-gray-600 rounded mt-1">
              {member.name} - {member.email}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 ml-6">
        <Dashboard />
      </div>

      {/* Add Team Member Modal */}
      {isModalOpen && modalType === "addMember" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Team Member</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={memberData.name} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" required />
              <input type="email" name="email" placeholder="Email" value={memberData.email} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" required />
              <input type="password" name="password" placeholder="Password" value={memberData.password} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" required />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 rounded text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded text-white">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {isModalOpen && modalType === "createProject" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create Project</h2>
            <form onSubmit={handleProjectSubmit}>
              <input type="text" name="name" placeholder="Project Name" value={projectData.name} onChange={handleProjectChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" required />
              <input type="number" name="members" placeholder="No. of Members" value={projectData.members} onChange={handleProjectChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" min="1" required />
              <input type="date" name="deadline" placeholder="Deadline" value={projectData.deadline} onChange={handleProjectChange} className="w-full p-2 mb-3 rounded bg-gray-700 text-white" required />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 rounded text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 rounded text-white">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeaderPanel;
