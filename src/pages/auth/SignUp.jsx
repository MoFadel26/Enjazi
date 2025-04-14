import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
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
      <div className="w-full max-w-lg mt-8 mb-8 p-8 bg-white shadow-md rounded-lg">
        <Link to="/">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-[#0284c7] p-1 rounded mr-2">
              <div className="text-[#FFFFFF] font-bold text-6xl">E</div>
            </div>
            <div className="text-6xl font-bold">njazi</div>
          </div>
        </Link>

        <div className="mt-12 flex items-center flex-col">

          <h2 className="text-2xl xl:text-3xl font-extrabold text-center">Get started with your account</h2>
         
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
              <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full border border-gray-300 px-3 py-2 rounded pr-16 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Check list */}
              <ul className="text-sm space-y-1 mb-4 mt-4 flex flex-wrap gap-3">
                <li className={`flex items-center ${checkLowerCase ? 'text-green-600' : 'text-gray-500'}`}><span className="inline-block w-3 h-3 mr-2 rounded-full border-2 border-current bg-current/10"/>One lowercase character</li>
                <li className={`flex items-center ${checkUpperCase ? 'text-green-600' : 'text-gray-500'}`}><span className="inline-block w-3 h-3 mr-2 rounded-full border-2 border-current bg-current/10"/>One uppercase character</li>
                <li className={`flex items-center ${checkHasSpecial ? 'text-green-600' : 'text-gray-500'}`}><span className="inline-block w-3 h-3 mr-2 rounded-full border-2 border-current bg-current/10"/>One special character</li>
                <li className={`flex items-center ${checkHasNumber ? 'text-green-600' : 'text-gray-500'}`}><span className="inline-block w-3 h-3 mr-2 rounded-full border-2 border-current bg-current/10"/>One number character</li>
                <li className={`flex items-center ${checkHasLongEnough ? 'text-green-600' : 'text-gray-500'}`}><span className="inline-block w-3 h-3 mr-2 rounded-full border-2 border-current bg-current/10"/>At least 8 characters</li>
              </ul>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-blue-600 hover:underline focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
                
              </button>
            </div>


              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={
                  !checkLowerCase || !checkUpperCase || !checkHasSpecial || ! checkHasNumber || !checkHasLongEnough
                }
              >
                Sign Up
              </button>
          </form>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 hover:underline cursor-pointer" > Log in </span></p>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div class="flex items-center justify-center px-4">
          <button>
              <div class="gap-5 bg-white p-2 rounded-full shadow-sm rounded-lg py-3 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <FaGoogle size="2em"/> <span>Continue with Google</span>
              </div>
          </button>
        </div>

      </div>
    </div>
  );
}

export default SignUp;
