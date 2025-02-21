import React, { useState } from "react";

const TaskCreation = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const teamMembers = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ taskName, description, deadline, assignedTo });
  };

  return (
    <div className="max-w-2xl mx-auto p-7 bg-gray-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-2xl font-bold text-blue-400 text-center mb-5">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 focus:ring-2 focus:ring-blue-500 text-base"
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 focus:ring-2 focus:ring-blue-500 text-base h-24 resize-none"
          required
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
          
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-2xl bg-gray-900 focus:ring-2 focus:ring-blue-500 text-base"
            required
          >
            <option value="" disabled>Select Member</option>
            {teamMembers.map((member, index) => (
              <option key={index} value={member}>{member}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-600 transition text-lg"
        >
          🚀 Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreation;
