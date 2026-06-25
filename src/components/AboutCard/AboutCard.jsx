import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, BrainCircuit, Code } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AboutCard = () => {
  const { education, profileData } = useData();

  const getInterestMeta = (type) => {
    switch (type) {
      case 'ds':
        return { icon: <Code size={16} />, color: "text-blue-500 bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10 dark:border-blue-500/20" };
      case 'ml':
        return { icon: <BrainCircuit size={16} />, color: "text-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/10 dark:border-cyan-500/20" };
      case 'dl':
        return { icon: <Target size={16} />, color: "text-purple-500 bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10 dark:border-purple-500/20" };
      case 'genai':
      default:
        return { icon: <BookOpen size={16} />, color: "text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10 dark:border-emerald-500/20" };
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full animate-pulse">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
            About Myself
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bio Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md hover:shadow-lg transition-shadow duration-300 glow-card"
          >
            <h3 className="text-2xl font-bold font-display text-slate-950 dark:text-white flex items-center">
              Hi, I'm {profileData.name}
            </h3>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wider">
              {profileData.title}
            </p>
            {profileData.bioParagraphs.map((para, pIdx) => (
              <p key={pIdx} className="mt-4 text-slate-600 dark:text-text-secondary-dark text-sm leading-relaxed">
                {para}
              </p>
            ))}

            {/* Interests grid */}
            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-3">Core Focus Areas</h4>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >

                {profileData.interests.map((interest) => {
                  const meta = getInterestMeta(interest.type);
                  return (
                    <motion.div 
                      key={interest.name} 
                      variants={chipVariants}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className={`flex items-center space-x-2.5 p-3.5 rounded-xl border cursor-pointer transition-shadow hover:shadow-sm ${meta.color}`}
                    >
                      {meta.icon}
                      <span className="text-xs font-semibold text-slate-800 dark:text-text-primary-dark">{interest.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Education & Goals Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Goal Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md flex items-start space-x-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                <Target size={24} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">{profileData.missionTitle}</h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-text-secondary-dark leading-relaxed">
                  {profileData.missionDescription}
                </p>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 dark:text-purple-400 shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">Education</h4>
                  <p className="text-xs text-purple-500 font-medium">BS Computer Science</p>
                </div>
              </div>

              {education.map((edu, idx) => (
                <div key={idx} className="border-t border-slate-100 dark:border-dark-border/30 pt-4 mt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-900 dark:text-white">{edu.institution}</span>
                    <span className="text-slate-400 dark:text-text-muted-dark bg-slate-50 dark:bg-dark-surface px-2.5 py-0.5 rounded-full border border-slate-100 dark:border-dark-border/30">{edu.duration}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-text-secondary-dark leading-relaxed">
                    {edu.description}
                  </p>
                  
                  {/* Courses */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {edu.courses.map((course, cIdx) => (
                      <motion.span 
                        key={cIdx} 
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="text-[10px] font-medium px-2 py-0.5 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border/40 text-slate-500 dark:text-text-secondary-dark rounded cursor-pointer transition-shadow"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCard;

