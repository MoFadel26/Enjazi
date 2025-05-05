import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  // Define navigate and location
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // Use the login function from AuthContext
      const userData = await login(email, password);
      
      console.log("Logged in successfully!", userData);
      
      // Redirect based on user role or redirect path
      if (userData.role === 'admin') {
        navigate('/admin/users');
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
      console.error("Error during login:", err);
    }
  };

  // Display auth context error if present
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Link to="/">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-[#0284c7] p-1 rounded mr-2">
              <div className="text-[#FFFFFF] font-bold text-6xl">E</div>
            </div>
            <div className="text-6xl font-bold">njazi</div>
          </div>
        </Link>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

