import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Award, Calendar, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Experience = () => {
  const { experience, certifications } = useData();
  const timelineRef = useRef(null);

  // Setup scroll tracking for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="py-24 bg-white/40 dark:bg-[#090909]/40 border-t border-slate-200/50 dark:border-dark-border/40 relative dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full animate-pulse">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
            Experience & Credentials
          </h2>
          <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm leading-relaxed">
            A review of my academic projects, industry internships, freelance accomplishments, and professional certifications.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work / Project Timeline */}
          <div ref={timelineRef} className="lg:col-span-8 space-y-8">
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={titleVariants}
              className="text-lg font-bold font-display text-slate-950 dark:text-white flex items-center mb-6"
            >
              <Briefcase size={20} className="mr-2.5 text-blue-600 dark:text-blue-400" />
              Professional & Academic Work
            </motion.h3>

            <div className="relative pl-6 sm:pl-8 ml-3 space-y-12">
              {/* Vertical timeline back track line */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-dark-border" />
              
              {/* Dynamic scroll-linked progress line */}
              <motion.div 
                style={{ scaleY }}
                className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-600 origin-top z-0"
              />

              {experience.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Pin (Spring Pop-in) */}
                  <motion.span 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 350, damping: 15, delay: idx * 0.1 }}
                    className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1 rounded-full bg-white dark:bg-dark-bg border-2 border-blue-500 text-blue-500 flex items-center justify-center shadow-md z-10"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                  </motion.span>

                  {/* Card Body (Fade/Slide from left + Shimmer & Tilt Hover) */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm hover:shadow-lg transition-all duration-300 shimmer-card cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <div>
                        <h4 className="font-display font-bold text-base text-slate-950 dark:text-white">
                          {item.role}
                        </h4>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {item.company}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-text-muted-dark bg-slate-50 dark:bg-dark-surface px-2.5 py-0.5 rounded-full border border-slate-100 dark:border-dark-border/30 flex items-center max-w-fit">
                        <Calendar size={10} className="mr-1" />
                        {item.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary-dark mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet List */}
                    <ul className="space-y-2">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-slate-600 dark:text-text-secondary-dark flex items-start leading-relaxed">
                          <ChevronRight size={14} className="mr-1.5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={titleVariants}
              className="text-lg font-bold font-display text-slate-950 dark:text-white flex items-center mb-6"
            >
              <Award size={20} className="mr-2.5 text-purple-600 dark:text-purple-400" />
              Certifications
            </motion.h3>

            <div className="space-y-4">
              {(certifications || []).map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                  whileHover={{ x: -4, y: -2 }}
                  className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm hover:shadow-md transition-all duration-300 shimmer-card cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                      {cert.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-text-muted-dark font-medium mt-1 block">
                      Issued by: {cert.issuer}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-slate-50 dark:border-dark-border/40 pt-3">
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-text-muted-dark">
                      {cert.date}
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      Verify Credentials
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;

