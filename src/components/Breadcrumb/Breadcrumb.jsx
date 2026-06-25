import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-text-secondary-dark py-6 relative z-10">
      <Link 
        to="/" 
        className="hover:text-blue-600 dark:hover:text-white flex items-center transition-colors"
      >
        <Home size={14} className="mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={12} className="text-slate-400 dark:text-text-muted-dark" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-text-primary-dark font-medium truncate max-w-[150px] sm:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
