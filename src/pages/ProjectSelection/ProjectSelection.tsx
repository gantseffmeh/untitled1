import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import './ProjectSelection.css';

const ProjectSelection: React.FC = () => {
    const navigate = useNavigate();
    const { projects, setSelectedProject } = useProject();

    const handleProjectSelect = (project: any) => {
        setSelectedProject(project);
        navigate('/dashboard');
    };

    return (
        <div className="project-selection-page">
            <div className="project-selection-container">
                <div className="project-selection-header">
                    <h1 className="project-selection-title">Выберите проект</h1>
                    <p className="project-selection-subtitle">
                        Выберите проект для работы
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card"
                            onClick={() => handleProjectSelect(project)}
                        >
                            <div 
                                className="project-logo"
                                style={{ 
                                    backgroundColor: project.color || 'var(--accent-color)',
                                }}
                            >
                                {project.logo || project.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="project-info">
                                <h3 className="project-name">{project.name}</h3>
                                {project.description && (
                                    <p className="project-description">{project.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="project-selection-footer">
                    <button 
                        className="logout-button"
                        onClick={() => {
                            setSelectedProject(null);
                            navigate('/login');
                        }}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSelection;

