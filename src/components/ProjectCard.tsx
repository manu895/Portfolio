import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { ExternalLink, Github } from 'lucide-react'

type Props = { project: Project }

export default function ProjectCard({ project }: Props) {
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <style>{`
        .project-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
          border: 5px solid rgba(48, 134, 239, 0.2);
          }
        
        .project-card:hover {
          transform: translateY(-8px) rotateX(5deg);
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(48, 134, 239, 0.1) 0%, rgba(140, 130, 254, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        .project-card:hover::before {
          opacity: 1;
        }
        
        .project-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: transform 0.6s ease;
          z-index: 2;
          pointer-events: none;
        }
        
        .project-card:hover::after {
          transform: translateX(0%) translateY(0%) rotate(45deg);
        }
        
        .project-image {
          transition: all 0.4s ease;
          position: relative;
          z-index: 0;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
          filter: brightness(1.1) contrast(1.1);
        }
        
        .project-content {
          position: relative;
          z-index: 3;
        }
        
        .project-title {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .project-card:hover .project-title {
          color: #3086ef;
          text-shadow: 0 0 10px rgba(48, 134, 239, 0.3);
        }
        
        .stack-badge {
          transition: all 0.3s ease;
          position: relative;
          backdrop-filter: blur(10px);
        }
        
        .project-card:hover .stack-badge {
          background: rgba(48, 134, 239, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(48, 134, 239, 0.2);
        }
        
        .action-buttons {
          transition: all 0.3s ease;
        }
        
        .project-card:hover .action-buttons {
          transform: translateY(-2px);
        }
        
        .btn-details {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-details::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-details:hover::before {
          left: 100%;
        }
        
        .glow-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, rgba(48, 134, 239, 0.9), rgba(140, 130, 254, 0.3));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .project-card:hover .glow-border {
          opacity: 1;
        }
      `}</style>
      
      <article 
        className="project-card card"
        aria-labelledby={`p-${project.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="glow-border"></div>
        
        <img
          src={project.images[0]?.src}
          alt={project.images[0]?.alt ?? project.title}
          className="project-image mb-4 aspect-video w-full rounded-lg object-cover"
          loading="lazy"
        />
        
        <div className="project-content">
          <h3 id={`p-${project.id}`} className="project-title text-xl">{project.title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="stack-badge rounded-md bg-accentBlue/10 px-2 py-1 text-xs">{s}</span>
            ))}
          </div>
          
          <div className="action-buttons mt-4 flex items-center gap-3">
            <Link
              to={`/projects/${project.slug}`}
              state={{ backgroundLocation: location }}
              className="btn-details btn-primary"
              aria-label={`Apri dettagli progetto ${project.title}`}
            >
              Dettagli
            </Link>
            {project.demoUrl && (
              <a className="inline-flex items-center gap-1 text-sm transition-colors hover:text-accentBlue" href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={16} /> Demo
              </a>
            )}
            {project.repoUrl && (
              <a className="inline-flex items-center gap-1 text-sm transition-colors hover:text-accentBlue" href={project.repoUrl} target="_blank" rel="noreferrer">
                <Github size={16} /> Repo
              </a>
            )}
          </div>
        </div>
      </article>
    </>
  )
}