// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'pages/auth/Login.jsx';
import SignUp from 'pages/auth/SignUp.jsx';
import LandingPage from 'pages/App.jsx';
import Forget from 'pages/auth/Forget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
