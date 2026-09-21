import React, { useState, useEffect } from 'react';
import {
  Lock, Eye, EyeOff, LayoutDashboard, FolderKanban, FileText, Cpu,
  Briefcase, Settings, Plus, Trash2, Edit, RotateCcw, Download,
  Check, X, LogOut, GraduationCap, Award, AlertCircle, User, Upload
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ADMIN_CONFIG } from '../../config/admin';

/* ── SHA-256 helper ── */
const sha256 = async (str) => {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch { return ''; }
};

/* ── Shared field component ── */
const Field = ({ label, error, children }) => (
  <div>
    <label style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: 'var(--c-rust)', display: 'block', marginBottom: 4, fontWeight: 600 }}>
      {label}
    </label>
    {children}
    {error && (
      <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.8rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
        <AlertCircle size={10} /> {error}
      </span>
    )}
  </div>
);

/* ── Shared input / textarea styles ── */
const inp = 'w-full px-3 py-2 text-sm rounded border outline-none transition-colors';
const inpStyle = {
  background: 'var(--c-bg)',
  border: '1px solid var(--c-border)',
  color: 'var(--c-ink)',
  borderRadius: 6,
  fontFamily: 'var(--font-sans)',
};
const inpFocus = (e) => { e.target.style.borderColor = 'var(--c-rust)'; };
const inpBlur  = (e) => { e.target.style.borderColor = 'var(--c-border)'; };

const NbInput = ({ value, onChange, placeholder, type = 'text', mono = false, required }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    onFocus={inpFocus}
    onBlur={inpBlur}
    className={inp}
    style={{ ...inpStyle, fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)' }}
  />
);

const NbTextarea = ({ value, onChange, placeholder, rows = 3, mono = false }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    onFocus={inpFocus}
    onBlur={inpBlur}
    className={`${inp} resize-none`}
    style={{ ...inpStyle, fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)' }}
  />
);

const NbSelect = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    onFocus={inpFocus}
    onBlur={inpBlur}
    className={inp}
    style={inpStyle}
  >
    {children}
  </select>
);

/* ── Row wrapper for list items ── */
const Row = ({ children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', borderRadius: 6,
    border: '1px solid var(--c-border)', background: 'var(--c-card)',
    gap: 12,
  }}>
    {children}
  </div>
);

/* ── Section heading inside editor ── */
const EditorTitle = ({ icon, title, onClose }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px dashed var(--c-border)', paddingBottom: 14, marginBottom: 20 }}>
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--c-ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon} {title}
    </h3>
    {onClose && (
      <button onClick={onClose} style={{ color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }}>
        <X size={18} />
      </button>
    )}
  </div>
);

/* ── Save / Cancel buttons ── */
const SaveBar = ({ onSave, onCancel, label = 'Save' }) => (
  <div style={{ display: 'flex', gap: 10, borderTop: '1px dashed var(--c-border)', paddingTop: 16, marginTop: 8 }}>
    <button onClick={onSave} className="btn-ink" style={{ fontSize: '0.78rem' }}>
      <Check size={13} /> {label}
    </button>
    {onCancel && (
      <button onClick={onCancel} className="btn-outline" style={{ fontSize: '0.78rem' }}>Cancel</button>
    )}
  </div>
);

/* ── Tag pill ── */
const TagPill = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontFamily: 'var(--font-hand)', fontSize: '0.88rem',
    padding: '2px 10px', borderRadius: 2,
    border: '1px solid var(--c-border)', background: 'var(--c-bg-warm)',
    color: 'var(--c-mid)',
  }}>
    {label}
    <button type="button" onClick={onRemove} style={{ color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
      <X size={11} />
    </button>
  </span>
);

/* ── Tag input box ── */
const TagBox = ({ tags, onAdd, onRemove, placeholder, inputValue, onInputChange }) => (
  <div style={{
    display: 'flex', flexWrap: 'wrap', gap: 8,
    padding: '10px 12px', borderRadius: 6,
    border: '1px solid var(--c-border)', background: 'var(--c-bg)',
    minHeight: 46,
  }}>
    {tags.map((t, i) => <TagPill key={i} label={t} onRemove={() => onRemove(i)} />)}
    <input
      type="text"
      value={inputValue}
      onChange={onInputChange}
      placeholder={placeholder}
      style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: 'var(--c-mid)', minWidth: 80 }}
      onKeyDown={e => { if (e.key === 'Enter' && inputValue.trim()) { e.preventDefault(); onAdd(inputValue.trim()); } }}
    />
  </div>
);

/* ══════════════════════════════════════════
   MAIN ADMIN COMPONENT
══════════════════════════════════════════ */
const Admin = () => {
  const data = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    sessionStorage.getItem('portfolio_admin_auth') === 'true'
  );
  const [password, setPassword]       = useState('');
  const [showPw, setShowPw]           = useState(false);
  const [loginError, setLoginError]   = useState('');
  const [activeTab, setActiveTab]     = useState('projects');
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast]             = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Tag / bullet / course input state
  const [tagInput, setTagInput]       = useState('');
  const [bulletInput, setBulletInput] = useState('');
  const [courseInput, setCourseInput] = useState('');
  const [subTitleInput, setSubTitleInput] = useState('');

  // Profile form — initialise immediately from data (fixes the reload bug)
  const [profileForm, setProfileForm] = useState(null);
  useEffect(() => {
    if (data.profileData) setProfileForm(JSON.parse(JSON.stringify(data.profileData)));
  }, [data.profileData]);

  // Password hash utility
  const [hashInput, setHashInput]     = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  useEffect(() => {
    if (hashInput) sha256(hashInput).then(setGeneratedHash);
    else setGeneratedHash('');
  }, [hashInput]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* Auth */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const h = await sha256(password);
    if (h === ADMIN_CONFIG.passwordHash) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
    } else {
      setLoginError('Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  /* Export */
  const exportFile = (type) => {
    const map = {
      projects: ['projects.js', data.getProjectsExportCode()],
      blog:     ['blog.js',     data.getBlogExportCode()],
      skills:   ['skills.js',   data.getSkillsExportCode()],
      experience:['experience.js', data.getExperienceExportCode()],
      about:    ['about.js',    data.getAboutExportCode()],
    };
    const [name, content] = map[type] || [];
    if (!name) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type: 'text/javascript' }));
    a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  /* ── Login screen ── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-16"
        style={{ background: 'var(--c-bg)' }}>
        <div className="w-full max-w-sm mx-4 paper-card p-10 text-center">
          {/* Spiral holes decoration */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid var(--c-border)', background: 'var(--c-bg-aged)' }} />
            ))}
          </div>

          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--c-rust-bg)', border: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--c-rust)' }}>
            <Lock size={20} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 6 }}>
            Admin Portal
          </h2>
          <p className="hand-note" style={{ fontSize: '0.9rem', marginBottom: 28 }}>
            enter password to unlock the dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                onFocus={inpFocus} onBlur={inpBlur}
                className={inp}
                style={{ ...inpStyle, paddingRight: 40 }}
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {loginError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 4, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.8rem', fontFamily: 'var(--font-hand)' }}>
                <AlertCircle size={13} /> {loginError}
              </div>
            )}

            <button type="submit" className="btn-ink w-full justify-center">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const cancelEdit = () => { setEditingItem(null); setTagInput(''); setBulletInput(''); setCourseInput(''); };

  const TABS = [
    { id: 'projects',   label: 'Projects',         icon: <FolderKanban size={15} /> },
    { id: 'blogs',      label: 'Blog Posts',        icon: <FileText size={15} /> },
    { id: 'skills',     label: 'Skills',            icon: <Cpu size={15} /> },
    { id: 'experience', label: 'Experience & Edu',  icon: <Briefcase size={15} /> },
    { id: 'profile',    label: 'Profile & About',   icon: <User size={15} /> },
    { id: 'settings',   label: 'Settings',          icon: <Settings size={15} /> },
  ];

  /* ── Dashboard ── */
  return (
    <div className="nb-section" style={{ background: 'var(--c-bg)', minHeight: '100vh', paddingTop: '7rem' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px dashed var(--c-border)', paddingBottom: 20, marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span className="section-num" style={{ display: 'block', marginBottom: 4 }}>Admin —</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.1 }}>
              Dashboard
            </h1>
          </div>
          <button onClick={handleLogout} className="btn-outline" style={{ fontSize: '0.78rem', color: '#ef4444', borderColor: '#fca5a5' }}>
            <LogOut size={13} /> Lock Portal
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-1.5">
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 4, cursor: 'pointer',
                    border: `1px solid ${active ? 'var(--c-rust)' : 'var(--c-border)'}`,
                    background: active ? 'var(--c-rust-bg)' : 'var(--c-card)',
                    color: active ? 'var(--c-rust)' : 'var(--c-mid)',
                    fontFamily: 'var(--font-hand)', fontSize: '1rem', fontWeight: active ? 700 : 500,
                    transition: 'all 0.15s',
                  }}>
                  {tab.icon} {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Main workspace */}
          <main className="lg:col-span-9">
            <div className="paper-card p-6 sm:p-8">

              {/* ══ 1. PROJECTS ══ */}
              {activeTab === 'projects' && !editingItem && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600 }}>
                      Projects ({data.projects.length})
                    </h3>
                    <button className="btn-ink" style={{ fontSize: '0.75rem' }}
                      onClick={() => setEditingItem({ type: 'project', index: null, data: { title: '', slug: '', category: 'Machine Learning', shortDescription: '', tech: [], image: '', githubUrl: '', demoUrl: '', caseStudy: { overview: '', problemStatement: '', dataset: '', approach: '', modelArchitecture: '', results: '', challenges: '', futureImprovements: '' } } })}>
                      <Plus size={13} /> Add Project
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.projects.map((p, i) => (
                      <Row key={p.id || i}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--c-ink)', fontWeight: 600 }}>{p.title}</p>
                          <span className="hand-note" style={{ fontSize: '0.78rem' }}>{p.category} · <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>/{p.slug}</span></span>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button onClick={() => setEditingItem({ type: 'project', index: i, data: JSON.parse(JSON.stringify(p)) })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={14} /></button>
                          <button onClick={() => setDeleteConfirm({ message: `Delete project "${p.title}"?`, onConfirm: () => { data.saveProjects(data.projects.filter((_, j) => j !== i)); showToast('Project deleted'); } })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={14} /></button>
                        </div>
                      </Row>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && editingItem?.type === 'project' && (
                <div className="space-y-5">
                  <EditorTitle icon={<FolderKanban size={17} style={{ color: 'var(--c-rust)' }} />} title={editingItem.index !== null ? 'Edit Project' : 'New Project'} onClose={cancelEdit} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[['Title', 'title'], ['Slug', 'slug', true], ['Image path', 'image'], ['GitHub URL', 'githubUrl'], ['Demo URL', 'demoUrl']].map(([lbl, key, mono]) => (
                      <Field key={key} label={lbl}>
                        <NbInput value={editingItem.data[key]} mono={mono} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} />
                      </Field>
                    ))}
                    <Field label="Category">
                      <NbSelect value={editingItem.data.category} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}>
                        {['Machine Learning', 'Data Science', 'Deep Learning', 'Web Apps'].map(c => <option key={c}>{c}</option>)}
                      </NbSelect>
                    </Field>
                  </div>
                  <Field label="Short description">
                    <NbTextarea rows={2} value={editingItem.data.shortDescription} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, shortDescription: e.target.value } })} />
                  </Field>
                  <Field label="Tech stack (press Enter to add)">
                    <TagBox tags={editingItem.data.tech} inputValue={tagInput} onInputChange={e => setTagInput(e.target.value)}
                      onAdd={v => { setEditingItem({ ...editingItem, data: { ...editingItem.data, tech: [...editingItem.data.tech, v] } }); setTagInput(''); }}
                      onRemove={i => setEditingItem({ ...editingItem, data: { ...editingItem.data, tech: editingItem.data.tech.filter((_, j) => j !== i) } })}
                      placeholder="Add tag + Enter" />
                  </Field>
                  <div style={{ borderTop: '1px dashed var(--c-border)', paddingTop: 16 }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 14 }}>Case Study</p>
                    <div className="space-y-4">
                      {[['Overview', 'overview', 3], ['Problem Statement', 'problemStatement', 2], ['Dataset', 'dataset', 3], ['Approach', 'approach', 3], ['Model Architecture', 'modelArchitecture', 4, true], ['Results', 'results', 2], ['Challenges', 'challenges', 3], ['Future Improvements', 'futureImprovements', 2]].map(([lbl, key, rows, mono]) => (
                        <Field key={key} label={lbl}>
                          <NbTextarea rows={rows} mono={mono} value={editingItem.data.caseStudy[key]} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, caseStudy: { ...editingItem.data.caseStudy, [key]: e.target.value } } })} />
                        </Field>
                      ))}
                    </div>
                  </div>
                  <SaveBar label="Save Project" onSave={() => {
                    const updated = [...data.projects];
                    if (editingItem.index !== null) updated[editingItem.index] = { ...editingItem.data, id: editingItem.data.slug };
                    else updated.push({ ...editingItem.data, id: editingItem.data.slug });
                    data.saveProjects(updated); showToast('Project saved!'); cancelEdit();
                  }} onCancel={cancelEdit} />
                </div>
              )}

              {/* ══ 2. BLOGS ══ */}
              {activeTab === 'blogs' && !editingItem && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600 }}>Blog Posts ({data.blogPosts.length})</h3>
                    <button className="btn-ink" style={{ fontSize: '0.75rem' }}
                      onClick={() => setEditingItem({ type: 'blog', index: null, data: { title: '', slug: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), readTime: '5 min read', excerpt: '', body: '' } })}>
                      <Plus size={13} /> New Post
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.blogPosts.map((post, i) => (
                      <Row key={post.slug || i}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--c-ink)', fontWeight: 600 }}>{post.title}</p>
                          <span className="hand-note" style={{ fontSize: '0.78rem' }}>{post.date} · {post.readTime}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button onClick={() => setEditingItem({ type: 'blog', index: i, data: JSON.parse(JSON.stringify(post)) })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={14} /></button>
                          <button onClick={() => setDeleteConfirm({ message: `Delete post "${post.title}"?`, onConfirm: () => { data.saveBlogPosts(data.blogPosts.filter((_, j) => j !== i)); showToast('Post deleted'); } })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={14} /></button>
                        </div>
                      </Row>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'blogs' && editingItem?.type === 'blog' && (
                <div className="space-y-5">
                  <EditorTitle icon={<FileText size={17} style={{ color: 'var(--c-rust)' }} />} title={editingItem.index !== null ? 'Edit Post' : 'New Post'} onClose={cancelEdit} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[['Title', 'title'], ['Slug', 'slug', true], ['Date', 'date'], ['Read Time', 'readTime']].map(([lbl, key, mono]) => (
                      <Field key={key} label={lbl}><NbInput value={editingItem.data[key]} mono={mono} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} /></Field>
                    ))}
                  </div>
                  <Field label="Excerpt"><NbTextarea rows={2} value={editingItem.data.excerpt} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerpt: e.target.value } })} /></Field>
                  <Field label="Body (Markdown)"><NbTextarea rows={12} mono value={editingItem.data.body} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, body: e.target.value } })} /></Field>
                  <SaveBar label="Save Post" onSave={() => {
                    const updated = [...data.blogPosts];
                    if (editingItem.index !== null) updated[editingItem.index] = editingItem.data;
                    else updated.push(editingItem.data);
                    data.saveBlogPosts(updated); showToast('Post saved!'); cancelEdit();
                  }} onCancel={cancelEdit} />
                </div>
              )}

              {/* ══ 3. SKILLS ══ */}
              {activeTab === 'skills' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600 }}>Skill Categories</h3>
                    <button className="btn-ink" style={{ fontSize: '0.75rem' }}
                      onClick={() => { const t = window.prompt('Category name:'); if (t?.trim()) data.saveSkillCategories([...data.skillCategories, { title: t.trim(), skills: [] }]); }}>
                      <Plus size={13} /> New Category
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.skillCategories.map((cat, ci) => (
                      <div key={ci} style={{ border: '1px solid var(--c-border)', borderRadius: 6, padding: 16, background: 'var(--c-bg-warm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 10, borderBottom: '1px dashed var(--c-border)' }}>
                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--c-ink)', fontWeight: 600 }}>{cat.title}</p>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn-outline" style={{ fontSize: '0.72rem', padding: '3px 10px' }}
                              onClick={() => { const n = window.prompt('Skill name:'); const l = parseInt(window.prompt('Level (0–100):')); const t = window.prompt('Type (language/ml/ds/tools):') || 'tools'; if (n && !isNaN(l)) { const u = [...data.skillCategories]; u[ci].skills.push({ name: n, level: l, type: t }); data.saveSkillCategories(u); } }}>
                              <Plus size={11} /> Add Skill
                            </button>
                            <button onClick={() => setDeleteConfirm({ message: `Delete category "${cat.title}"?`, onConfirm: () => data.saveSkillCategories(data.skillCategories.filter((_, j) => j !== ci)) })} style={{ padding: 5, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={13} /></button>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 8 }}>
                          {cat.skills.map((sk, si) => (
                            <div key={si} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderRadius: 4, border: '1px solid var(--c-border)', background: 'var(--c-card)' }}>
                              <div>
                                <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.92rem', color: 'var(--c-ink)', fontWeight: 600 }}>{sk.name}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--c-faint)', marginLeft: 6 }}>{sk.level}%</span>
                              </div>
                              <div style={{ display: 'flex', gap: 3 }}>
                                <button onClick={() => { const n = window.prompt('Name:', sk.name); const l = parseInt(window.prompt('Level:', sk.level)); const t = window.prompt('Type:', sk.type); if (n && !isNaN(l)) { const u = [...data.skillCategories]; u[ci].skills[si] = { name: n, level: l, type: t || sk.type }; data.saveSkillCategories(u); } }} style={{ padding: 4, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={12} /></button>
                                <button onClick={() => { const u = [...data.skillCategories]; u[ci].skills = u[ci].skills.filter((_, j) => j !== si); data.saveSkillCategories(u); }} style={{ padding: 4, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><X size={12} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══ 4. EXPERIENCE & EDUCATION ══ */}
              {activeTab === 'experience' && !editingItem && (
                <div className="space-y-8">
                  {/* Education */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}><GraduationCap size={16} style={{ color: 'var(--c-rust)' }} /> Education</h4>
                      <button className="btn-ink" style={{ fontSize: '0.72rem' }} onClick={() => setEditingItem({ type: 'education', index: null, data: { institution: '', degree: '', duration: '', description: '', courses: [] } })}><Plus size={12} /> Add</button>
                    </div>
                    <div className="space-y-2">
                      {data.education.map((edu, i) => (
                        <Row key={i}>
                          <div><p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', color: 'var(--c-ink)', fontWeight: 600 }}>{edu.degree}</p><span className="hand-note" style={{ fontSize: '0.76rem' }}>{edu.institution} · {edu.duration}</span></div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button onClick={() => setEditingItem({ type: 'education', index: i, data: JSON.parse(JSON.stringify(edu)) })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={13} /></button>
                            <button onClick={() => setDeleteConfirm({ message: `Delete "${edu.degree}"?`, onConfirm: () => { data.saveEducation(data.education.filter((_, j) => j !== i)); showToast('Education deleted'); } })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={13} /></button>
                          </div>
                        </Row>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--c-border)' }} />

                  {/* Experience */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}><Briefcase size={16} style={{ color: 'var(--c-rust)' }} /> Work Experience</h4>
                      <button className="btn-ink" style={{ fontSize: '0.72rem' }} onClick={() => setEditingItem({ type: 'experience', index: null, data: { role: '', company: '', duration: '', description: '', bullets: [] } })}><Plus size={12} /> Add</button>
                    </div>
                    <div className="space-y-2">
                      {data.experience.map((exp, i) => (
                        <Row key={i}>
                          <div><p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', color: 'var(--c-ink)', fontWeight: 600 }}>{exp.role}</p><span className="hand-note" style={{ fontSize: '0.76rem' }}>{exp.company} · {exp.duration}</span></div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button onClick={() => setEditingItem({ type: 'experience', index: i, data: JSON.parse(JSON.stringify(exp)) })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={13} /></button>
                            <button onClick={() => setDeleteConfirm({ message: `Delete "${exp.role}"?`, onConfirm: () => { data.saveExperience(data.experience.filter((_, j) => j !== i)); showToast('Experience deleted'); } })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={13} /></button>
                          </div>
                        </Row>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--c-border)' }} />

                  {/* Certifications */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}><Award size={16} style={{ color: 'var(--c-rust)' }} /> Certifications</h4>
                      <button className="btn-ink" style={{ fontSize: '0.72rem' }} onClick={() => setEditingItem({ type: 'certification', index: null, data: { name: '', issuer: '', date: 'Verified', link: '' } })}><Plus size={12} /> Add</button>
                    </div>
                    <div className="space-y-2">
                      {(data.certifications || []).map((cert, i) => (
                        <Row key={i}>
                          <div><p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', color: 'var(--c-ink)', fontWeight: 600 }}>{cert.name}</p><span className="hand-note" style={{ fontSize: '0.76rem' }}>{cert.issuer}</span></div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button onClick={() => setEditingItem({ type: 'certification', index: i, data: JSON.parse(JSON.stringify(cert)) })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Edit size={13} /></button>
                            <button onClick={() => setDeleteConfirm({ message: `Delete cert "${cert.name}"?`, onConfirm: () => { data.saveCertifications(data.certifications.filter((_, j) => j !== i)); showToast('Cert deleted'); } })} style={{ padding: 6, color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}><Trash2 size={13} /></button>
                          </div>
                        </Row>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education form */}
              {activeTab === 'experience' && editingItem?.type === 'education' && (
                <div className="space-y-5">
                  <EditorTitle icon={<GraduationCap size={17} style={{ color: 'var(--c-rust)' }} />} title={editingItem.index !== null ? 'Edit Education' : 'New Education'} onClose={cancelEdit} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[['Degree', 'degree'], ['Institution', 'institution'], ['Duration', 'duration']].map(([lbl, key]) => (
                      <Field key={key} label={lbl}><NbInput value={editingItem.data[key]} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} /></Field>
                    ))}
                  </div>
                  <Field label="Description"><NbTextarea rows={3} value={editingItem.data.description} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })} /></Field>
                  <Field label="Courses (press Enter to add)">
                    <TagBox tags={editingItem.data.courses} inputValue={courseInput} onInputChange={e => setCourseInput(e.target.value)}
                      onAdd={v => { setEditingItem({ ...editingItem, data: { ...editingItem.data, courses: [...editingItem.data.courses, v] } }); setCourseInput(''); }}
                      onRemove={i => setEditingItem({ ...editingItem, data: { ...editingItem.data, courses: editingItem.data.courses.filter((_, j) => j !== i) } })}
                      placeholder="Add course + Enter" />
                  </Field>
                  <SaveBar label="Save Education" onSave={() => {
                    const updated = [...data.education];
                    if (editingItem.index !== null) updated[editingItem.index] = editingItem.data; else updated.push(editingItem.data);
                    data.saveEducation(updated); showToast('Education saved!'); cancelEdit();
                  }} onCancel={cancelEdit} />
                </div>
              )}

              {/* Experience form */}
              {activeTab === 'experience' && editingItem?.type === 'experience' && (
                <div className="space-y-5">
                  <EditorTitle icon={<Briefcase size={17} style={{ color: 'var(--c-rust)' }} />} title={editingItem.index !== null ? 'Edit Experience' : 'New Experience'} onClose={cancelEdit} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[['Role', 'role'], ['Company', 'company'], ['Duration', 'duration']].map(([lbl, key]) => (
                      <Field key={key} label={lbl}><NbInput value={editingItem.data[key]} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} /></Field>
                    ))}
                  </div>
                  <Field label="Summary"><NbTextarea rows={2} value={editingItem.data.description} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })} /></Field>
                  <Field label="Key highlights (press Enter to add)">
                    <div className="space-y-2 mb-2">
                      {editingItem.data.bullets.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px', borderRadius: 4, border: '1px solid var(--c-border)', background: 'var(--c-bg)' }}>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-mid)', flex: 1 }}>{b}</p>
                          <button onClick={() => setEditingItem({ ...editingItem, data: { ...editingItem.data, bullets: editingItem.data.bullets.filter((_, j) => j !== i) } })} style={{ color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}><Trash2 size={12} /></button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input value={bulletInput} onChange={e => setBulletInput(e.target.value)} placeholder="Add bullet point…"
                        onFocus={inpFocus} onBlur={inpBlur}
                        onKeyDown={e => { if (e.key === 'Enter' && bulletInput.trim()) { e.preventDefault(); setEditingItem({ ...editingItem, data: { ...editingItem.data, bullets: [...editingItem.data.bullets, bulletInput.trim()] } }); setBulletInput(''); } }}
                        style={{ ...inpStyle, flex: 1, padding: '8px 12px' }} />
                      <button className="btn-ink" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                        onClick={() => { if (bulletInput.trim()) { setEditingItem({ ...editingItem, data: { ...editingItem.data, bullets: [...editingItem.data.bullets, bulletInput.trim()] } }); setBulletInput(''); } }}>
                        Add
                      </button>
                    </div>
                  </Field>
                  <SaveBar label="Save Experience" onSave={() => {
                    const updated = [...data.experience];
                    if (editingItem.index !== null) updated[editingItem.index] = editingItem.data; else updated.push(editingItem.data);
                    data.saveExperience(updated); showToast('Experience saved!'); cancelEdit();
                  }} onCancel={cancelEdit} />
                </div>
              )}

              {/* Certification form */}
              {activeTab === 'experience' && editingItem?.type === 'certification' && (
                <div className="space-y-5">
                  <EditorTitle icon={<Award size={17} style={{ color: 'var(--c-rust)' }} />} title={editingItem.index !== null ? 'Edit Certification' : 'New Certification'} onClose={cancelEdit} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[['Name', 'name'], ['Issuer', 'issuer'], ['Date', 'date'], ['Link / Path', 'link']].map(([lbl, key]) => (
                      <Field key={key} label={lbl}><NbInput value={editingItem.data[key] || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} /></Field>
                    ))}
                  </div>
                  <SaveBar label="Save Cert" onSave={() => {
                    const updated = [...data.certifications];
                    if (editingItem.index !== null) updated[editingItem.index] = editingItem.data; else updated.push(editingItem.data);
                    data.saveCertifications(updated); showToast('Cert saved!'); cancelEdit();
                  }} onCancel={cancelEdit} />
                </div>
              )}

              {/* ══ 5. PROFILE ══ */}
              {activeTab === 'profile' && profileForm && (
                <div className="space-y-6">
                  <EditorTitle icon={<User size={17} style={{ color: 'var(--c-rust)' }} />} title="Profile & About" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[['Display Name', 'name'], ['Headline / Title', 'title'], ['Seeking Status Badge', 'seekingStatus'], ['Mission Title', 'missionTitle']].map(([lbl, key]) => (
                      <Field key={key} label={lbl}><NbInput value={profileForm[key]} onChange={e => setProfileForm({ ...profileForm, [key]: e.target.value })} /></Field>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Mission Description">
                      <NbTextarea rows={3} value={profileForm.missionDescription} onChange={e => setProfileForm({ ...profileForm, missionDescription: e.target.value })} />
                    </Field>
                    <Field label="Profile Image Path">
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <NbInput value={profileForm.profileImage} onChange={e => setProfileForm({ ...profileForm, profileImage: e.target.value })} />
                        {profileForm.profileImage && <img src={profileForm.profileImage} alt="preview" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--c-border)', flexShrink: 0 }} onError={e => { e.target.style.display = 'none'; }} />}
                      </div>
                    </Field>
                  </div>

                  {/* Resume */}
                  <Field label="Resume URL / File">
                    <div className="space-y-2">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <NbInput value={profileForm.resumeUrl || ''} placeholder="/assets/resume.pdf or external URL" onChange={e => setProfileForm({ ...profileForm, resumeUrl: e.target.value })} />
                        <label className="btn-ink" style={{ fontSize: '0.72rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          <Upload size={12} /> Upload
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.size > 2 * 1024 * 1024) { alert('File must be under 2MB'); return; }
                            const reader = new FileReader();
                            reader.onload = ev => setProfileForm({ ...profileForm, resumeUrl: ev.target.result });
                            reader.readAsDataURL(file);
                          }} />
                        </label>
                      </div>
                      {profileForm.resumeUrl && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="hand-note" style={{ fontSize: '0.78rem' }}>{profileForm.resumeUrl.startsWith('data:') ? 'Uploaded PDF (base64)' : profileForm.resumeUrl}</span>
                          <button onClick={() => setProfileForm({ ...profileForm, resumeUrl: '' })} style={{ fontFamily: 'var(--font-hand)', fontSize: '0.8rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
                        </div>
                      )}
                    </div>
                  </Field>

                  {/* Sub-titles */}
                  <Field label="Sub-titles / Roles (Enter to add)">
                    <TagBox tags={profileForm.subTitles} inputValue={subTitleInput} onInputChange={e => setSubTitleInput(e.target.value)}
                      onAdd={v => { setProfileForm({ ...profileForm, subTitles: [...profileForm.subTitles, v] }); setSubTitleInput(''); }}
                      onRemove={i => setProfileForm({ ...profileForm, subTitles: profileForm.subTitles.filter((_, j) => j !== i) })}
                      placeholder="Add role + Enter" />
                  </Field>

                  {/* Bio */}
                  <Field label="Bio Paragraphs">
                    <div className="space-y-3">
                      {profileForm.bioParagraphs.map((para, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8 }}>
                          <textarea value={para} rows={2} onChange={e => { const p = [...profileForm.bioParagraphs]; p[i] = e.target.value; setProfileForm({ ...profileForm, bioParagraphs: p }); }} onFocus={inpFocus} onBlur={inpBlur} className="resize-none" style={{ ...inpStyle, flex: 1, padding: '8px 12px' }} />
                          <button onClick={() => setProfileForm({ ...profileForm, bioParagraphs: profileForm.bioParagraphs.filter((_, j) => j !== i) })} style={{ color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: 8 }}><Trash2 size={13} /></button>
                        </div>
                      ))}
                      <button className="btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => setProfileForm({ ...profileForm, bioParagraphs: [...profileForm.bioParagraphs, ''] })}>
                        <Plus size={12} /> Add Paragraph
                      </button>
                    </div>
                  </Field>

                  {/* Interests */}
                  <Field label="Core Interests">
                    <div className="space-y-2">
                      {profileForm.interests.map((int, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'center' }}>
                          <input value={int.name} onChange={e => { const n = [...profileForm.interests]; n[i] = { ...n[i], name: e.target.value }; setProfileForm({ ...profileForm, interests: n }); }} onFocus={inpFocus} onBlur={inpBlur} style={{ ...inpStyle, padding: '6px 10px' }} />
                          <select value={int.type} onChange={e => { const n = [...profileForm.interests]; n[i] = { ...n[i], type: e.target.value }; setProfileForm({ ...profileForm, interests: n }); }} style={{ ...inpStyle, padding: '6px 10px' }}>
                            <option value="ds">Data Science</option>
                            <option value="ml">Machine Learning</option>
                            <option value="dl">Deep Learning</option>
                            <option value="genai">Generative AI</option>
                          </select>
                          <button onClick={() => setProfileForm({ ...profileForm, interests: profileForm.interests.filter((_, j) => j !== i) })} style={{ color: 'var(--c-faint)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={13} /></button>
                        </div>
                      ))}
                      <button className="btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => setProfileForm({ ...profileForm, interests: [...profileForm.interests, { name: '', type: 'ds' }] })}>
                        <Plus size={12} /> Add Interest
                      </button>
                    </div>
                  </Field>

                  <SaveBar label="Save Profile" onSave={() => { data.saveProfileData(profileForm); showToast('Profile saved!'); }} />
                </div>
              )}

              {/* ══ 6. SETTINGS ══ */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  {/* Export */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 6 }}>Export Data Files</h4>
                    <p className="hand-note" style={{ fontSize: '0.82rem', marginBottom: 14 }}>Download your current data to replace files in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>src/data/</code> for permanent storage.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 10 }}>
                      {[['projects', 'projects.js'], ['blog', 'blog.js'], ['skills', 'skills.js'], ['experience', 'experience.js'], ['about', 'about.js']].map(([key, label]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '1px solid var(--c-border)', borderRadius: 4, background: 'var(--c-card)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--c-mid)' }}>{label}</span>
                          <button onClick={() => exportFile(key)} style={{ color: 'var(--c-rust)', background: 'none', border: 'none', cursor: 'pointer' }}><Download size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--c-border)' }} />

                  {/* Password hash */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 6 }}>Password Hash Generator</h4>
                    <p className="hand-note" style={{ fontSize: '0.82rem', marginBottom: 14 }}>Generate a SHA-256 hash to update your admin password in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>src/config/admin.js</code>.</p>
                    <NbInput value={hashInput} placeholder="Type new password" onChange={e => setHashInput(e.target.value)} />
                    {generatedHash && (
                      <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 4, border: '1px solid var(--c-border)', background: 'var(--c-bg-warm)' }}>
                        <p className="hand-note" style={{ fontSize: '0.75rem', marginBottom: 4 }}>SHA-256 hash:</p>
                        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--c-rust)', wordBreak: 'break-all' }}>{generatedHash}</code>
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: '1px dashed var(--c-border)' }} />

                  {/* Danger zone */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#ef4444', fontWeight: 600, marginBottom: 6 }}>Danger Zone</h4>
                    <p className="hand-note" style={{ fontSize: '0.82rem', marginBottom: 14 }}>Restore all data back to the original static file defaults. This cannot be undone.</p>
                    <button className="btn-outline" style={{ fontSize: '0.78rem', borderColor: '#fca5a5', color: '#ef4444' }}
                      onClick={() => setDeleteConfirm({ message: 'Reset ALL data to defaults? This cannot be undone.', onConfirm: () => { data.resetAllData(); window.location.reload(); } })}>
                      <RotateCcw size={13} /> Restore Defaults
                    </button>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', padding: 16 }}>
          <div className="paper-card" style={{ maxWidth: 380, width: '100%', padding: 28, textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#ef4444' }}>
              <AlertCircle size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 8 }}>Confirm</h3>
            <p className="hand-note" style={{ fontSize: '0.88rem', marginBottom: 20 }}>{deleteConfirm.message}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn-outline" style={{ fontSize: '0.78rem', borderColor: '#fca5a5', color: '#ef4444' }}
                onClick={() => { deleteConfirm.onConfirm(); setDeleteConfirm(null); }}>Confirm</button>
              <button className="btn-outline" style={{ fontSize: '0.78rem' }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 70,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 18px', borderRadius: 4,
          background: toast.type === 'error' ? '#ef4444' : '#16a34a',
          color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontFamily: 'var(--font-hand)', fontSize: '1rem',
        }}>
          {toast.msg}
          <button onClick={() => setToast(null)} style={{ color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
