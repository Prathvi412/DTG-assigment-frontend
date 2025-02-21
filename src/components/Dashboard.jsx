import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Adjust the backend URL if needed

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks/")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Listen for real-time task updates
  useEffect(() => {
    socket.on("updateTasks", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    });

    return () => {
      socket.off("updateTasks");
    };
  }, []);

  // Handle status change
  const handleUpdateStatus = (taskId, status) => {
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status })
      .then((response) => {
        socket.emit("taskUpdated", response.data); // Emit event for real-time update
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  // Handle adding comments
  const handleAddComment = (taskId, comment) => {
    setComments({ ...comments, [taskId]: comment });

    axios.put(`http://localhost:5000/api/tasks/${taskId}/comment`, { comment })
      .then((response) => {
        socket.emit("taskUpdated", response.data);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Dashboard</h1>

      {/* Task List */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-300 mb-3">Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-800 p-3 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-blue-400">{task.name}</h3>
                  <p className="text-gray-400 text-sm">Status: {task.status}</p>

                  {/* Comment Section */}
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comments[task.id] || ""}
                      onChange={(e) => handleAddComment(task.id, e.target.value)}
                      className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none"
                    />
                    {task.comment && (
                      <span className="text-blue-300 text-sm ml-2">Show Comment</span>
                    )}
                  </div>
                </div>

                {/* Status Buttons */}
                <div className="flex space-x-2">
                  {["Ongoing", "Pending", "Completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(task.id, status)}
                      className={`px-3 py-1 rounded-lg shadow-md transition duration-300 ${
                        task.status === status
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 hover:bg-red-600"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
