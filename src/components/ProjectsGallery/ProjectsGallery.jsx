import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsGallery = () => {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'Python',
    'Web Apps'
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Python') return project.tech.includes('Python');
    if (activeFilter === 'Web Apps') {
      return (
        project.tech.includes('Web Apps') || 
        project.demoUrl !== ''
      );
    }
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
            Technical Project Showcase
          </h2>
          <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm leading-relaxed">
            Explore predictive models, statistical analysis reports, and deep learning architectures.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 relative z-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors duration-300 overflow-hidden border border-slate-200 dark:border-dark-border"
              style={{
                borderColor: activeFilter === filter ? 'transparent' : undefined
              }}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-md shadow-blue-500/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={activeFilter === filter ? 'text-white' : 'text-slate-600 dark:text-text-secondary-dark hover:text-slate-800 dark:hover:text-white'}>
                {filter}
              </span>
            </button>
          ))}
        </div>


        {/* Projects Grid with Framer Motion AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500 dark:text-text-secondary-dark">No projects match the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGallery;
