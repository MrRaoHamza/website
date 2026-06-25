import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BrainCircuit } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-sans relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/[0.02] dark:bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-md">
        
        {/* Animated icon */}
        <div className="inline-flex p-5 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20 shadow-md">
          <BrainCircuit size={40} className="animate-pulse" />
        </div>

        <h1 className="text-6xl font-bold font-display text-slate-900 dark:text-white">404</h1>
        
        <h2 className="text-xl font-bold font-display text-slate-800 dark:text-text-secondary-dark">
          Neural Net: Node Not Found
        </h2>
        
        <p className="text-sm text-slate-500 dark:text-text-muted-dark leading-relaxed">
          The routing algorithm was unable to optimize weights for this path. The destination node has been pruned or does not exist.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ArrowLeft size={16} />
            <span>Optimize Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
