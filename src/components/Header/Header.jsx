import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../context/DataContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { profileData } = useData();
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  const go = (id) => {
    setIsOpen(false);
    if (location.pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    else navigate(`/#${id}`);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };

  const handleResume = (e) => {
    if (!profileData?.resumeUrl) {
      e.preventDefault();
      alert('Resume PDF coming soon.');
    } else if (profileData.resumeUrl.startsWith('data:')) {
      e.preventDefault();
      const a = document.createElement('a');
      a.href = profileData.resumeUrl;
      a.download = `${(profileData.name || 'Rao_Hamza_Irshad').replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const navItems = [
    { label: 'About',      id: 'about' },
    { label: 'Skills',     id: 'skills' },
    { label: 'Projects',   id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Blog',       id: 'blog' },
    { label: 'Contact',    id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'nb-header py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-baseline gap-0.5 group">
          <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--c-ink)', lineHeight: 1, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--c-ink)'}>
            rao
          </span>
          <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--c-rust)', lineHeight: 1 }}>.</span>
          <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--c-faint)', lineHeight: 1, marginLeft: 2 }}>hamza</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button key={item.id} onClick={() => go(item.id)} className="nb-nav">{item.label}</button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="p-1.5 rounded transition-colors"
            style={{ color: 'var(--c-faint)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--c-ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href={profileData?.resumeUrl || '#'}
            onClick={handleResume}
            target={profileData?.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="btn-ink text-xs">
            Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="p-1.5" style={{ color: 'var(--c-faint)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setIsOpen(v => !v)} aria-label="Toggle menu"
            className="p-1.5" style={{ color: 'var(--c-mid)' }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="nb-header px-5 pb-6 pt-3 space-y-1"
          style={{ borderTop: '1px solid var(--c-border)' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => go(item.id)}
              className="block w-full text-left px-3 py-2.5 rounded transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--c-mid)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--c-ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--c-mid)'}>
              {item.label}
            </button>
          ))}
          <div className="pt-3" style={{ borderTop: '1px solid var(--c-border)' }}>
            <a href={profileData?.resumeUrl || '#'} onClick={handleResume}
              className="btn-ink w-full justify-center text-sm">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
