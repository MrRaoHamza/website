import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
import AboutCard from '../../components/AboutCard/AboutCard';
import Skills from '../../components/Skills/Skills';
import ProjectsGallery from '../../components/ProjectsGallery/ProjectsGallery';
import Experience from '../../components/Experience/Experience';
import ContactForm from '../../components/ContactForm/ContactForm';
import { useData } from '../../context/DataContext';

const Home = () => {
  const { blogPosts } = useData();
  const location = useLocation();

  // Scroll to hash on load/redirect
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <Hero />
      <AboutCard />
      <Skills />
      <ProjectsGallery />
      <Experience />

      {/* Blog Previews Section */}
      <section id="blog" className="py-24 relative overflow-hidden">
        {/* Glow indicators */}
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">
              Tech Articles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
              Latest from the Blog
            </h2>
            <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm leading-relaxed">
              Technical articles demystifying neural network foundations, Pandas query pipelines, and machine learning architectures.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="group p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between glow-card"
              >
                <div>
                  <div className="flex items-center space-x-4 text-slate-400 dark:text-text-muted-dark text-[10px] sm:text-xs font-semibold mb-3">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-950 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="mt-3 text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-dark-border/30">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </motion.div>
  );
};

export default Home;
