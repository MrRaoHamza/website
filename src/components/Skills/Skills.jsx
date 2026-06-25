import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Skills = () => {
  const { skillCategories } = useData();
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 14 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-white/40 dark:bg-[#090909]/40 border-y border-slate-200/50 dark:border-dark-border/40 relative dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full animate-pulse">
            My Toolbelt
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
            Technical Skill Set
          </h2>
          <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm leading-relaxed">
            A comprehensive overview of programming languages, machine learning frameworks, data science libraries, and workspace tools.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md hover:shadow-lg transition-all duration-300 glow-card"
            >
              <h3 className="font-display font-bold text-base text-slate-950 dark:text-white mb-6 border-b border-slate-100 dark:border-dark-border/30 pb-3 flex items-center justify-between">
                <span>{category.title}</span>
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider bg-blue-500/5 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                  Stack
                </span>
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-semibold text-slate-700 dark:text-text-secondary-dark">
                      <span>{skill.name}</span>
                      <span className="text-slate-500 dark:text-text-muted-dark">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-dark-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        viewport={{ once: true }}
                        style={{ originX: 0 }}
                        transition={{ type: "spring", stiffness: 45, damping: 11, delay: 0.15 }}
                        className="h-full w-full bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

