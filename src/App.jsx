import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import UpdateDetailPage from '@/pages/UpdateDetailPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import PostsPage from '@/pages/PostsPage';
import EnquiriesPage from '@/pages/EnquiriesPage';
import SettingsPage from '@/pages/SettingsPage';
import FloatingButtons from '@/components/FloatingButtons';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/update/:id" element={<UpdateDetailPage />} />
            {/* Alias route for convenience if users type /updates/ */}
            <Route path="/updates/:id" element={<UpdateDetailPage />} />

            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <ProtectedRoute>
                  <PostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute>
                  <EnquiriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;