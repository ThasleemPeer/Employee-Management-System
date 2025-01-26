import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      const { user_type, name, tasks } = response.data;

      if (user_type === 'admin') {
        navigate('/admin-dashboard', { state: { name, tasks } });
      } else if (user_type === 'employee') {
        navigate('/employee-dashboard', { state: { name, tasks } });
      } else {
        setError('Unknown user type.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black border-4 border-green-500 rounded-lg shadow-lg p-8 w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-white">Login</h1>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border border-gray-600 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full p-2 border border-gray-600 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
