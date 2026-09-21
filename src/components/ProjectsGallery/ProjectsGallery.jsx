import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ProjectCard from '../ProjectCard/ProjectCard';

const FILTERS = ['All', 'Data Science', 'Machine Learning', 'Deep Learning', 'Python', 'Web Apps'];

const ProjectsGallery = () => {
  const { projects } = useData();
  const [active, setActive] = useState('All');

  const filtered = projects.filter(p => {
    if (active === 'All')     return true;
    if (active === 'Python')   return p.tech.includes('Python');
    if (active === 'Web Apps') return p.tech.includes('Web Apps') || p.demoUrl !== '';
    return p.category === active;
  });

  return (
    <section id="projects" className="nb-section nb-section-tinted"
      style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-baseline gap-4 mb-10">
          <span className="section-num">04 —</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
            Project Showcase
          </h2>
          <span className="hand-note hidden sm:inline-block" style={{ transform: 'rotate(-1.5deg)' }}>
            built from scratch 🔧
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.95rem',
                fontWeight: active === f ? 700 : 500,
                padding: '3px 14px 4px',
                borderRadius: '2px 2px 0 0',
                border: `1px solid ${active === f ? 'var(--c-rust)' : 'var(--c-border)'}`,
                borderBottom: active === f ? '2px solid var(--c-rust)' : `1px solid var(--c-border)`,
                background: active === f ? 'var(--c-rust-bg)' : 'var(--c-card)',
                color: active === f ? 'var(--c-rust)' : 'var(--c-faint)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="hand-note" style={{ fontSize: '1.1rem' }}>nothing here yet — try another filter ☕</span>
          </div>
        )}

        <div className="mt-12 flex items-center gap-3">
          <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
          <span className="hand-note" style={{ fontSize: '0.82rem' }}>more projects on GitHub →</span>
          <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
