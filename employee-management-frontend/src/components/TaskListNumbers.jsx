import React from "react";

const TaskListNumbers = ({ tasks }) => {
  // Count tasks by status
  const taskCounts = {
    pending: tasks.filter((task) => task.status === "pending").length,
    ongoing: tasks.filter((task) => task.status === "ongoing").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <div className="flex mt-10 justify-between gap-5 screen bg-black p-5 rounded-lg">
      {/* Pending Tasks */}
      <div className="rounded-xl w-[30%] py-6 px-9 bg-yellow-400 hover:bg-yellow-500 transition duration-200">
        <h2 className="text-3xl font-bold">{taskCounts.pending}</h2>
        <h3 className="text-xl mt-0.5 font-medium">Pending Task</h3>
      </div>

      {/* Ongoing Tasks */}
      <div className="rounded-xl w-[30%] py-6 px-9 bg-green-400 hover:bg-green-500 transition duration-200">
        <h2 className="text-3xl font-bold">{taskCounts.ongoing}</h2>
        <h3 className="text-xl mt-0.5 font-medium">Ongoing Task</h3>
      </div>

      {/* Completed Tasks */}
      <div className="rounded-xl w-[30%] py-6 px-9 bg-blue-400 hover:bg-blue-500 transition duration-200">
        <h2 className="text-3xl font-bold">{taskCounts.completed}</h2>
        <h3 className="text-xl mt-0.5 font-medium">Completed Task</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
