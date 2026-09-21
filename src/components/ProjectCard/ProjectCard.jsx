import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const GithubIcon = ({ size = 13 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const rotations = ['-0.8deg', '0.5deg', '-0.4deg', '0.7deg', '-0.6deg', '0.3deg'];

const ProjectCard = ({ project, index = 0 }) => {
  const rot = rotations[index % rotations.length];

  return (
    <div className="index-card flex flex-col h-full overflow-hidden group"
      style={{ transform: `rotate(${rot})` }}>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--c-bg-aged)' }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'; }}
        />
        <div className="absolute top-3 left-3">
          <span className="sticker" style={{ fontSize: '0.65rem' }}>{project.category}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow"
        style={{ background: 'var(--c-card)', borderTop: '2px solid var(--c-rust)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.3, marginBottom: 8, transition: 'color 0.15s' }}
          className="group-hover:!text-[color:var(--c-rust)]">
          {project.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--c-mid)', lineHeight: 1.7 }}
          className="flex-grow line-clamp-3 mb-4">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => <span key={t} className="chip" style={{ fontSize: '0.72rem' }}>{t}</span>)}
        </div>
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px dashed var(--c-border)' }}>
          <div className="flex items-center gap-3">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors"
              style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: 'var(--c-faint)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--c-ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}>
              <GithubIcon /> Code
            </a>
            {project.demoUrl && (
              project.demoUrl.startsWith('/') ? (
                <Link to={project.demoUrl}
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: 'var(--c-faint)' }}>
                  <ExternalLink size={12} /> Demo
                </Link>
              ) : (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: 'var(--c-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--c-ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}>
                  <ExternalLink size={12} /> Demo
                </a>
              )
            )}
          </div>
          <Link to={`/projects/${project.slug}`}
            className="flex items-center gap-1 transition-colors"
            style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: 'var(--c-rust)', fontWeight: 600 }}>
            Case Study <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
