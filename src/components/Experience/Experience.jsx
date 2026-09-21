import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ExperienceEntry = ({ item, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="relative pl-8 pb-8">
      <span className="tl-dot" />
      <div className="paper-card p-6">
        <span className="hand-note block mb-2" style={{ fontSize: '0.82rem' }}>📅 {item.duration}</span>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.3 }}>
          {item.role}
        </h4>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-rust)', marginTop: 2 }}>
          @ {item.company}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--c-mid)', lineHeight: 1.75, marginTop: 10 }}>
          {item.description}
        </p>
        {item.bullets?.length > 0 && (
          <>
            <button onClick={() => setOpen(v => !v)}
              className="flex items-center gap-1 mt-3 transition-colors"
              style={{ fontFamily: 'var(--font-hand)', fontSize: '0.88rem', color: 'var(--c-faint)', cursor: 'pointer', background: 'none', border: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--c-faint)'}>
              {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {open ? 'collapse' : `show ${item.bullets.length} highlights`}
            </button>
            {open && (
              <ul className="mt-3 space-y-2">
                {item.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-mid)', lineHeight: 1.7 }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--c-rust)', flexShrink: 0, display: 'inline-block' }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const { experience, certifications } = useData();

  return (
    <section id="experience" className="nb-section"
      style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-baseline gap-4 mb-12">
          <span className="section-num">05 —</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
            Experience &amp; Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Timeline ── */}
          <div className="lg:col-span-7">
            <p className="hand-note mb-6" style={{ fontSize: '0.9rem' }}>— work &amp; projects 💼</p>
            <div className="relative">
              <div className="tl-line" />
              {experience.map((item, i) => (
                <ExperienceEntry key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right: Certifications — auto-fill grid ── */}
          <div className="lg:col-span-5">
            <p className="hand-note mb-6" style={{ fontSize: '0.9rem' }}>— certifications 🎓</p>
            <div className="space-y-3">
              {(certifications || []).map((cert, i) => (
                <div key={i} className="paper-card p-5">
                  <span className="hand-note block mb-1" style={{ fontSize: '0.72rem' }}>
                    cert #{String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.35 }}>
                    {cert.name}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: 'var(--c-faint)', marginTop: 4 }}>
                    {cert.issuer}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3"
                    style={{ borderTop: '1px dashed var(--c-border)' }}>
                    <span className="hand-note" style={{ fontSize: '0.75rem' }}>{cert.date}</span>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 transition-colors"
                      style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: 'var(--c-rust)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust-lt)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--c-rust)'}>
                      Verify <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
