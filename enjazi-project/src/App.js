// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './guest/Welcome';
// import Login from './guest/Login'; // comment out if you want
// import Register from './guest/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Render ONLY the Welcome component at the root ("/") */}
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
