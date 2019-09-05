import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { IndividualProject } from './IndividualProject';


export const Projects = ({ activeNull = null }) => {
    const [active, setActive] = useState(activeNull);
    const { setSelectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();

    return (
        projects &&
        projects.map(project => (
            <li
                key={project.projectId}
                data-doc-id={project.projectId}
                data-testid="project-action"
                role="button"
                className={
                    active === project.projectId
                        ? 'active sidebar__project'
                        : 'sidebar__project'
                }

            >
                <div
                    aria-label={`Select ${project.name} as the task project`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {
                        setActive(project.projectId);
                        setSelectedProject(project.projectId);
                    }}
                    onClick={() => {
                        setActive(project.projectId);
                        setSelectedProject(project.projectId);
                    }}
                >
                    <IndividualProject project={project} />
                </div>
            </li>
        ))
    )
}