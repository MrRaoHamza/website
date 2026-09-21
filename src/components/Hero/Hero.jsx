import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';

const GithubIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Hero = () => {
  const { profileData } = useData();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleResume = (e) => {
    e.preventDefault();
    if (profileData?.resumeUrl) {
      if (profileData.resumeUrl.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = profileData.resumeUrl;
        a.download = `${(profileData.name || 'Rao_Hamza_Irshad').replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      } else window.open(profileData.resumeUrl, '_blank', 'noopener,noreferrer');
    } else alert('Resume PDF coming soon.');
  };

  const [, ...rest] = profileData.name.split(' ');

  return (
    <section className="min-h-screen flex items-center pt-28 pb-20"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">

        {/* Top annotation */}
        <div className="mb-6 flex items-center gap-3">
          <span className="hand-note" style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}>
            ✦ currently seeking roles →
          </span>
          <span className="sticker">{profileData.seekingStatus}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left text */}
          <div className="lg:col-span-7 space-y-8">

            <div className="flex items-center gap-3">
              <span className="section-num">01 —</span>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-faint)' }}>
                introduction
              </span>
            </div>

            <div className="space-y-2">
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.05, color: 'var(--c-ink)', fontWeight: 600 }}>
                Hi, I'm{' '}
                <span className="pencil-underline" style={{ fontStyle: 'italic', color: 'var(--c-rust)' }}>
                  {rest[0]}
                </span>
              </h1>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', fontWeight: 400, color: 'var(--c-mid)', fontStyle: 'italic' }}>
                {profileData.title}
              </h2>
            </div>

            {/* Ruled bio box */}
            <div className="ruled paper-card p-6 relative"
              style={{ borderLeft: '3px solid var(--c-rust)' }}>
              <span className="hand-note absolute -left-20 top-4 hidden xl:block"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'right center', fontSize: '0.8rem' }}>
                about me ↓
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--c-mid)', lineHeight: 1.85 }}>
                {profileData.bioParagraphs[0]}
              </p>
            </div>

            {/* Interest chips */}
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map(i => (
                <span key={i.name} className="chip">{i.name}</span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => scrollTo('projects')} className="btn-ink">
                View Projects <ArrowRight size={13} />
              </button>
              <button onClick={handleResume} className="btn-outline">
                <Download size={13} /> Resume
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline">
                <Mail size={13} /> Contact
              </button>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-5 pt-3"
              style={{ borderTop: '1px solid var(--c-border)' }}>
              <span className="hand-note" style={{ fontSize: '0.9rem' }}>find me —</span>
              {[
                { label: 'GitHub',   href: 'https://github.com/MrRaoHamza', icon: <GithubIcon /> },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rao-hamza-irshad/' },
                { label: 'Kaggle',   href: 'https://www.kaggle.com/mrraohamza' },
                { label: 'Email',    href: 'mailto:mr.raohamza@gmail.com' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}>
                  {l.icon && l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — pinned photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative mt-8">
              {/* Push-pin */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10 w-4 h-4 rounded-full shadow-md"
                style={{ background: 'var(--c-rust)' }} />

              {/* Photo frame */}
              <div className="photo-frame overflow-hidden" style={{ width: 'clamp(220px, 28vw, 300px)' }}>
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full aspect-[3/4] object-cover object-top block"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div style={{ background: 'var(--c-bg-warm)', borderTop: '1px solid var(--c-border)', padding: '8px 12px' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: 'var(--c-ink)', lineHeight: 1.2 }}>
                    {profileData.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.8rem', color: 'var(--c-faint)' }}>
                    {profileData.title}
                  </p>
                </div>
              </div>

              {/* Sticky note */}
              <div className="absolute -bottom-4 -right-6 rotate-3"
                style={{
                  background: '#fef3c7', border: '1px solid #fde68a',
                  padding: '8px 12px', boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
                  maxWidth: '130px', borderRadius: '2px',
                }}>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: '#92400e', lineHeight: 1.4 }}>
                  open to work! ✌️
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex items-center gap-3">
          <div style={{ width: 32, height: 1, background: 'var(--c-border)' }} />
          <span className="hand-note" style={{ fontSize: '0.82rem' }}>scroll down</span>
          <div style={{ width: 32, height: 1, background: 'var(--c-border)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
