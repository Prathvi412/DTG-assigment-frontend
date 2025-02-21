import React, { useState } from "react";
import axios from "axios";
import TaskCreation from "./TaskCreation";
import TasksList from "./TasksList";
import Dashboard from "../components/Dashboard";

const TeamLeaderPanel = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // New state to differentiate modals
  const [memberData, setMemberData] = useState({ name: "", email: "", password: "" });
  const [projectData, setProjectData] = useState({ projectName: "", status: "Ongoing", membersCount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalType === "addMember") {
      setMemberData({ ...memberData, [name]: value });
    } else if (modalType === "createProject") {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = modalType === "addMember" ? "/api/create-member" : "/api/create-project";
      const data = modalType === "addMember" ? memberData : projectData;

      const response = await axios.post(endpoint, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert(response.data.message);
      setIsModalOpen(false);
      setMemberData({ name: "", email: "", password: "" });
      setProjectData({ projectName: "", status: "Ongoing", membersCount: "" });
    } catch (error) {
      alert(error.response?.data?.message || `Error creating ${modalType === "addMember" ? "team member" : "project"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex">
      {/* Left Column (Tabs & Actions) */}
      <div className="w-1/2 bg-gray-700 p-4 rounded-lg shadow-md">
        {/* Navigation Tabs */}
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

          {/* Buttons in One Row */}
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
              className="w-1/2 px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded shadow-md"
            >
              Create New Project
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "create" && <TaskCreation />}
          {activeTab === "list" && <TasksList />}
        </div>
      </div>

      {/* Right Column (Dashboard) */}
      <div className="w-2/3 ml-6">
        <Dashboard />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            {modalType === "addMember" ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Add Team Member</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={memberData.name}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={memberData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={memberData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 rounded text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded text-white"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </>
            ) : modalType === "createProject" ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="projectName"
                    placeholder="Project Name"
                    value={projectData.projectName}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <select
                    name="status"
                    value={projectData.status}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <input
                    type="number"
                    name="membersCount"
                    placeholder="Number of Team Members"
                    value={projectData.membersCount}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 rounded text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded text-white"
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeaderPanel;
