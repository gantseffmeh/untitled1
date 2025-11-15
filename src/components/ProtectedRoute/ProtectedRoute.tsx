import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { selectedProject } = useProject();

    if (!selectedProject) {
        return <Navigate to="/project-selection" replace />;
    }

    return children;
};

export default ProtectedRoute;

