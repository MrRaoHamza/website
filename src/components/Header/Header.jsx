import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Terminal, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../context/DataContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { profileData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResumeClick = (e) => {
    if (profileData?.resumeUrl) {
      if (profileData.resumeUrl.startsWith('data:')) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = profileData.resumeUrl;
        link.download = `${(profileData.name || 'Rao_Hamza_Irshad').replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Natural link navigation for normal URL
      }
    } else {
      e.preventDefault();
      alert("Downloading Rao's Resume PDF Template (Simulated)...");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling on page load/redirect
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled || isOpen
        ? 'glass py-3 shadow-lg border-b border-slate-200/50 dark:border-b-0' 
        : 'bg-transparent py-5'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/"
            onClick={handleLogoClick} 
            className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-xl group font-display"
          >
            <div className="p-1.5 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Terminal size={18} />
            </div>
            <span>Rao<span className="text-blue-500 font-medium">.AI</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-text-secondary-dark dark:hover:text-white transition-colors cursor-pointer relative py-1"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-dark-border pl-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:text-white dark:hover:bg-dark-card transition-all cursor-pointer relative overflow-hidden"
                aria-label="Toggle Dark Mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -15, rotate: 90, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: 15, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Resume Button */}
              <a
                href={profileData?.resumeUrl || '#resume'}
                target={profileData?.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "_blank" : undefined}
                rel={profileData?.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "noopener noreferrer" : undefined}
                onClick={handleResumeClick}
                className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText size={14} />
                <span>Resume</span>
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-text-secondary-dark dark:hover:text-white transition-all relative overflow-hidden"
              aria-label="Toggle Dark Mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -15, rotate: 90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: 15, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-text-secondary-dark dark:hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 border-b border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 dark:text-text-secondary-dark dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-card rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex flex-col space-y-3 px-3">
            <a
              href={profileData?.resumeUrl || '#resume'}
              target={profileData?.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "_blank" : undefined}
              rel={profileData?.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "noopener noreferrer" : undefined}
              onClick={handleResumeClick}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/10"
            >
              <FileText size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
