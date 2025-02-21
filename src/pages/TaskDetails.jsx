import React, { useState } from "react";

const TaskDetails = () => {
  const [tasks, setTasks] = useState([
    {
      taskName: "Design Homepage",
      description: "Create a responsive homepage UI",
      deadline: "2025-03-10",
      assignedTo: "John Doe",
      status: "In Progress",
      comments: ["Need to adjust the navbar", "Footer needs redesign"]
    },
    {
      taskName: "Implement Authentication",
      description: "Develop login/signup functionality",
      deadline: "2025-03-15",
      assignedTo: "Jane Smith",
      status: "Pending",
      comments: ["Use JWT for security", "Check validation rules"]
    }
  ]);

  return (
    <div className="max-w-lg mx-auto p-5 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-lg font-bold text-blue-400 text-center mb-3">Task Details</h2>
      
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="p-3 bg-gray-900 border border-gray-700 rounded-md shadow-sm">
            <h3 className="text-base font-semibold text-blue-300">{task.taskName}</h3>
            <p className="text-gray-400 text-xs mt-1">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">📅 {task.deadline}</p>
            <p className="text-xs text-yellow-400 mt-1">👤 {task.assignedTo}</p>
            <p className={`text-xs font-semibold mt-1 ${task.status === 'In Progress' ? 'text-green-400' : 'text-red-400'}`}>
              🔘 {task.status}
            </p>
            <div className="mt-2 p-2 bg-gray-700 rounded-md">
              <h4 className="text-blue-300 font-medium text-xs">💬 Comments</h4>
              <ul className="mt-1 space-y-1">
                {task.comments.map((comment, cIndex) => (
                  <li key={cIndex} className="text-gray-300 text-xs">- {comment}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDetails;
