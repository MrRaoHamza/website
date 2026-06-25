import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 14 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group rounded-3xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md hover:shadow-xl dark:hover:shadow-blue-500/5 overflow-hidden flex flex-col glow-card h-full shimmer-card"
    >
      
      {/* Project Image Panel */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-dark-surface">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback if image doesn't exist
            e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-display text-slate-950 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="mt-3 text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm leading-relaxed flex-grow line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tech Stack Badges */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border/40 text-slate-500 dark:text-text-secondary-dark"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-dark-border/40 flex items-center justify-between text-xs font-semibold gap-3">
          <div className="flex items-center space-x-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-600 dark:text-text-secondary-dark hover:text-blue-500 dark:hover:text-white transition-colors"
            >
              <GithubIcon size={14} />
              <span>Code</span>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-slate-600 dark:text-text-secondary-dark hover:text-blue-500 dark:hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                <span>Demo</span>
              </a>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <span>Case Study</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

