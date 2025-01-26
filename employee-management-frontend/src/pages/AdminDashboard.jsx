import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";
import Header from '../components/Header'
function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { name = "Admin", tasks = [] } = location.state || {};

  const [employees, setEmployees] = useState([]); // List of employees
  const [taskName, setTaskName] = useState(""); // Task name
  const [assignedTo, setAssignedTo] = useState(""); // Selected employee
  const [dueDate, setDueDate] = useState(""); // Due date
  const [description, setDescription] = useState(""); // Description
  const [status, setStatus] = useState("pending"); // Task status
  const [taskList, setTaskList] = useState(tasks); // Task list
  const [loading, setLoading] = useState(false); // Loading state for employees
  const [error, setError] = useState(""); // Error message for fetching employees


  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Redirect to login page if location.state is null
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!assignedTo || !taskName || !dueDate || !description) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/admin-tasks/", {
        task_name: taskName,
        assigned_to: assignedTo,
        due_date: dueDate,
        description: description,
        status: status,
      });

      // Add new task to task list
      setTaskList((prev) => [...prev, response.data]);

      // Reset form fields after successful submission
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again.");
    }
  };

  const resetForm = () => {
    setTaskName("");
    setAssignedTo("");
    setDueDate("");
    setDescription("");
    setStatus("pending");
    setError(""); // Reset error state after task is added
  };

  return (
    <div className="h-screen w-full p-7 bg-[#1c1c1c]">
      <Header username={name} />

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="bg-[#2c2c2c] p-5 rounded mb-5">
        <h2 className="text-xl font-bold mb-3 text-white">Create New Task</h2>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={loading} // Disable dropdown when loading employees
          >
            <option value="" disabled>Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.username}
              </option>
            ))}
          </select>
          {loading && <div>Loading employees...</div>} {/* Show loading message */}
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded"
          >
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading} // Disable submit button while loading
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <TaskList tasks={taskList} />
    </div>
  );
}

export default AdminDashboard;
