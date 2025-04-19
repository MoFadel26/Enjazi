// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/darkMode.css';
import Login from 'pages/auth/Login.jsx';
import SignUp from 'pages/auth/SignUp.jsx';
import LandingPage from 'pages/App.jsx';
import Forget from 'pages/auth/Forget';
import Dashboard from 'pages/dashboard/Dashboard';
import MainLayout from 'components/layout/MainLayout';
import Admin from 'pages/admin/admin';
import Tasks from 'pages/tasks/TaskPage.jsx';
import Calendar from 'pages/calendar/CalendarPage';
import Performance from 'pages/performance/Performance';
import Rooms from 'pages/rooms/Rooms';
import Settings from 'pages/settings/settings';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;