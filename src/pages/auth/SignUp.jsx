import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
// import googleIcon from '../../assets/icons/svg/google.svg';
// import googleIcon from 'assets/icons/svg/google.svg'; // Adjust the path as necessary

function SignUp() {
  // Define navigate
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Check if the user to see his password while writing...
  const [showPassword, setShowPassword] = useState(false);
  /*Checking the vaildity of password for more security*/
  const checkLowerCase = /[a-z]/.test(password);
  const checkUpperCase = /[A-Z]/.test(password);
  const checkHasNumber = /\d/.test(password);
  const checkHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const checkHasLongEnough = password.length >= 8;



  const handleSubmit = (e) => {
    e.preventDefault();
    /*Navigate to Login after Signing up*/
    navigate('/login')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="mt-12 flex items-center flex-col">
          <h2 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h2>
         
          <form onSubmit={handleSubmit} className="space-y-4 w-full flex-1 mt-8">

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="username"
                placeholder="Pick a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

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
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:border-blue-500">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                />
                <button
                  type="button" onClick={
                    () => setShowPassword(!showPassword)
                  }
                  className="ml-2 text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* <div class="flex flex-row items-center mt-8 gap-5">
                    <button>
                        <div class="bg-white p-2 rounded-full shadow-sm rounded-lg py-3 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                          <FaGoogle size="2em"/>
                        </div>
                    </button>
              </div> */}

              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 hover:underline cursor-pointer" > Log in </span></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;