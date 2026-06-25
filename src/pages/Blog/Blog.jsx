import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const Blog = () => {
  const { blogPosts } = useData();
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="mt-2 text-slate-500 dark:text-text-secondary-dark text-sm">The article you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-semibold text-xs hover:underline">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Blog', path: '/#blog' },
    { label: post.title }
  ];

  // Helper custom parser to render simple markdown strings
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const rendered = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          rendered.push(
            <pre key={`code-${i}`} className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 font-mono text-xs my-4 overflow-x-auto whitespace-pre">
              <code className={codeLanguage ? `language-${codeLanguage}` : ''}>
                {codeLines.join('\n')}
              </code>
            </pre>
          );
          inCodeBlock = false;
          codeLines = [];
          codeLanguage = '';
        } else {
          // Open code block
          inCodeBlock = true;
          codeLanguage = trimmed.replace('```', '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        // Collect code lines preserving leading spaces
        codeLines.push(line);
        continue;
      }

      if (trimmed.startsWith('### ')) {
        rendered.push(
          <h3 key={i} className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-8 mb-4">
            {trimmed.replace('### ', '')}
          </h3>
        );
        continue;
      }
      if (trimmed.startsWith('#### ')) {
        rendered.push(
          <h4 key={i} className="text-lg font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">
            {trimmed.replace('#### ', '')}
          </h4>
        );
        continue;
      }
      if (trimmed.startsWith('##### ')) {
        rendered.push(
          <h5 key={i} className="text-base font-bold font-display text-slate-900 dark:text-white mt-4 mb-2">
            {trimmed.replace('##### ', '')}
          </h5>
        );
        continue;
      }
      if (trimmed.startsWith('* ')) {
        rendered.push(
          <li key={i} className="list-disc list-inside ml-4 text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed my-1.5">
            {trimmed.replace('* ', '')}
          </li>
        );
        continue;
      }
      if (trimmed === '') {
        rendered.push(<div key={i} className="h-2" />);
        continue;
      }

      // Default paragraph, check inline backticks
      let content = line;
      const parts = content.split('`');
      if (parts.length > 1) {
        rendered.push(
          <p key={i} className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed my-3">
            {parts.map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <code key={index} className="bg-slate-100 dark:bg-dark-card border border-slate-200/50 dark:border-dark-border px-1.5 py-0.5 rounded font-mono text-xs text-blue-600 dark:text-blue-400">
                    {part}
                  </code>
                );
              }
              return part;
            })}
          </p>
        );
      } else {
        rendered.push(
          <p key={i} className="text-slate-600 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed my-3">
            {line}
          </p>
        );
      }
    }

    return rendered;
  };


  return (
    <div className="pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Article Meta */}
        <div className="mt-4 border-b border-slate-200/60 dark:border-dark-border/60 pb-8">
          <div className="flex items-center space-x-4 text-slate-400 dark:text-text-muted-dark text-xs font-semibold mb-4">
            <span className="flex items-center">
              <Calendar size={13} className="mr-1" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock size={13} className="mr-1" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm sm:text-base leading-relaxed italic border-l-4 border-purple-500 pl-4 bg-purple-500/[0.01] py-2 rounded-r-lg">
            "{post.excerpt}"
          </p>
        </div>

        {/* Article Body */}
        <div className="mt-10 prose dark:prose-invert max-w-none">
          {renderMarkdown(post.body)}
        </div>

        {/* Back and Action footer */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-dark-border/60 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-text-secondary-dark hover:text-blue-500 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Copied article link to clipboard!");
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 dark:border-dark-border text-slate-600 dark:text-text-secondary-dark rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-dark-surface transition-all cursor-pointer"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Blog;
