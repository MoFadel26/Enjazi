// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './styles/darkMode.css';
import Login from 'pages/auth/Login.jsx';
import SignUp from 'pages/auth/SignUp.jsx';
import LandingPage from 'pages/App.jsx';
import Dashboard from 'pages/dashboard/Dashboard';
import MainLayout from 'components/layout/MainLayout';
import Tasks from 'pages/tasks/TaskPage.jsx';
import Calendar from 'pages/calendar/CalendarPage';
import Performance from 'pages/performance/Performance';
import Rooms from 'pages/rooms/Rooms';
import Settings from 'pages/settings/settings';
import {AccentColorProvider} from "./contexts/AccentColorContext";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UsersPage from "./pages/admin/users/Users";
import RoomsPage from "./pages/admin/rooms/Rooms";
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthRoute from './components/auth/AuthRoute';
import AuthDebug from './components/auth/AuthDebug';

function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AccentColorProvider>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected admin routes - require 'admin' role */}
              <Route element={
                <AuthRoute>
                  <ProtectedRoute requiredRole="admin" routeType="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                </AuthRoute>
              }>
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/rooms" element={<RoomsPage />} />
              </Route>
              
              {/* Protected regular routes - require authentication */}
              <Route element={
                <AuthRoute>
                  <MainLayout />
                </AuthRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              {/* Protect standalone tasks route */}
              <Route path="/tasks" element={
                <AuthRoute>
                  <Tasks />
                </AuthRoute>
              } />
            </Routes>
            
            {/* Auth Debug Component */}
            {/* <AuthDebug /> */}
          </AuthProvider>
        </AccentColorProvider>
      </ThemeProvider>
    </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;