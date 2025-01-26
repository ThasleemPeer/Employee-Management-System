import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";
import Header from '../components/Header';

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { name = "Admin" } = location.state || {};

  const [employees, setEmployees] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [employeesResponse, tasksResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/employees/"),
          axios.get("http://localhost:8000/api/admin-tasks/"),
        ]);

        setEmployees(employeesResponse.data);
        setTaskList(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!assignedTo || !taskName || !dueDate || !description) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/admin-tasks/", {
        task_name: taskName,
        assigned_to: assignedTo,
        due_date: dueDate,
        description,
        status,
      });

      setSuccessMessage("Task added successfully!");
      await fetchData();
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const resetForm = () => {
    setTaskName("");
    setAssignedTo("");
    setDueDate("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <div className="h-screen w-full p-7 bg-[#1c1c1c]">
      <Header username={name} />

      
      {successMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleAddTask} className="bg-[#2c2c2c] p-5 rounded mb-5">
        <h2 className="text-xl font-bold mb-3 text-white">Create New Task</h2>
        {/* Form Fields */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-[#3c3c3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
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
        >
          Add Task
        </button>
      </form>

      <TaskList tasks={taskList} />
    </div>
  );
}

export default AdminDashboard;