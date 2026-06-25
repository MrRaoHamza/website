import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Database, Lightbulb, BarChart3, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

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

const ProjectDetails = () => {
  const { projects } = useData();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Case Study Not Found</h2>
        <p className="mt-2 text-slate-500 dark:text-text-secondary-dark text-sm">The project case study you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-semibold text-xs hover:underline">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  const breadcrumbItems = [
    { label: 'Projects', path: '/#projects' },
    { label: project.title }
  ];

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Action Header */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 dark:border-dark-border/60 pb-8 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white mt-4 leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex sm:items-center space-x-3 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-dark-surface transition-all shadow-sm"
            >
              <GithubIcon size={14} />
              <span>Repository</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all"
            >
              <ExternalLink size={14} />
              <span>Live System</span>
            </a>
          </div>
        </div>

        {/* Banner Image */}
        <div className="mt-8 rounded-3xl aspect-video md:aspect-[21/9] w-full overflow-hidden bg-slate-100 dark:bg-dark-surface border border-slate-200/60 dark:border-dark-border/60">

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';
            }}
          />
        </div>

        {/* Case Study Deep Dive */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Body */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <Lightbulb size={18} className="mr-2 text-yellow-500" />
                Executive Summary
              </h2>
              <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed">
                {caseStudy.overview}
              </p>
            </section>

            {/* Problem Statement */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <AlertTriangle size={18} className="mr-2 text-red-500" />
                Problem Statement
              </h2>
              <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed border-l-2 border-red-500 pl-4 bg-red-500/[0.02] py-2 rounded-r-lg">
                {caseStudy.problemStatement}
              </p>
            </section>

            {/* Dataset Details */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <Database size={18} className="mr-2 text-cyan-500" />
                Dataset & Feature Engineering
              </h2>
              <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed">
                {caseStudy.dataset}
              </p>
              <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed mt-2">
                {caseStudy.approach}
              </p>
            </section>

            {/* Model Architecture */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <Layers size={18} className="mr-2 text-purple-500" />
                Model Architecture
              </h2>
              <pre className="text-slate-600 dark:text-text-secondary-dark text-xs bg-slate-50 dark:bg-dark-card p-4 rounded-xl border border-slate-100 dark:border-dark-border font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {caseStudy.modelArchitecture}
              </pre>

            </section>

            {/* Performance Results */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <BarChart3 size={18} className="mr-2 text-emerald-500" />
                Results & Metrics
              </h2>
              <div className="p-6 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/20 text-slate-600 dark:text-text-secondary-dark">
                <p className="text-sm sm:text-base leading-relaxed font-semibold text-emerald-600 dark:text-emerald-400">
                  {caseStudy.results}
                </p>
              </div>
            </section>

            {/* Challenges & Blockers */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                <Cpu size={18} className="mr-2 text-blue-500" />
                Technical Challenges & Solutions
              </h2>
              <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed">
                {caseStudy.challenges}
              </p>
            </section>

            {/* Future Work */}
            {caseStudy.futureImprovements && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center">
                  <Lightbulb size={18} className="mr-2 text-indigo-500" />
                  Future Improvements
                </h2>
                <p className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed">
                  {caseStudy.futureImprovements}
                </p>
              </section>
            )}

          </div>

          {/* Sidebar Tech Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm space-y-6">
              
              {/* Stack */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-3">Model Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border text-slate-700 dark:text-text-primary-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* General details */}
              <div className="border-t border-slate-100 dark:border-dark-border/40 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 dark:text-text-muted-dark font-medium">Target variable:</span>
                  <span className="text-slate-800 dark:text-text-primary-dark font-semibold">Predictive Metric</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 dark:text-text-muted-dark font-medium">Frameworks:</span>
                  <span className="text-slate-800 dark:text-text-primary-dark font-semibold">Python AI SDK</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 dark:text-text-muted-dark font-medium">Open Source:</span>
                  <span className="text-slate-800 dark:text-text-primary-dark font-semibold">Available</span>
                </div>
              </div>

              {/* Action back */}
              <div className="border-t border-slate-100 dark:border-dark-border/40 pt-4">
                <Link
                  to="/"
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-white flex items-center justify-center space-x-1.5 hover:bg-slate-50 dark:hover:bg-dark-surface transition-all"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Gallery</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
