import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Eye, EyeOff, LayoutDashboard, FolderKanban, FileText, Cpu, 
  Briefcase, Settings, Plus, Trash2, Edit, RotateCcw, Download, 
  Check, X, LogOut, GraduationCap, Award, PlusCircle, AlertCircle, User,
  Upload
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ADMIN_CONFIG } from '../../config/admin';

// Helper to hash password
const sha256 = async (string) => {
  try {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error("SHA-256 hashing not supported or failed", error);
    return "";
  }
};

const Admin = () => {
  const data = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  // Editor States
  const [editingItem, setEditingItem] = useState(null); // { type: 'project'|'blog'|'skillCat'|'experience'|'education'|'certification', index: number|null, data: {} }
  const [newTagInput, setNewTagInput] = useState('');
  const [newBulletInput, setNewBulletInput] = useState('');
  const [newCourseInput, setNewCourseInput] = useState('');
  const [profileForm, setProfileForm] = useState(null);
  const [newSubTitleInput, setNewSubTitleInput] = useState('');

  // Password Utility State
  const [hashInput, setHashInput] = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { message: string, onConfirm: () => void }

  useEffect(() => {
    if (hashInput) {
      sha256(hashInput).then(h => setGeneratedHash(h));
    } else {
      setGeneratedHash('');
    }
  }, [hashInput]);

  useEffect(() => {
    if (activeTab === 'profile' && data.profileData) {
      setProfileForm(JSON.parse(JSON.stringify(data.profileData)));
    }
  }, [activeTab, data.profileData]);

  // Auth Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const inputHash = await sha256(password);
    if (inputHash === ADMIN_CONFIG.passwordHash) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
    } else {
      setLoginError('Invalid password credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  // Generic file download helper
  const downloadFile = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/javascript'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Backups/Downloads
  const handleExport = (type) => {
    let filename = '';
    let content = '';
    
    switch(type) {
      case 'projects':
        filename = 'projects.js';
        content = data.getProjectsExportCode();
        break;
      case 'blog':
        filename = 'blog.js';
        content = data.getBlogExportCode();
        break;
      case 'skills':
        filename = 'skills.js';
        content = data.getSkillsExportCode();
        break;
      case 'experience':
        filename = 'experience.js';
        content = data.getExperienceExportCode();
        break;
      case 'about':
        filename = 'about.js';
        content = data.getAboutExportCode();
        break;
      default:
        return;
    }
    downloadFile(filename, content);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Glow ambient background items */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md mx-4 p-8 rounded-2xl glass shadow-xl z-10 text-center"
        >
          <div className="inline-flex p-3.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-5">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Admin Portal</h2>
          <p className="mt-2 text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm">
            Enter password to gain administrative access to edit content.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {loginError && (
              <div className="flex items-center space-x-2 text-xs font-semibold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-900/30 text-left">
                <AlertCircle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-600/10 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Active editor form cancel/save helpers
  const cancelEdit = () => setEditingItem(null);

  return (
    <div className="pt-24 pb-28 min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-text-primary-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 dark:border-dark-border/60 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <LayoutDashboard size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Control Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer text-red-600 dark:text-red-400"
          >
            <LogOut size={14} />
            <span>Lock Portal</span>
          </button>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-2">
            {[
              { id: 'projects', label: 'Projects', icon: <FolderKanban size={16} /> },
              { id: 'blogs', label: 'Blog Posts', icon: <FileText size={16} /> },
              { id: 'skills', label: 'Skills Set', icon: <Cpu size={16} /> },
              { id: 'experience', label: 'Experience & Edu', icon: <Briefcase size={16} /> },
              { id: 'profile', label: 'Profile & About', icon: <User size={16} /> },
              { id: 'settings', label: 'Database & Settings', icon: <Settings size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingItem(null);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                    : 'text-slate-600 dark:text-text-secondary-dark hover:bg-white dark:hover:bg-dark-card border border-transparent hover:border-slate-200 dark:hover:border-dark-border'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Editor Workspace */}
          <main className="lg:col-span-9">
            <div className="p-6 sm:p-8 bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 rounded-2xl shadow-sm">
              <AnimatePresence mode="wait">
                
                {/* 1. PROJECTS TAB */}
                {activeTab === 'projects' && !editingItem && (
                  <motion.div key="p-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Projects ({data.projects.length})</h3>
                      <button
                        onClick={() => setEditingItem({ 
                          type: 'project', 
                          index: null, 
                          data: { 
                            title: '', slug: '', category: 'Machine Learning', shortDescription: '', tech: [], image: '', githubUrl: '', demoUrl: '',
                            caseStudy: { overview: '', problemStatement: '', dataset: '', approach: '', modelArchitecture: '', results: '', challenges: '', futureImprovements: '' } 
                          } 
                        })}
                        className="flex items-center space-x-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.projects.map((project, idx) => (
                        <div key={project.id || idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-dark-border/40 hover:border-slate-200 dark:hover:border-dark-border transition-all">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{project.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider bg-blue-500/5 px-2 py-0.5 rounded">
                                {project.category}
                              </span>
                              <span className="text-xs text-slate-400 dark:text-text-muted-dark font-mono">/{project.slug}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingItem({ type: 'project', index: idx, data: JSON.parse(JSON.stringify(project)) })}
                              className="p-2 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors cursor-pointer"
                              title="Edit Case Study"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteConfirm({
                                  message: `Are you sure you want to delete the project "${project.title}"?`,
                                  onConfirm: () => {
                                    const updated = data.projects.filter((_, i) => i !== idx);
                                    data.saveProjects(updated);
                                  }
                                });
                              }}
                              className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'projects' && editingItem && editingItem.type === 'project' && (
                  <motion.div key="p-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {editingItem.index !== null ? 'Edit Project' : 'New Project'}
                      </h3>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Project Title</label>
                        <input
                          type="text"
                          value={editingItem.data.title}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Slug (URL Segment)</label>
                        <input
                          type="text"
                          value={editingItem.data.slug}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, slug: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Category</label>
                        <select
                          value={editingItem.data.category}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        >
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Deep Learning">Deep Learning</option>
                          <option value="Web Apps">Web Apps</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Image Asset Path</label>
                        <input
                          type="text"
                          value={editingItem.data.image}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image: e.target.value }
                          })}
                          placeholder="/assets/projects/..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={editingItem.data.githubUrl}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, githubUrl: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Demo URL</label>
                        <input
                          type="url"
                          value={editingItem.data.demoUrl}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, demoUrl: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Short Description</label>
                      <textarea
                        value={editingItem.data.shortDescription}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, shortDescription: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                      />
                    </div>

                    {/* Tech Stack Tags */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Tech Stack Tags</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl">
                        {editingItem.data.tech.map((tag, tIdx) => (
                          <span key={tIdx} className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newTech = editingItem.data.tech.filter((_, i) => i !== tIdx);
                                setEditingItem({ ...editingItem, data: { ...editingItem.data, tech: newTech } });
                              }}
                              className="text-blue-500 hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <div className="flex items-center space-x-1 ml-2">
                          <input
                            type="text"
                            placeholder="Add tag"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newTagInput.trim()) {
                                e.preventDefault();
                                setEditingItem({ ...editingItem, data: { ...editingItem.data, tech: [...editingItem.data.tech, newTagInput.trim()] } });
                                setNewTagInput('');
                              }
                            }}
                            className="bg-transparent text-xs outline-none w-16"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Case Study Details */}
                    <div className="border-t border-slate-100 dark:border-dark-border/40 pt-4 space-y-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Case Study Specifications</h4>
                      
                      <div className="space-y-4">
                        {[
                          { key: 'overview', label: 'Executive Overview', rows: 3 },
                          { key: 'problemStatement', label: 'Problem Statement', rows: 2 },
                          { key: 'dataset', label: 'Dataset & Preprocessing', rows: 3 },
                          { key: 'approach', label: 'Approach Details', rows: 3 },
                          { key: 'modelArchitecture', label: 'Model Architecture Code / Tech specs', rows: 4, monospace: true },
                          { key: 'results', label: 'Results & Accuracy Metrics', rows: 2 },
                          { key: 'challenges', label: 'Challenges Encountered', rows: 3 },
                          { key: 'futureImprovements', label: 'Future Improvements', rows: 2 },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">{field.label}</label>
                            <textarea
                              value={editingItem.data.caseStudy[field.key]}
                              onChange={(e) => setEditingItem({
                                ...editingItem,
                                data: {
                                  ...editingItem.data,
                                  caseStudy: { ...editingItem.data.caseStudy, [field.key]: e.target.value }
                                }
                              })}
                              rows={field.rows}
                              className={`w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm ${
                                field.monospace ? 'font-mono' : ''
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          const updated = [...data.projects];
                          if (editingItem.index !== null) {
                            updated[editingItem.index] = { ...editingItem.data, id: editingItem.data.slug };
                          } else {
                            updated.push({ ...editingItem.data, id: editingItem.data.slug });
                          }
                          data.saveProjects(updated);
                          setEditingItem(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Project</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. BLOG TAB */}
                {activeTab === 'blogs' && !editingItem && (
                  <motion.div key="b-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Blog Posts ({data.blogPosts.length})</h3>
                      <button
                        onClick={() => setEditingItem({ 
                          type: 'blog', 
                          index: null, 
                          data: { 
                            title: '', slug: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
                            readTime: '5 min read', excerpt: '', body: '' 
                          } 
                        })}
                        className="flex items-center space-x-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>New Post</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.blogPosts.map((post, idx) => (
                        <div key={post.slug || idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-dark-border/40 hover:border-slate-200 dark:hover:border-dark-border transition-all">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{post.title}</h4>
                            <div className="flex items-center space-x-3 mt-1.5 text-xs text-slate-400 dark:text-text-muted-dark">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                              <span>•</span>
                              <span className="font-mono">/{post.slug}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingItem({ type: 'blog', index: idx, data: JSON.parse(JSON.stringify(post)) })}
                              className="p-2 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteConfirm({
                                  message: `Are you sure you want to delete the blog article "${post.title}"?`,
                                  onConfirm: () => {
                                    const updated = data.blogPosts.filter((_, i) => i !== idx);
                                    data.saveBlogPosts(updated);
                                  }
                                });
                              }}
                              className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'blogs' && editingItem && editingItem.type === 'blog' && (
                  <motion.div key="b-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {editingItem.index !== null ? 'Edit Blog Post' : 'New Blog Post'}
                      </h3>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Article Title</label>
                        <input
                          type="text"
                          value={editingItem.data.title}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Slug (URL segment)</label>
                        <input
                          type="text"
                          value={editingItem.data.slug}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, slug: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Date (Display string)</label>
                        <input
                          type="text"
                          value={editingItem.data.date}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, date: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Read Time</label>
                        <input
                          type="text"
                          value={editingItem.data.readTime}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, readTime: e.target.value }
                          })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Excerpt</label>
                      <textarea
                        value={editingItem.data.excerpt}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, excerpt: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Article Body (Markdown)</label>
                      <textarea
                        value={editingItem.data.body}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, body: e.target.value }
                        })}
                        rows={12}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm font-mono"
                      />
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          const updated = [...data.blogPosts];
                          if (editingItem.index !== null) {
                            updated[editingItem.index] = editingItem.data;
                          } else {
                            updated.push(editingItem.data);
                          }
                          data.saveBlogPosts(updated);
                          setEditingItem(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Article</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. SKILLS TAB */}
                {activeTab === 'skills' && (
                  <motion.div key="s-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technical Skill Categories</h3>
                      <button
                        onClick={() => {
                          const title = window.prompt("Enter new category name:");
                          if (title && title.trim()) {
                            data.saveSkillCategories([...data.skillCategories, { title: title.trim(), skills: [] }]);
                          }
                        }}
                        className="flex items-center space-x-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>New Category</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {data.skillCategories.map((category, catIdx) => (
                        <div key={catIdx} className="p-5 rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface/30">
                          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-dark-border/40 mb-4">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{category.title}</h4>
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => {
                                  const name = window.prompt("Skill name:");
                                  const lvlInput = window.prompt("Proficiency level (0-100):");
                                  const level = parseInt(lvlInput);
                                  const type = window.prompt("Type tag (e.g. language, ml, ds):") || "tools";
                                  if (name && !isNaN(level)) {
                                    const updated = [...data.skillCategories];
                                    updated[catIdx].skills.push({ name, level, type });
                                    data.saveSkillCategories(updated);
                                  }
                                }}
                                className="flex items-center space-x-1 px-2.5 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-500/20 cursor-pointer"
                              >
                                <Plus size={12} />
                                <span>Add Skill</span>
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({
                                    message: `Are you sure you want to delete the entire skill category "${category.title}"?`,
                                    onConfirm: () => {
                                      const updated = data.skillCategories.filter((_, i) => i !== catIdx);
                                      data.saveSkillCategories(updated);
                                    }
                                  });
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          {/* Skill List items */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {category.skills.map((skill, skIdx) => (
                              <div key={skIdx} className="flex justify-between items-center p-2 rounded-lg bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/20 text-xs text-slate-700 dark:text-text-secondary-dark font-medium">
                                <div>
                                  <span className="font-semibold text-slate-950 dark:text-white">{skill.name}</span> 
                                  <span className="ml-2 text-[10px] bg-slate-100 dark:bg-dark-surface px-1.5 py-0.5 rounded text-slate-400">{skill.level}% ({skill.type})</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => {
                                      const updatedName = window.prompt("Skill name:", skill.name);
                                      const updatedLevel = parseInt(window.prompt("Proficiency level (0-100):", skill.level));
                                      const updatedType = window.prompt("Type tag:", skill.type);
                                      if (updatedName && !isNaN(updatedLevel)) {
                                        const updated = [...data.skillCategories];
                                        updated[catIdx].skills[skIdx] = { name: updatedName, level: updatedLevel, type: updatedType || skill.type };
                                        data.saveSkillCategories(updated);
                                      }
                                    }}
                                    className="p-1 text-slate-400 hover:text-blue-500 rounded transition-colors cursor-pointer"
                                  >
                                    <Edit size={11} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const updated = [...data.skillCategories];
                                      updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== skIdx);
                                      data.saveSkillCategories(updated);
                                    }}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                                  >
                                    <X size={11} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 4. EXPERIENCE & EDU TAB - LIST VIEW */}
                {activeTab === 'experience' && !editingItem && (
                  <motion.div key="exp-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                    {/* Education Panel */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
                          <GraduationCap size={18} className="mr-2 text-blue-500" />
                          Education
                        </h4>
                        <button
                          onClick={() => {
                            const newEduItem = { institution: '', degree: '', duration: '', description: '', courses: [] };
                            setEditingItem({ type: 'education', index: null, data: newEduItem });
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Edu</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 dark:border-dark-border/40">
                            <div>
                              <h5 className="font-semibold text-slate-950 dark:text-white text-sm">{edu.degree}</h5>
                              <span className="text-xs text-slate-400 font-medium">{edu.institution} ({edu.duration})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setEditingItem({ type: 'education', index: idx, data: JSON.parse(JSON.stringify(edu)) })}
                                className="p-1.5 text-slate-400 hover:text-blue-500 rounded transition-colors cursor-pointer"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({
                                    message: `Are you sure you want to remove the education item "${edu.degree}"?`,
                                    onConfirm: () => {
                                      const updated = data.education.filter((_, i) => i !== idx);
                                      data.saveEducation(updated);
                                    }
                                  });
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-100 dark:border-dark-border/40" />

                    {/* Experience Panel */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
                          <Briefcase size={18} className="mr-2 text-cyan-500" />
                          Work Experience
                        </h4>
                        <button
                          onClick={() => {
                            const newExpItem = { role: '', company: '', duration: '', description: '', bullets: [] };
                            setEditingItem({ type: 'experience', index: null, data: newExpItem });
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Work</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {data.experience.map((exp, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 dark:border-dark-border/40">
                            <div>
                              <h5 className="font-semibold text-slate-950 dark:text-white text-sm">{exp.role}</h5>
                              <span className="text-xs text-slate-400 font-medium">{exp.company} ({exp.duration})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setEditingItem({ type: 'experience', index: idx, data: JSON.parse(JSON.stringify(exp)) })}
                                className="p-1.5 text-slate-400 hover:text-blue-500 rounded transition-colors cursor-pointer"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({
                                    message: `Are you sure you want to remove the work experience item "${exp.role} at ${exp.company}"?`,
                                    onConfirm: () => {
                                      const updated = data.experience.filter((_, i) => i !== idx);
                                      data.saveExperience(updated);
                                    }
                                  });
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-100 dark:border-dark-border/40" />

                    {/* Certifications Panel */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
                          <Award size={18} className="mr-2 text-purple-500" />
                          Certifications
                        </h4>
                        <button
                          onClick={() => {
                            const newCert = { name: '', issuer: '', date: 'Verified', link: '' };
                            setEditingItem({ type: 'certification', index: null, data: newCert });
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Cert</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(data.certifications || []).map((cert, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 dark:border-dark-border/40">
                            <div>
                              <h5 className="font-semibold text-slate-950 dark:text-white text-sm">{cert.name}</h5>
                              <span className="text-xs text-slate-400 font-medium">{cert.issuer}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setEditingItem({ type: 'certification', index: idx, data: JSON.parse(JSON.stringify(cert)) })}
                                className="p-1.5 text-slate-400 hover:text-blue-500 rounded transition-colors cursor-pointer"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({
                                    message: `Are you sure you want to remove the certification "${cert.name}"?`,
                                    onConfirm: () => {
                                      const updated = data.certifications.filter((_, i) => i !== idx);
                                      data.saveCertifications(updated);
                                    }
                                  });
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4a. EDUCATION FORM VIEW */}
                {activeTab === 'experience' && editingItem && editingItem.type === 'education' && (
                  <motion.div key="edu-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <GraduationCap size={20} className="mr-2 text-blue-500" />
                        {editingItem.index !== null ? 'Edit Education' : 'New Education'}
                      </h3>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Degree / Major</label>
                        <input
                          type="text"
                          placeholder="e.g. Bachelor of Science in Computer Science"
                          value={editingItem.data.degree}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, degree: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Institution</label>
                        <input
                          type="text"
                          placeholder="e.g. Stanford University"
                          value={editingItem.data.institution}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, institution: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 2022 - 2026"
                          value={editingItem.data.duration}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, duration: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Description</label>
                      <textarea
                        placeholder="Detail major studies, specializations, achievements..."
                        value={editingItem.data.description}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Courses Tags</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl">
                        {editingItem.data.courses.map((course, cIdx) => (
                          <span key={cIdx} className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <span>{course}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedCourses = editingItem.data.courses.filter((_, i) => i !== cIdx);
                                setEditingItem({ ...editingItem, data: { ...editingItem.data, courses: updatedCourses } });
                              }}
                              className="text-blue-500 hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <div className="flex items-center space-x-1 ml-2">
                          <input
                            type="text"
                            placeholder="Add course"
                            value={newCourseInput}
                            onChange={(e) => setNewCourseInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newCourseInput.trim()) {
                                e.preventDefault();
                                setEditingItem({ ...editingItem, data: { ...editingItem.data, courses: [...editingItem.data.courses, newCourseInput.trim()] } });
                                setNewCourseInput('');
                              }
                            }}
                            className="bg-transparent text-xs outline-none w-24"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          const updated = [...data.education];
                          if (editingItem.index !== null) {
                            updated[editingItem.index] = editingItem.data;
                          } else {
                            updated.push(editingItem.data);
                          }
                          data.saveEducation(updated);
                          setEditingItem(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Education</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4b. EXPERIENCE FORM VIEW */}
                {activeTab === 'experience' && editingItem && editingItem.type === 'experience' && (
                  <motion.div key="exp-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Briefcase size={20} className="mr-2 text-cyan-500" />
                        {editingItem.index !== null ? 'Edit Experience' : 'New Experience'}
                      </h3>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Role / Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Machine Learning Engineer"
                          value={editingItem.data.role}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, role: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Company / Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. Tech Solutions"
                          value={editingItem.data.company}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, company: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. Jun 2024 - Present"
                          value={editingItem.data.duration}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, duration: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Role Summary</label>
                      <textarea
                        placeholder="Overview of your core responsibilities..."
                        value={editingItem.data.description}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Key Achievements (Bullet points)</label>
                      <div className="space-y-3">
                        {editingItem.data.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex justify-between items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-white flex-grow pt-0.5">{bullet}</p>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedBullets = editingItem.data.bullets.filter((_, i) => i !== bIdx);
                                setEditingItem({ ...editingItem, data: { ...editingItem.data, bullets: updatedBullets } });
                              }}
                              className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-200 dark:hover:bg-dark-card transition-all shrink-0"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Describe a key accomplishment..."
                          value={newBulletInput}
                          onChange={(e) => setNewBulletInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newBulletInput.trim()) {
                              e.preventDefault();
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, bullets: [...editingItem.data.bullets, newBulletInput.trim()] }
                              });
                              setNewBulletInput('');
                            }
                          }}
                          className="flex-grow px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newBulletInput.trim()) {
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, bullets: [...editingItem.data.bullets, newBulletInput.trim()] }
                              });
                              setNewBulletInput('');
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Add Bullet
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          const updated = [...data.experience];
                          if (editingItem.index !== null) {
                            updated[editingItem.index] = editingItem.data;
                          } else {
                            updated.push(editingItem.data);
                          }
                          data.saveExperience(updated);
                          setEditingItem(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Experience</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4c. CERTIFICATION FORM VIEW */}
                {activeTab === 'experience' && editingItem && editingItem.type === 'certification' && (
                  <motion.div key="cert-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Award size={20} className="mr-2 text-purple-500" />
                        {editingItem.index !== null ? 'Edit Certification' : 'New Certification'}
                      </h3>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Certification Name / Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Supervised Machine Learning"
                          value={editingItem.data.name || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Issuer</label>
                        <input
                          type="text"
                          placeholder="e.g. DeepLearning.AI"
                          value={editingItem.data.issuer || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, issuer: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Date (e.g. Verified, Dec 2025)</label>
                        <input
                          type="text"
                          placeholder="e.g. Verified"
                          value={editingItem.data.date || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Credential Link / Verification Link</label>
                        <input
                          type="text"
                          placeholder="e.g. /assets/certificates/cert_123.jpg or http://..."
                          value={editingItem.data.link || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, link: e.target.value } })}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          const updated = [...data.certifications];
                          if (editingItem.index !== null && editingItem.index !== undefined) {
                            updated[editingItem.index] = editingItem.data;
                          } else {
                            updated.push(editingItem.data);
                          }
                          data.saveCertifications(updated);
                          setEditingItem(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Certification</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 5. PROFILE & ABOUT TAB */}
                {activeTab === 'profile' && profileForm && (
                  <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border/40 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile & About Settings</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Display Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Headline / Subtitle</label>
                        <input
                          type="text"
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Seeking Status Badge</label>
                        <input
                          type="text"
                          value={profileForm.seekingStatus}
                          onChange={(e) => setProfileForm({ ...profileForm, seekingStatus: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Profile Image Path / URL</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={profileForm.profileImage}
                            onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                          />
                          {profileForm.profileImage && (
                            <img
                              src={profileForm.profileImage}
                              alt="Profile Preview"
                              className="w-10 h-10 rounded-full object-cover border border-slate-200/50 shrink-0"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">CV / Resume File Path or URL</label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="e.g. /assets/resume.pdf or external URL"
                              value={profileForm.resumeUrl || ''}
                              onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                            />
                            <label className="shrink-0 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all cursor-pointer">
                              <Upload size={14} />
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                      alert("File is too large! Please upload a resume under 2MB to ensure it saves correctly in browser storage.");
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      setProfileForm({ ...profileForm, resumeUrl: event.target.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {profileForm.resumeUrl && (
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span className="truncate max-w-[200px]">
                                Active CV: {profileForm.resumeUrl.startsWith('data:') ? 'Uploaded PDF Document (Base64)' : profileForm.resumeUrl}
                              </span>
                              <button
                                type="button"
                                onClick={() => setProfileForm({ ...profileForm, resumeUrl: '' })}
                                className="text-red-500 hover:text-red-600 font-semibold"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Mission Title</label>
                        <input
                          type="text"
                          value={profileForm.missionTitle}
                          onChange={(e) => setProfileForm({ ...profileForm, missionTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Mission Description</label>
                        <textarea
                          value={profileForm.missionDescription}
                          onChange={(e) => setProfileForm({ ...profileForm, missionDescription: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    {/* SubTitles list */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Roles / Subtitles (Hero Carousel)</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl">
                        {profileForm.subTitles.map((sub, sIdx) => (
                          <span key={sIdx} className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <span>{sub}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newSubs = profileForm.subTitles.filter((_, i) => i !== sIdx);
                                setProfileForm({ ...profileForm, subTitles: newSubs });
                              }}
                              className="text-blue-500 hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add subtitle + enter"
                          value={newSubTitleInput}
                          onChange={(e) => setNewSubTitleInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newSubTitleInput.trim()) {
                              e.preventDefault();
                              setProfileForm({
                                ...profileForm,
                                subTitles: [...profileForm.subTitles, newSubTitleInput.trim()]
                              });
                              setNewSubTitleInput('');
                            }
                          }}
                          className="bg-transparent text-xs outline-none w-32 ml-2"
                        />
                      </div>
                    </div>

                    {/* Bio Paragraphs */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">About Me Bio Paragraphs</label>
                      <div className="space-y-3">
                        {profileForm.bioParagraphs.map((para, pIdx) => (
                          <div key={pIdx} className="flex items-start space-x-3">
                            <textarea
                              value={para}
                              onChange={(e) => {
                                const newParas = [...profileForm.bioParagraphs];
                                newParas[pIdx] = e.target.value;
                                setProfileForm({ ...profileForm, bioParagraphs: newParas });
                              }}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newParas = profileForm.bioParagraphs.filter((_, i) => i !== pIdx);
                                setProfileForm({ ...profileForm, bioParagraphs: newParas });
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setProfileForm({
                            ...profileForm,
                            bioParagraphs: [...profileForm.bioParagraphs, '']
                          })}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-500/20 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Paragraph</span>
                        </button>
                      </div>
                    </div>

                    {/* Interests focus list */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider mb-2">Core Focus Areas / Interests</label>
                      <div className="space-y-3">
                        {profileForm.interests.map((interest, iIdx) => (
                          <div key={iIdx} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-xl border border-slate-100 dark:border-dark-border/40">
                            <div className="md:col-span-2">
                              <input
                                type="text"
                                value={interest.name}
                                onChange={(e) => {
                                  const newInterests = [...profileForm.interests];
                                  newInterests[iIdx].name = e.target.value;
                                  setProfileForm({ ...profileForm, interests: newInterests });
                                }}
                                className="w-full px-2 py-1.5 rounded bg-white dark:bg-dark-card border text-xs"
                                placeholder="Interest name"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <select
                                value={interest.type}
                                onChange={(e) => {
                                  const newInterests = [...profileForm.interests];
                                  newInterests[iIdx].type = e.target.value;
                                  setProfileForm({ ...profileForm, interests: newInterests });
                                }}
                                className="px-2 py-1.5 rounded bg-white dark:bg-dark-card border text-xs flex-grow"
                              >
                                <option value="ds">Data Science (Blue)</option>
                                <option value="ml">Machine Learning (Cyan)</option>
                                <option value="dl">Deep Learning (Purple)</option>
                                <option value="genai">Generative AI (Green)</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => {
                                  const newInterests = profileForm.interests.filter((_, i) => i !== iIdx);
                                  setProfileForm({ ...profileForm, interests: newInterests });
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setProfileForm({
                            ...profileForm,
                            interests: [...profileForm.interests, { name: '', type: 'ds' }]
                          })}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-500/20 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Add Interest</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border-t border-slate-100 dark:border-dark-border/40 pt-4">
                      <button
                        onClick={() => {
                          data.saveProfileData(profileForm);
                          alert("Profile & About section updated successfully!");
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Save Profile Details</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 5. DATABASE & SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                    
                    {/* Data Export section */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Export & Back up Data</h4>
                      <p className="text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm">
                        Export your current database edits to javascript files. Replace the files in <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-surface font-mono">src/data/</code> to save edits permanently.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: 'projects', label: 'projects.js', desc: 'Contains showcase items & case studies' },
                          { key: 'blog', label: 'blog.js', desc: 'Contains technical articles details' },
                          { key: 'skills', label: 'skills.js', desc: 'Contains skills categories & stack details' },
                          { key: 'experience', label: 'experience.js', desc: 'Contains education, certifications, and work' },
                          { key: 'about', label: 'about.js', desc: 'Contains profile name, photo, bio paragraphs, and interests' },
                        ].map((item) => (
                          <div key={item.key} className="p-4 rounded-xl border border-slate-100 dark:border-dark-border/40 flex justify-between items-center">
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white text-sm">{item.label}</span>
                              <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleExport(item.key)}
                              className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 border border-blue-200 dark:border-blue-900/30 rounded-xl cursor-pointer"
                              title="Download File"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-100 dark:border-dark-border/40" />

                    {/* Password Config Generator Section */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">Password Hash Generator</h4>
                      <p className="text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm">
                        Want to change your admin password? Type a new password below to generate its SHA-256 hash. Then, copy and paste this hash into the <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-surface font-mono">src/config/admin.js</code> file.
                      </p>

                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Type new password"
                          value={hashInput}
                          onChange={(e) => setHashInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface text-slate-900 dark:text-white text-sm"
                        />
                        {generatedHash && (
                          <div className="p-3 bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Generated Hash (SHA-256)</span>
                            <code className="text-xs break-all font-mono select-all text-blue-600 dark:text-blue-400">{generatedHash}</code>
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className="border-slate-100 dark:border-dark-border/40" />

                    {/* Reset Database section */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-red-600 dark:text-red-400 text-base">Danger Zone</h4>
                      <p className="text-slate-500 dark:text-text-secondary-dark text-xs sm:text-sm">
                        Resetting will clear all your browser overrides in local storage. The portfolio data will restore back to the original compiled static file contents.
                      </p>

                      <div>
                        <button
                          onClick={() => {
                            setDeleteConfirm({
                              message: "Are you absolutely sure you want to discard all local database edits? This cannot be undone.",
                              onConfirm: () => {
                                data.resetAllData();
                                alert("Database restored to defaults successfully.");
                                window.location.reload();
                              }
                            });
                          }}
                          className="flex items-center space-x-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <RotateCcw size={14} />
                          <span>Discard Edits & Restore Defaults</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </main>

        </div>

      </div>

      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border p-6 shadow-xl text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Confirm Action</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-text-secondary-dark">
                {deleteConfirm.message}
              </p>
              <div className="mt-6 flex space-x-3 justify-center">
                <button
                  id="modal-confirm-btn"
                  onClick={() => {
                    deleteConfirm.onConfirm();
                    setDeleteConfirm(null);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Confirm
                </button>
                <button
                  id="modal-cancel-btn"
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-dark-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
