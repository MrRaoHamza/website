import React from 'react';
import { Target, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AboutCard = () => {
  const { education, profileData } = useData();

  return (
    <section id="about" className="nb-section nb-section-tinted"
      style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-baseline gap-4 mb-12">
          <span className="section-num">02 —</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
            About Me
          </h2>
          <span className="hand-note hidden sm:inline-block" style={{ transform: 'rotate(-1deg)' }}>
            — who am I?
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left: Bio + Interests ── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="paper-card ruled p-8 relative overflow-hidden"
              style={{ paddingLeft: '72px' }}>
              <div style={{ position: 'absolute', left: 56, top: 0, bottom: 0, width: 1, background: 'rgba(200,98,42,0.25)' }} />
              <div style={{ position: 'absolute', left: 10, top: 32, fontFamily: 'var(--font-hand)', fontSize: '0.72rem', color: 'var(--c-ghost)', lineHeight: '28px', userSelect: 'none' }}>
                {Array.from({ length: 12 }, (_, i) => <div key={i}>{String(i + 1).padStart(2, '0')}</div>)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 4 }}>
                {profileData.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-rust)', marginBottom: 20 }}>
                {profileData.title}
              </p>
              {profileData.bioParagraphs.map((para, i) => (
                <p key={i} className="mb-4 last:mb-0"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--c-mid)', lineHeight: 1.85 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Interests — plain ink chips, no colored backgrounds */}
            <div>
              <p className="hand-note mb-3" style={{ fontSize: '0.9rem' }}>core interests ↓</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 }}>
                {profileData.interests.map(interest => (
                  <div key={interest.name}
                    style={{ border: '1px solid var(--c-border)', borderRadius: 3, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--c-card)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-rust)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-mid)', fontWeight: 600 }}>
                      {interest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Mission + Education ── */}
          <div className="lg:col-span-5 space-y-5">

            <div className="paper-card p-7">
              <div className="flex items-start gap-4">
                <div style={{ color: 'var(--c-rust)', marginTop: 2, flexShrink: 0 }}>
                  <Target size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 8 }}>
                    {profileData.missionTitle}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--c-mid)', lineHeight: 1.75 }}>
                    {profileData.missionDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="paper-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <BookOpen size={18} style={{ color: 'var(--c-faint)' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--c-ink)', fontWeight: 600 }}>
                  Education
                </h4>
              </div>
              <div className="space-y-5">
                {education.map((edu, i) => {
                  const isCurrent = edu.duration?.toLowerCase().includes('progress') || edu.duration?.toLowerCase().includes('present');
                  return (
                    <div key={i} className={i > 0 ? 'pt-5' : ''}
                      style={i > 0 ? { borderTop: '1px dashed var(--c-border)' } : {}}>
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.3 }}>
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                          {isCurrent && (
                            <span style={{
                              fontFamily: 'var(--font-hand)', fontSize: '0.72rem', fontWeight: 700,
                              padding: '1px 7px', background: 'var(--c-rust)', color: '#fff',
                              borderRadius: 2, letterSpacing: '0.05em', textTransform: 'uppercase'
                            }}>current</span>
                          )}
                          <span className="hand-note" style={{ fontSize: '0.75rem' }}>{edu.duration}</span>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--c-mid)', lineHeight: 1.7, marginBottom: 12 }}>
                        {edu.description}
                      </p>
                      {edu.courses?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {edu.courses.slice(0, 5).map((c, ci) => (
                            <span key={ci} className="chip" style={{ fontSize: '0.78rem' }}>{c}</span>
                          ))}
                          {edu.courses.length > 5 && (
                            <span className="chip" style={{ fontSize: '0.78rem', color: 'var(--c-faint)' }}>
                              +{edu.courses.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCard;
