import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppContainer } from './styles/StyledComponents';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import ViewTasks from './components/ViewTasks';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/create-task" element={
              <ProtectedRoute>
                <Layout>
                  <CreateTask />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/view-tasks" element={
              <ProtectedRoute>
                <Layout>
                  <ViewTasks />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AppContainer>
    </AuthProvider>
  );
};

export default App;