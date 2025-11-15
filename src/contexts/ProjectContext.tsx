import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { Project } from '../types/project';

interface ProjectContextType {
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    projects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within ProjectProvider');
    }
    return context;
};

interface ProjectProviderProps {
    children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    // TODO: Загрузить проекты через API
    // Пример: const [projects, setProjects] = useState<Project[]>([]);
    // useEffect(() => {
    //   fetch('/api/projects').then(res => res.json()).then(setProjects);
    // }, []);
    
    const projects: Project[] = [
        { id: '1', name: 'Проект 1', description: 'Описание проекта 1', color: '#51cf66' },
        { id: '2', name: 'Проект 2', description: 'Описание проекта 2', color: '#4dabf7' },
        { id: '3', name: 'Проект 3', description: 'Описание проекта 3', color: '#9775fa' },
        { id: '4', name: 'Проект 4', description: 'Описание проекта 4', color: '#ffd43b' },
    ];

    const [selectedProject, setSelectedProjectState] = useState<Project | null>(() => {
        const saved = localStorage.getItem('selectedProject');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return null;
            }
        }
        return null;
    });

    const setSelectedProject = (project: Project | null) => {
        setSelectedProjectState(project);
        if (project) {
            localStorage.setItem('selectedProject', JSON.stringify(project));
        } else {
            localStorage.removeItem('selectedProject');
        }
    };

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject, projects }}>
            {children}
        </ProjectContext.Provider>
    );
};

