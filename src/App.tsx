import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';
import Login from './pages/Login/Login';
import ProjectSelection from './pages/ProjectSelection/ProjectSelection';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Statistics from './pages/Statistics/Statistics';
import Marketing from './pages/Marketing/Marketing';
import Placeholder from './components/Placeholder/Placeholder';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ProjectProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/project-selection" element={<ProjectSelection />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="statistics" element={<Statistics />} />
                            <Route path="marketing" element={<Marketing />} />
                            <Route index element={<Placeholder />} />
                        </Route>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </BrowserRouter>
            </ProjectProvider>
        </ThemeProvider>
    );
};

export default App;
