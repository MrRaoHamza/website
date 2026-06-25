import React from 'react';
import { Mail, ExternalLink, GraduationCap } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
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

const LinkedinIcon = ({ size = 18 }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon size={18} />, url: 'https://github.com/MrRaoHamza' },
    { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, url: 'https://www.linkedin.com/in/rao-hamza-irshad/' },
    { name: 'Kaggle', icon: <GraduationCap size={18} />, url: 'https://www.kaggle.com/mrraohamza' },
    { name: 'Email', icon: <Mail size={18} />, url: 'mailto:mr.raohamza@gmail.com' }
  ];

  return (
    <footer className="bg-white dark:bg-[#080808] border-t border-slate-200 dark:border-dark-border py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          
          {/* Logo & Brief */}
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Rao<span className="text-blue-500 font-medium">.AI</span>
            </span>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-text-muted-dark max-w-xs leading-relaxed">
              Computer Science graduate specializing in ML, Deep Learning, and intelligent products.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-200 dark:border-dark-border text-slate-500 hover:text-blue-500 dark:text-text-secondary-dark dark:hover:text-white dark:hover:bg-dark-card hover:border-blue-500/30 transition-all shadow-sm"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-100 dark:border-dark-border/40 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-text-muted-dark">
          <p>© {currentYear} Rao Hamza Irshad. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://github.com/MrRaoHamza" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors flex items-center space-x-1">
              <span>Source Code</span>
              <ExternalLink size={10} />
            </a>
            <a href="#about" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
