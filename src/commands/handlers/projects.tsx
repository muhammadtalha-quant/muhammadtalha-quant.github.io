import React from 'react'
import { projects } from '../../data/projects'

interface ProjectsProps {
  filter?: 'done' | 'planned' | 'in-progress'
}

export const ProjectsHandler: React.FC<ProjectsProps> = ({ filter }) => {
  const filteredProjects = filter ? projects.filter((p) => p.status === filter) : projects

  if (filteredProjects.length === 0 && filter === 'done') {
    return (
      <div className="my-2 text-text-primary">
        <p>No completed projects yet.</p>
        <p className="text-text-secondary">Type 'projects:planned' to see what is in the pipeline.</p>
        <p className="text-text-secondary">Type 'projects' to see all including in-progress work.</p>
      </div>
    )
  }

  return (
    <div className="my-4 space-y-6">
      {filteredProjects.map((project) => (
        <div key={project.id} className="group">
          <div className="flex items-center gap-3">
            <span className={`text-[12px] px-1.5 py-0.5 rounded-sm font-bold uppercase ${
              project.status === 'done' ? 'bg-accent-green text-bg-primary' :
              project.status === 'in-progress' ? 'bg-accent-amber text-bg-primary' :
              'bg-accent-blue text-bg-primary'
            }`}>
              {project.status.replace('-', ' ')}
            </span>
            <span className="text-accent-amber font-bold text-lg">{project.name}</span>
          </div>
          <div className="text-text-dim mt-1">─────────────────────────────────────────────────────────</div>
          <div className="mt-2 space-y-1">
            <div className="flex">
              <span className="text-text-secondary w-28 shrink-0">Description</span>
              <div className="text-text-primary">
                {project.description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="flex">
              <span className="text-text-secondary w-28 shrink-0">Language</span>
              <span className="text-text-primary">
                {project.language.mode === 'cpp-only' ? 'C++ only' :
                 project.language.mode === 'python-only' ? 'Python only' :
                 `C++ ${project.language.cppPercent}% | Python ${project.language.pythonPercent}%`}
                {project.language.reason && ` — ${project.language.reason}`}
              </span>
            </div>
            <div className="flex">
              <span className="text-text-secondary w-28 shrink-0">Repo</span>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">
                {project.repoUrl}
              </a>
            </div>
            {project.note && (
              <div className="flex italic text-text-dim mt-2">
                <span className="w-28 shrink-0">Note</span>
                <span>{project.note}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
