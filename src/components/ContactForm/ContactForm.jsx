import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (data.website_url) { setStatus('loading'); setTimeout(() => setStatus('success'), 800); return; }
    setStatus('loading');
    setTimeout(() => { setStatus('success'); reset(); setTimeout(() => setStatus('idle'), 5000); }, 1500);
  };

  return (
    <section id="contact" className="nb-section nb-section-tinted"
      style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-baseline gap-4 mb-12">
          <span className="section-num">06 —</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--c-ink)', fontWeight: 600 }}>
            Get in Touch
          </h2>
          <span className="hand-note hidden sm:inline-block" style={{ transform: 'rotate(-1deg)' }}>let's talk! ✉️</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={15} />,   label: 'Email',    value: 'mr.raohamza@gmail.com', href: 'mailto:mr.raohamza@gmail.com' },
              { icon: <MapPin size={15} />, label: 'Location', value: 'Pakistan — open to remote' },
              { icon: <Clock size={15} />,  label: 'Response', value: 'Within 24 hours', dot: true },
            ].map(card => (
              <div key={card.label} className="paper-card p-5">
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--c-faint)' }}>
                  {card.icon}
                  <span className="hand-note" style={{ fontSize: '0.8rem' }}>{card.label}</span>
                </div>
                {card.href ? (
                  <a href={card.href}
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--c-ink)', fontWeight: 500, transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--c-rust)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--c-ink)'}>
                    {card.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--c-ink)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {card.dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', flexShrink: 0, display: 'inline-block' }} />}
                    {card.value}
                  </p>
                )}
              </div>
            ))}

            {/* Sticky note */}
            <div style={{ transform: 'rotate(1deg)', background: '#fef3c7', border: '1px solid #fde68a', padding: '12px 14px', boxShadow: '2px 3px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: '#92400e', lineHeight: 1.5 }}>
                "happy to discuss any AI/ML project or opportunity. don't be shy!" — Rao ✍️
              </p>
            </div>
          </div>

          {/* Notepad form */}
          <div className="md:col-span-2 paper-card overflow-hidden">
            {/* Rust header strip */}
            <div style={{ background: 'var(--c-rust)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>✍️ Send a Message</span>
            </div>
            {/* Spiral holes */}
            <div style={{ background: 'var(--c-bg-aged)', padding: '8px 24px', display: 'flex', gap: 20, borderBottom: '1px solid var(--c-border)' }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid var(--c-border)', background: 'var(--c-bg)' }} />
              ))}
            </div>

            <div className="p-8 ruled" style={{ minHeight: 400 }}>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div style={{ color: '#16a34a', marginBottom: 16 }}>
                    <CheckCircle size={44} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--c-ink)', fontWeight: 600, marginBottom: 8 }}>
                    Message received! ✉️
                  </h3>
                  <p className="hand-note" style={{ fontSize: '1rem' }}>I'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn-outline mt-6 text-sm">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
                  <input type="text" className="hidden" tabIndex="-1" autoComplete="off" {...register('website_url')} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <NbField label="Your name" error={errors.name}>
                      <input id="name" type="text" placeholder="Alan Turing"
                        {...register('name', { required: 'Name is required' })} className="nb-input" />
                    </NbField>
                    <NbField label="Email address" error={errors.email}>
                      <input id="email" type="email" placeholder="alan@turing.org"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' } })}
                        className="nb-input" />
                    </NbField>
                  </div>

                  <NbField label="Subject" error={errors.subject}>
                    <input id="subject" type="text" placeholder="ML opportunity / collaboration"
                      {...register('subject', { required: 'Subject is required' })} className="nb-input" />
                  </NbField>

                  <NbField label="Message" error={errors.message}>
                    <textarea id="message" rows="4" placeholder="Tell me about your project..."
                      {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'At least 10 characters' } })}
                      className="nb-input resize-none" style={{ paddingTop: '0.5rem' }} />
                  </NbField>

                  <button type="submit" disabled={status === 'loading'}
                    className="btn-ink w-full justify-center disabled:opacity-60 disabled:pointer-events-none">
                    {status === 'loading'
                      ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                      : <><Send size={13} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NbField = ({ label, error, children }) => (
  <div>
    <label style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--c-rust)', display: 'block', marginBottom: 4, fontWeight: 600 }}>
      {label}
    </label>
    {children}
    {error && (
      <span className="flex items-center gap-1 mt-1" style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: '#ef4444' }}>
        <AlertCircle size={10} /> {error.message}
      </span>
    )}
  </div>
);

export default ContactForm;
