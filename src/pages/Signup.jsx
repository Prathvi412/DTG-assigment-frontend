import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../common/index"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    console.log(SummaryApi.signUP.url)

    try {
      const response = await axios.post(SummaryApi.signUP.url, formData);
      console.log(response.data.message)
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "" }); // Clear form after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Team Leader Signup</h2>

        {message && <p className="text-green-400 text-center">{message}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
