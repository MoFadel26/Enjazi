// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/darkMode.css';
import Login from 'pages/auth/Login.jsx';
import SignUp from 'pages/auth/SignUp.jsx';
import LandingPage from 'pages/App.jsx';
import Dashboard from 'pages/dashboard/Dashboard';
import MainLayout from 'components/layout/MainLayout';
import Admin from 'pages/admin/Admin';
import Tasks from 'pages/tasks/TaskPage.jsx';
import Calendar from 'pages/calendar/CalendarPage';
import Performance from 'pages/performance/Performance';
import Rooms from 'pages/rooms/Rooms';
import Settings from 'pages/settings/settings';
import {AccentColorProvider} from "./contexts/AccentColorContext";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UsersPage from "./pages/admin/users/Users";
import RoomsPage from "./pages/admin/rooms/Rooms";

function App() {
  return (
    <React.StrictMode>
    <ThemeProvider>
      <AccentColorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/rooms" element={<RoomsPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AccentColorProvider>
    </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;