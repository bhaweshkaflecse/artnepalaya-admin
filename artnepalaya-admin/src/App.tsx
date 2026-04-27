import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Moderation } from './pages/Moderation';
import { Featured } from './pages/Featured';
import { useAuthStore } from './store/authStore';

// Mock empty User management component for MVP
const Users = () => <div className="bg-white p-6 border border-gray-200 rounded-lg">User Directory Configuration...</div>;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="moderation" element={<Moderation />} />
          <Route path="featured" element={<Featured />} />
        </Route>
      </Routes>
    </Router>
  );
}