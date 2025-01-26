import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskListNumbers from "../components/TaskListNumbers";
import TaskList from "../components/TaskList";

const EmployeeDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name = "Guest", tasks = [], role = "employee" } = location.state || {};

  const isEmployee = role === "employee"; // Assuming the role is passed as part of the location state

  useEffect(() => {
    if (!location.state) {
      navigate("/");  // Redirect to login if state is not present
    }
  }, [location.state, navigate]);

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header username={name} />
      
      {/* Task Numbers Section */}
      <div className="mb-10">
        <TaskListNumbers tasks={tasks} />
      </div>

      {/* Task List Section */}
      <TaskList tasks={tasks} isEmployee={isEmployee} />
    </div>
  );
};

export default EmployeeDashboard;
