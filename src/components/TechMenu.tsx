import React from 'react'
import { Code2, Palette, FileText, Github } from 'lucide-react'

const techLinks = [
  { 
    key: 'html', 
    href: '#html', 
    icon: FileText, 
    label: 'HTML5',
    colorVar: '#e34c26'
  },
  { 
    key: 'css', 
    href: '#css', 
    icon: Palette, 
    label: 'CSS3',
    colorVar: '#264de4'
  },
  { 
    key: 'js', 
    href: '#javascript', 
    icon: Code2, 
    label: 'JavaScript',
    colorVar: '#f7df1e'
  },
  { 
    key: 'react', 
    href: '#react', 
    icon: Code2, 
    label: 'React',
    colorVar: '#61DBFB'
  },
  { 
    key: 'github', 
    href: 'https://github.com/', 
    icon: Github, 
    label: 'GitHub',
    colorVar: '#ffffff'
  }
]

export default function TechMenu() {
  return (
    <>
      <style>{`
        .tech-menu-container {
          background: #000;
          padding: 3.125rem 5rem;
          border-radius: 1.875rem;
          display: flex;
          gap: 3.75rem;
          box-shadow: 0 0.625rem 1.5625rem rgba(0,0,0,0.3);
          position: relative;
        }
        
        .tech-link {
          position: relative;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          overflow: hidden;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        
        .tech-link::before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-radius: 50%;
          z-index: -1;
          transition: all 0.4s ease;
          background: var(--tech-color);
        }
        
        .tech-link:hover {
          color: #000;
          transform: scale(1.2);
        }
        
        .tech-link:hover::before {
          width: 9.375rem;
          height: 9.375rem;
          opacity: 1;
        }
      `}</style>
      
      <div className="tech-menu-container">
        {techLinks.map((tech) => {
          const IconComponent = tech.icon
          return (
            <a
              key={tech.key}
              href={tech.href}
              className="tech-link"
              style={{ 
                color: tech.colorVar,
                '--tech-color': tech.colorVar 
              } as React.CSSProperties & { '--tech-color': string }}
              aria-label={tech.label}
              target={tech.key === 'github' ? '_blank' : undefined}
              rel={tech.key === 'github' ? 'noopener noreferrer' : undefined}
            >
              <IconComponent size={50} />
            </a>
          )
        })}
      </div>
    </>
  )
}