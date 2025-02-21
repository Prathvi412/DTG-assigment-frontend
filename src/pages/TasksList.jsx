import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API or state management
    const fetchedTasks = [
      {
        id: 1,
        task: "Fix authentication bug",
        comments: ["Need to verify login flow", "Ensure token expiration is handled"],
        status: "In Progress",
      },
      {
        id: 2,
        task: "Design homepage UI",
        comments: ["Use company branding colors"],
        status: "Pending",
      },
      {
        id: 3,
        task: "Optimize database queries",
        comments: [],
        status: "Completed",
      },
    ];
    setTasks(fetchedTasks);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <h2 className="text-3xl font-bold text-blue-300 text-center mb-6">📌 Tasks Assigned</h2>
      <ul className="space-y-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="p-6 border rounded-xl bg-gray-800 shadow-md text-left">
              <h3 className="font-bold text-2xl text-blue-400">{task.task}</h3>
              <p className="text-white mt-2">Status: <span className="font-semibold text-blue-300">{task.status}</span></p>
              {task.comments.length > 0 && (
                <div className="mt-3">
                  <p className="text-blue-300 font-semibold">Comments:</p>
                  <ul className="list-disc pl-5 text-white">
                    {task.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-blue-300 text-center">No tasks assigned.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
