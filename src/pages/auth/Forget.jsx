import React, { useState } from "react";
import { Link } from "react-router-dom";

function Forget() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg mt-8 mb-8 p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-[#0284c7] p-1 rounded mr-2">
            <div className="text-[#FFFFFF] font-bold text-6xl">E</div>
          </div>
          <div className="text-6xl font-bold">Enjazi</div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Forget Password?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send a code
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forget;

