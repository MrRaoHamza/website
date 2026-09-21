import React, { useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';

const Skills = () => {
  const { skillCategories } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fills = section.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { fills.forEach(el => el.classList.add('go')); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [skillCategories]);

  return (
    <section id="skills" ref={sectionRef} className="nb-section"
      style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-baseline gap-4 mb-12">
          <span className="section-num">03 —</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
            Technical Skills
          </h2>
          <span className="hand-note hidden sm:inline-block" style={{ transform: 'rotate(1deg)' }}>
            what I work with ✏️
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <div key={cat.title} className="paper-card p-6">
              <div className="flex items-center justify-between mb-5 pb-3"
                style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--c-ink)', fontWeight: 600 }}>
                  {cat.title}
                </h3>
                <span className="hand-note" style={{ fontSize: '0.78rem' }}>
                  #{String(catIdx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="space-y-4">
                {cat.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-mid)', fontWeight: 600 }}>
                        {skill.name}
                      </span>
                      <span className="hand-note" style={{ fontSize: '0.8rem' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ '--w': `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <span className="hand-note" style={{ fontSize: '0.9rem' }}>always learning, always building → 📚</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
