import React, { useState } from "react";

const TaskList = ({ tasks, isEmployee }) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p className="text-white">No tasks available</p>;
  }

  const [activeTab, setActiveTab] = useState("pending"); // Tracks the active tab

  // Group tasks by status
  const groupedTasks = {
    pending: tasks.filter((task) => task.status === "pending"),
    ongoing: tasks.filter((task) => task.status === "ongoing"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      {/* Tab-style buttons */}
      <div className="flex justify-between space-x-6 mb-5">
        {Object.keys(groupedTasks).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-all duration-200 ${
              activeTab === status
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List for Active Tab */}
      <div className="space-y-4">
        {groupedTasks[activeTab].length === 0 ? (
          <p className="text-center text-gray-400">No tasks available</p>
        ) : (
          groupedTasks[activeTab].map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-200"
            >
              {/* Task details in row */}
              {!isEmployee && (
                <div className="w-1/5">
                  <h2 className="text-lg font-medium text-white">{task.assigned_to_username}</h2>
                </div>
              )}
              <div className="w-1/5">
                <h3 className="text-lg font-medium text-blue-400">{task.task_name}</h3>
              </div>
              <div className="w-1/5">
                <h5 className="text-sm text-gray-200">{task.due_date}</h5>
              </div>
              <div className="w-1/5">
                <h5
                  className={`text-sm font-medium ${
                    task.status === "pending"
                      ? "text-yellow-400"
                      : task.status === "ongoing"
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
