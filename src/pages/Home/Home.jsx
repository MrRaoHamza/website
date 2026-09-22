import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import AboutCard from '../../components/AboutCard/AboutCard';
import Skills from '../../components/Skills/Skills';
import ProjectsGallery from '../../components/ProjectsGallery/ProjectsGallery';
import Experience from '../../components/Experience/Experience';
import ContactForm from '../../components/ContactForm/ContactForm';
import { useData } from '../../context/DataContext';

const Home = () => {
  const { blogPosts } = useData();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <AboutCard />
      <Skills />
      <ProjectsGallery />
      <Experience />

      {/* ── Blog section ── */}
      <section id="blog" className="nb-section nb-section-tinted"
        style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <div className="flex items-baseline gap-4 mb-10">
            <span className="section-num">06 —</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
              Blog
            </h2>
            <span className="hand-note hidden sm:inline-block" style={{ transform: 'rotate(-1deg)' }}>
              — thoughts &amp; notes 📝
            </span>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="index-card flex flex-col group">
                {/* Top rust strip */}
                <div style={{ height: 3, background: 'var(--c-rust)', borderRadius: '3px 3px 0 0', flexShrink: 0 }} />

                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hand-note" >
                      <Calendar size={11} />
                      <span style={{ fontSize: '0.78rem' }}>{post.date}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hand-note">
                      <Clock size={11} />
                      <span style={{ fontSize: '0.78rem' }}>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/blog/${post.slug}`}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--c-ink)', fontWeight: 600, lineHeight: 1.35, marginBottom: 10, transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--c-ink)'}>
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-mid)', lineHeight: 1.7 }}
                    className="flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read link */}
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--c-border)' }}>
                    <Link to={`/blog/${post.slug}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: 'var(--c-rust)', fontWeight: 600, transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust-lt)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--c-rust)'}>
                      Read Article <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default Home;
